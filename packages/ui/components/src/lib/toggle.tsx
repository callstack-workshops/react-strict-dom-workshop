import type { ComponentProps, ReactNode } from 'react';
import { css, html } from 'react-strict-dom';
import { colors } from '@ui/tokens/tokens.css';

// Accept whatever html.button accepts for `style`, so a call site can pass its existing button style
// (size, colours, border, layout) without trimming. Toggle's own `root` provides the defaults; the
// call-site style is merged on top.
export type ToggleStyleOverride = ComponentProps<typeof html.button>['style'];

export type ToggleProps = {
  pressed: boolean;
  onPress: () => void;
  label: string;
  children: ReactNode;
  style?: ToggleStyleOverride;
};

// The accessible primitive: it bakes the native gap into one component, so call sites stay clean.
// - role="button": html.button alone gets no native role on this build.
// - aria-pressed: rich toggle semantics on web.
// - the state is carried in the accessible name ("Dark mode, on" / "off") because aria-pressed has no
//   native home, this is what actually announces on iOS and Android.
export function Toggle({ pressed, onPress, label, children, style }: ToggleProps) {
  return (
    <html.button
      onClick={onPress}
      role="button"
      aria-pressed={pressed}
      aria-label={`${label}, ${pressed ? 'on' : 'off'}`}
      style={[styles.root, style]}
    >
      {children}
    </html.button>
  );
}

const styles = css.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.border,
    cursor: 'pointer',
  },
});
