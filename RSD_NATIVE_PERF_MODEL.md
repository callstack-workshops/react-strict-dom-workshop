# RSD on native: the performance model (X3 deep-dive)

Instructor background for X3. Why react-strict-dom carries a render cost on native that it does not on
web, where it surfaces in the profiler, and how both the X3 fixes and the standard React Native toolkit
map onto it.

## The thesis, in one line
On web, RSD compiles your styles to CSS classes at BUILD time and the browser's CSS engine applies them
for roughly free. On native there is no CSS engine, so RSD recreates CSS semantics in JavaScript at
RUNTIME, once per element, every render. `useStyleProps` is where that happens; its aggregate, which
shows up as `useNativeProps` in the flame, is the per-element tax X3 measures.

## What the two hooks actually do

`useStyleProps` is the engine. For one `html.*` element, on every render, it does in JS what a browser
does for a DOM node:
- reads the cascade: inherited values from ancestors (`color`, `fontFamily`, and the rest of a
  ~17-property inheritance list) via the `ContextInheritedStyles` React context;
- reads CSS custom properties in scope (`var(--x)`) via `ContextCustomProperties`;
- reads the environment: `useWindowDimensions()` (for `@media` and viewport units), `useColorScheme()`
  (dark mode), and the parent's display context via `ContextDisplayInside` / `ContextViewportScale`;
- resolves the element's style: flattens the `style` array, selects the matching `@media` / pseudo /
  conditional value, substitutes the variables, converts units, into one flat React Native style object;
- builds the inherited-styles context it hands DOWN to its children, so the cascade continues.

That is four context reads, extra hooks, a style resolution, and an inheritance walk, per element, per
render.

`useNativeProps` is the wrapper that every `html.*` element runs: it calls `useStyleProps`, then
assembles the final React Native props. In the flame it is the parent bar (~37-46% inclusive);
`useStyleProps` and `resolveStyle` are the bulk directly beneath it.

## Web vs native: where the style work happens
The asymmetry is the whole story.
- Web: the RSD / StyleX Babel plugin compiles `css.create(...)` to atomic CSS classes at build time. At
  runtime the browser's native (C++) CSS engine applies the class. Added JS runtime cost: roughly zero.
- Native: RSD's Babel preset deliberately does NO compile-time style work. The relevant line is roughly
  `plugins: opts.platform === 'web' ? pluginsWeb : null`, so for native the style plugins are null.
  Everything the web compiler would have precomputed now happens at runtime, inside `useStyleProps`.

Same `<html.div style={...}>`: free at runtime on web, a full CSS-resolution pass on native.

## Why it scales with element COUNT
`useStyleProps` is a hook, so it runs once per ELEMENT (every `html.div`, `html.span`, ...) and once per
RENDER (hooks re-run every render; nothing is cached across renders). A 60-row list with ~6 `html.*` per
row, re-rendered 30 times for a clean median, is on the order of 60 x 6 x 30 ~= 10,000 `useStyleProps`
calls. The total is roughly:

    per-element cost  x  element count  x  renders

You cannot make a single element's `useStyleProps` meaningfully cheaper; it is doing necessary work. The
two levers you control are element count and render count.

