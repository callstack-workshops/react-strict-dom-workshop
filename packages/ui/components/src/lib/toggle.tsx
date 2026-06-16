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

// WORKSHOP-TODO(X2 A2): this primitive renders and takes the right props, but it is NOT accessible on
// native yet. It rides on aria-pressed (the canonical web toggle signal): that announces "pressed" on
// web, but has no native home - RN accessibilityState has no 'pressed' field, so RSD drops it and the
// dark/light state is never announced on native (only the icon changes). Two fixes, then wire it in:
//   1. add  role="button"                              (html.button alone gets no native role here)
//   2. carry the state in the NAME, not aria-pressed:  aria-label={`${label}, ${pressed ? 'on' : 'off'}`}
// Then swap the raw html.button in navbar.tsx and topbar.tsx for <Toggle pressed=... onPress=... label=... />.
export function Toggle({ pressed, onPress, label, children, style }: ToggleProps) {
  return (
    <html.button
      onClick={onPress}
      aria-pressed={pressed}
      aria-label={label}
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
