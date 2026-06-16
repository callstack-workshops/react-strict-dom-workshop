import { css, html } from 'react-strict-dom';

export type AvatarTone = 'teal' | 'rose' | 'green' | 'violet';
export type AvatarProps = { tone: AvatarTone };

const avatarTones = css.create({
  teal: { backgroundColor: '#14B8A6' },
  rose: { backgroundColor: '#FB7185' },
  green: { backgroundColor: '#34D399' },
  violet: { backgroundColor: '#A78BFA' },
});

const styles = css.create({
  root: { width: 36, height: 36, borderRadius: 999, flexShrink: 0, alignSelf: 'center' },
});

// Default implementation, and what web uses: a normal RSD html.div, so it runs the full per-element
// pipeline (useNativeProps -> useStyleProps) like every other html.* element. See avatar.native.tsx for
// the X3 escape-hatch variant that drops this leaf to plain React Native on device.
export function Avatar({ tone }: AvatarProps) {
  return <html.div style={[styles.root, avatarTones[tone]]} />;
}