## What the overlay measures: render-phase JS, and why it is the right number
React renders in two phases. The RENDER phase calls your component functions and runs their hooks
(`useState`, `useMemo`, and RSD's `useNativeProps` / `useStyleProps`), building an in-memory description
of what should be on screen. It is pure JavaScript on the JS thread; no native views are touched yet. The
COMMIT phase then hands the diff to the host: on native, Fabric creates and updates the actual native
views, then Yoga layout and paint, mostly native C++ rather than JS.

"Render-phase JS time" is the time the JS thread spends in the render phase. The PerfOverlay's
`performance.now` bracket wraps exactly that, which is why it excludes the Fabric commit and the paint.

It is the right number to capture, for three reasons:
- It is where RSD does its work. `useStyleProps` is a hook, so it fires as React renders each `html.*`
  element; the per-element tax IS render-phase JS. (RSD is not ONLY here: the styles it resolves are
  applied again in the commit, via Fabric's `diffProperties`. But that is downstream of the element count
  the render produced, so the render phase is where the cost is computed and the lever you control.)
- It is the single JS thread. While the render phase runs for 105 ms, the JS thread is FROZEN for 105 ms:
  it cannot handle a touch, cannot schedule the next frame, and blows the 16.7 ms (60 fps) budget about
  six times over. Render-phase JS time is not abstract, it is directly how janky the list feels.
- It is what the fixes move. Flatten, memoize, and static variants all reduce render-phase JS; the commit
  just rides on the smaller tree they produce. And it is the only thing a `performance.now` bracket can
  see (it runs on the JS thread); measuring the native commit would need native instrumentation.

What the number is NOT: not time-to-pixels (the commit, layout, and paint add more on the native side, so
the list appears a little later); not a single mount (the overlay medians a 30-render burst, so it is the
steady per-render cost); not the honest absolute (a dev build over-reports ~1.5-1.8x, so divide by ~1.5 to
approximate release).

## Reading it in the flame: total vs self
Click a frame in Left Heavy and read Total vs Self (bottom-left panel):
- `useNativeProps`: Total ~46% (dev) to ~37% (release), Self ~0%. Total-heavy with near-zero self means
  the cost is in its CHILDREN (the per-element pipeline), not a single slow line. Structural cost,
  reduced by having fewer elements, not by optimizing a function.
- `demandScore` (the X3 foil): Total == Self (~5.6% dev, ~16.6% release). Total equal to self means a
  pure leaf doing all its own work. Your own code, reduced by computing it less often (memoize).

That single read, total-heavy-pipeline vs self-heavy-leaf, is the diagnosis the whole exercise turns on.

## The three X3 causes, mapped to the model
- Cause 1, per-element fan-out (the RSD tax): redundant layout-only wrapper `<html.div>`s. Each wrapper
  is ANOTHER element running the full hook. On web those wrappers are free (atomic CSS); on native each
  adds a `useStyleProps` pass. Fix: drop the wrappers, render leaves directly. Lever: element count.
- Cause 2, dynamic styles (subtle): a parameterized `css.create` function (`dyn.avatarTone(...)`)
  resolves a FRESH style every render instead of reusing a precomputed atomic variant. Extra work INSIDE
  the pipeline (the `resolveStyle` ~2%). Fix: static `css.create` variants selected by key. This is X1's
  variant-vs-dynamic decision with a profiler cost attached.
- Cause 3, the compute foil (`demandScore`): not in the RSD pipeline at all, it is your own O(n^2) loop.
  It exists so the room learns to tell "the RSD tax" apart from "our own slow code". Fix: memoize. It
  would do nothing for Cause 1, and Cause 1's fix would do nothing for it.

## Could we just use useMemo / virtualization / windowing instead of cutting elements?
They all help, but they hit different knobs and they COMPOSE with flattening rather than replace it. The
tax is `useStyleProps` cost x element count x render count; each tool attacks a different multiplier.

- Virtualization / windowing / "render only what is on screen" (FlatList, etc.) hits the ELEMENT-COUNT
  knob at the LIST level: render 10 visible rows instead of 60 and you make ~6x fewer `useStyleProps`
  calls. So it IS cutting elements, just the rows rather than the per-row structure. Caveats: it only
  helps when the list is long enough that not everything is on screen (a short list that fits gains
  nothing); it does NOT fix per-row bloat (a windowed list of fat rows still pays the bloat on every
  visible row); and it is real complexity (item layout, scroll, measurement) that is overkill for a
  small list.
- Memoization (`useMemo` / `useCallback` / `React.memo`) hits the RENDER-COUNT knob: a memoized subtree
  with stable props skips re-rendering, so its elements skip `useStyleProps` that render. But it does
  NOTHING on mount (everything renders once, every element runs the hook), nothing when the data
  genuinely changes, and note that our seed re-creates the list data every render, so a naive
  `React.memo` would not even skip (new object references each render). It lowers the cost of incidental
  re-renders; it does not remove the cost of rendering.
- Flattening (the X3 Cause 1 fix) hits the PER-ELEMENT knob inside each item, orthogonal to both above.
  Virtualization and memo do not touch per-row bloat.

So in a real app you reach for all of them: virtualize a long list, memoize the stable parts, AND flatten
the rows. The RSD-specific insight, the discipline web never forced you to learn, is that element count
is a RUNTIME COST on native. "Does this element need to exist?" comes first, because flattening shrinks
the base number that virtualization caps and memoization multiplies. None of them is "instead of" the
per-element discipline; flattening is the foundation.

## The escape hatch: drop a hot subtree to plain React Native
For a genuinely hot subtree you can render plain React Native instead of `html.*`. Plain RN never runs
`useStyleProps`, so the subtree leaves the per-element pipeline entirely. A different kind of lever: skip
RSD rather than reduce its element count. Two shapes:
- `compat.native`, the in-line seam. `<compat.native style={s}>{(nativeProps) => <View {...nativeProps}>
  ...</View>}</compat.native>`: RSD resolves the BOUNDARY props once (that element keeps its RSD styling)
  and hands you the translated native props; everything you render below in the render prop is plain RN,
  out of the pipeline. The right tool for a hot SUBTREE, where one boundary resolution replaces N
  per-element ones. CAVEAT for RSD 0.0.55: `compat` is exported from the NATIVE build only (the web build
  exports just `css` and `html`), so `compat.native` CANNOT live in a shared web+native component, it is
  `undefined` on web and crashes the rail. Use it inside native-resolved code (a `.native.tsx` file or a
  `Platform.OS` guard). The deck's "finer seam: web props in, translated RN props below" describes the
  native API (you author in web-style props, you get RN props below); the cross-platform web half is not
  shipped in 0.0.55.
- A `.native.tsx` file, the platform split. Write a separate plain-RN component for device. It resolves
  nothing at all (you hand-author the native styling) and you maintain two files, but the platform file is
  what isolates the native code, so it works in a SHARED component. Best for a token-free LEAF, or any
  shared component: the X3 stretch does this for the avatar (one element, so a plain swap is simplest).

Either way it costs you the single-authoring model for that subtree; reserve it for a MEASURED hot spot.

## Summary: the levers
| Lever | Knob it hits | Reduces | When to use | Limitation |
|---|---|---|---|---|
| Flatten elements (X3 cause 1) | per element | elements per item | always, first | manual structural work |
| Virtualize / window | element count | rows rendered | long lists | no help if the list fits; not per-row bloat; complexity |
| Memoize (useMemo / React.memo) | render count | renders | incidental re-renders | nothing on mount or data change; needs stable refs |
| Static variants (X3 cause 2) | per-element work | work inside the pipeline | dynamic styles | small effect |
| compat.native (seam) / .native swap | bypass RSD | the pipeline itself | hot subtree (seam, native-only code) or leaf / shared component (split) | loses single-authoring; compat is native-only in 0.0.55 |

The first row is the RSD-on-native discipline; the rest are the familiar React Native tools you layer on
top. The mental model: web pays for styles at build, native pays per element at runtime, the profiler is
the only place it shows, and you tell the RSD tax (total-heavy pipeline, fix with element count) apart
from your own slow code (self-heavy leaf, fix by computing it less).
