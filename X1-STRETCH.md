# X1 Stretch (optional) - make the banner adapt to viewport width

Finished X1 early? Push into the "web-first frontier": instead of giving `ExperienceBanner` a fixed
`variant`, let it adapt to the viewport with a width `@media` - which works on web **and** native. The
surprise: native re-resolves `@media` against the live device width, not just `prefers-color-scheme`.

Five steps. The big one is step 3 (the whole `styles` block, ready to paste).

## 1. Add a breakpoint token

`packages/ui/tokens/src/tokens.css.ts` - add it next to the other tokens:

```ts
export const bp = css.defineConsts({ wide: '@media (min-width: 480px)' });
```

It has to live in a tokens `.css.ts` file, **not** inline in the component: the StyleX web compiler hashes
`defineConsts` by module path, so an inline `const bp = ...` fails to build.

## 2. Import it in the banner

`packages/ui/components/src/lib/experience-banner.tsx`:

```ts
import { colors, spacing, radius, bp } from '@ui/tokens/tokens.css';
```

## 3. Replace the entire `const styles = css.create({ ... })` with this

Every property that differed between row and stacked is now a `{ default: <stacked>, [bp.wide]: <row> }`
value, and the four `*Stacked` entries are gone:

```tsx
const styles = css.create({
  // Narrow (default) renders as a stacked column; at >=480px (bp.wide) it lays out as a row.
  banner: {
    display: 'flex',
    flexDirection: { default: 'column', [bp.wide]: 'row' },
    alignItems: { default: 'stretch', [bp.wide]: 'center' },
    gap: spacing.x3,
    padding: spacing.x3,
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radius.xl,
  },
  media: {
    position: 'relative',
    width: { default: '100%', [bp.wide]: 184 },
    height: { default: 150, [bp.wide]: 110 },
    flexShrink: 0,
    borderRadius: radius.lg,
    backgroundColor: colors.bgSurface,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  mediaLabel: {
    fontFamily: 'monospace',
    fontSize: 11.5,
    color: colors.textPlaceholder,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.x2,
    flexGrow: 1,
    minWidth: 0,
  },
  topRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.x2,
  },
  title: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  chipRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.x1,
  },
  chip: {
    fontSize: 12.5,
    fontWeight: '600',
    color: colors.textMuted,
    backgroundColor: colors.bgSurface,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: 999,
    paddingBlock: 5,
    paddingInline: 10,
  },
  badge: {
    fontSize: 11.5,
    fontWeight: '700',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
    borderRadius: 999,
    paddingBlock: 4,
    paddingInline: 9,
    flexShrink: 0,
  },
  available: {
    backgroundColor: '#DCFCE7',
    color: '#15803D',
  },
  filling: {
    backgroundColor: '#FEF3C7',
    color: '#B45309',
  },
  soldout: {
    backgroundColor: '#FEE2E2',
    color: '#B91C1C',
  },
  action: {
    display: 'flex',
    flexDirection: { default: 'row', [bp.wide]: 'column' },
    alignItems: { default: 'center', [bp.wide]: 'flex-end' },
    justifyContent: { default: 'space-between', [bp.wide]: 'flex-start' },
    alignSelf: { default: 'stretch', [bp.wide]: 'auto' },
    gap: spacing.x2,
    paddingInlineStart: { default: 0, [bp.wide]: spacing.x3 },
    paddingBlockStart: { default: spacing.x3, [bp.wide]: 0 },
    borderLeftWidth: { default: 0, [bp.wide]: 1 },
    borderLeftStyle: 'solid',
    borderTopWidth: { default: 1, [bp.wide]: 0 },
    borderTopStyle: 'solid',
    borderColor: colors.border,
    flexShrink: 0,
  },
  priceBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: { default: 'flex-start', [bp.wide]: 'flex-end' },
  },
  priceBig: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  priceSub: {
    fontSize: 12,
    color: colors.textMuted,
  },
  priceRating: {
    fontSize: 13,
    color: colors.actionPrimary,
    marginBlockStart: spacing.x1,
  },
  cta: {
    borderWidth: 0,
    borderStyle: 'none',
    paddingInline: spacing.x4,
    paddingBlock: spacing.x2,
    borderRadius: radius.md,
    fontSize: 14,
    fontWeight: '600',
    color: colors.textOnAction,
    cursor: 'pointer',
    transitionProperty: 'background-color',
    transitionDuration: '200ms',
    backgroundColor: {
      default: colors.actionPrimary,
      ':hover': colors.actionPrimaryHover,
      ':active': colors.actionPrimaryHover,
    },
  },
});
```

## 4. Remove the `variant` plumbing (same file)

- Delete `variant?: 'row' | 'stacked';` from `ExperienceBannerProps`.
- Delete `variant = 'row',` from the destructure, and the line `const stacked = variant === 'stacked';`.
- Simplify the four JSX style arrays - drop the `stacked && styles.*Stacked` half:

```tsx
// before
<html.div data-testid={dataTestId} style={[styles.banner, stacked && styles.bannerStacked]}>
// after
<html.div data-testid={dataTestId} style={styles.banner}>
```

Do the same for `media`, `action`, and `priceBlock`.

## 5. Stop forcing a variant in the native feed

`apps/native-host/components/explore-screen.tsx`:

```tsx
// before
<ExperienceBanner key={i} variant="stacked" {...experience} />
// after
<ExperienceBanner key={i} {...experience} />
```

## See it adapt

- **Web:** resize the browser window across 480px - the banner flips column <-> row.
- **Native:** the feed is a stacked column on the phone. To prove it re-resolves, temporarily set the
  breakpoint to `min-width: 300px` and reload: the phone (~393pt) now exceeds it and the feed flips to a
  (cramped) row. Put it back to 480.

Same component, one authoring model, viewport-driven on both platforms.

> Heads-up on the honest edge: `@media` keys on the **viewport**, not the element's container. The web
> dashboard rail is narrow even on a wide viewport, so it stays imperfect there - container queries would
> be the real fix. The clean win is native, where the feed's width tracks the viewport.
