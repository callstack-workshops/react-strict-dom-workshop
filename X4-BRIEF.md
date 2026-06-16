# X4 Capstone: Build the Booking Form (2-hour hands-on)

## The brief
Build the "Request a booking" experience: a participant booking form for a guided experience,
composed from the RSD component kit and running on both web and native. This is the capstone, where
X1 (RSD layout and styling), X2 (accessibility), and X3 (per-element awareness) come together in one
real feature.

## What you are building
On `x4-start`, the form and every input primitive it needs are empty stubs (`return null`). You bring
them to life:

1. The input primitives in `@ui/components` (build the ones your form needs). Suggested contracts,
   design your own if you prefer:
   - `TextField` — `{ label, id, value, onChangeText, placeholder?, type?, invalid? }`: labelled,
     controlled text input
   - `TextAreaField` — `{ label, id, value, onChangeText, placeholder? }`: the multiline variant
   - `DateField` — `{ label, id, value, onChangeText, invalid? }`: date input (see the `.native` note)
   - `Stepper` — `{ label, value, onChange, min? }`: number stepper with + / -
   - `Button` — `{ onPress, variant?, children }`: primary and a secondary variant
   - `Card` — `{ children }`: the form container
   - `InlineAlert` — `{ children }`: an inline error message
   - `FieldLabel` — `{ children, htmlFor? }`: a label associated with its input (used by the fields)
2. `booking-state.ts` (`@feature/booking`) — the form value type, initial values, and validation.
3. `BookingForm` (`@feature/booking`) — compose the primitives, hold the form state, validate on
   submit, show errors, and confirm.
4. Wire it in: in `BookingScreen` (`@screen/booking`), replace `<StudentTaskSlot />` with your
   `<BookingForm onSubmit={...} />`.

## The form spec
Fields, in whatever layout you like:

| Field | Control | Rule |
|---|---|---|
| Full name | text | required |
| Email | text (email) | valid email |
| Adults | stepper | at least 1 |
| Children | stepper | 0 or more |
| Date | date | required |
| Special requests | textarea | optional |

Behaviors:
- Controlled inputs: every field reflects and updates the form state.
- Validate on submit (the "Request booking" button). Show the matching error under each invalid
  field. Clear a field's error when the user edits it.
- On a valid submit, call `onSubmit(values)` and show a confirmation summary of the entries with an
  "Edit" action that returns to the form.

## What is provided
- The screen and header (`BookingScreen`, with the title and subtitle), mounted on both platforms: the
  web Bookings tab (`apps/web`) and the native app's main screen (`apps/native-host`).
- Baseline copy: the `booking.*` strings (labels, placeholders, errors, submit, confirm) exist in
  `@core/i18n` for EN and DE as a starting point. Use `i18n.t(...)` rather than hardcoding text. You are
  free to rewrite this copy, and German is only an example second language: swap it, or add your own.
- Design tokens (`@ui/tokens`: `colors`, `spacing`, `radius`) and RSD (`html`, `css`).
- The component, feature, and screen packages and their barrels already exist; you fill in the stubs.

## Run it
- Web: `pnpm nx dev web`, then open the Bookings screen.
- Native (two terminals, from `apps/native-host/`): `pnpm start` for Metro, then `pnpm run ios`
  (or `pnpm run android`). After a native-side change, `pnpm exec rock run:ios --local`.
- Switch locale (EN / DE) and light / dark from the buttons in the top bar.
- Typecheck a package as you go: `pnpm nx typecheck @ui/components`.
- Nx, Next, and Metro cache independently; if a change will not show, it is almost always a cache, ask
  for the command cheat sheet.

## Definition of done
Aim for the core; reach into the stretch if the room flies. Partial is fine, this is a 2-hour block.

Core:
- Your `BookingForm` replaces the placeholder and renders (swap it into `BookingScreen`).
- All six fields are controlled: each reflects and updates the form state.
- Submit validates: the right inline error shows under each invalid field, and editing a field clears
  its error.
- A valid submit calls `onSubmit(values)` and shows a confirmation summary.
- It runs on web; because the primitives are RSD, it should run on native too (verify if you can).

Stretch:
- Native parity verified, including the date field's `.native` split (web `type="date"` picker vs a
  plain native text input).
- The confirmation's "Edit" returns to the form with the values intact.
- Accessibility: label / `id` association, accessible names, invalid fields marked (the X2 muscle).
- Locale: copy switches EN / DE, or wire your own second language.
- Per-element discipline from X3 where it earns its keep.

## Notes
- Build and verify on BOTH web and native. One RSD component set serves both, which is the whole point
  of the kit, so run it in the web app and in the native app. Watch for primitives that need
  platform-specific behavior: the date field, for example, can use a native `type="date"` picker on web
  while native needs a plain text input. The `.native` file convention (used elsewhere in the kit) is
  how you branch one component per platform.
- Keep the per-element discipline from X3 in mind, but correctness and accessibility come first here.
- Stuck on a component API or an RSD prop? Ask. That is what the room is for.

## Where to start
- `packages/feature/booking/src/lib/booking-state.ts` — the model
- `packages/feature/booking/src/lib/booking-form.tsx` — the form
- `packages/ui/components/src/lib/*.tsx` — the stubs (`text-field`, `text-area-field`, `date-field`,
  `stepper`, `button`, `card`, `inline-alert`, `field-label`)
- `packages/screen/booking/src/lib/booking-screen.tsx` — mount your form
