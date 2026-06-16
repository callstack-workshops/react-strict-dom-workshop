import { View } from 'react-native';
import type { AvatarProps, AvatarTone } from './avatar.js';

// X3 STRETCH, the compat / escape-hatch variant. On device this leaf renders a plain React Native View
// instead of html.div, so it never runs useNativeProps / useStyleProps: it leaves the RSD per-element
// pipeline entirely (one fewer hot frame per row in the flame). The price is exactly this file: the
// avatar is now split-authored (html.div on web, View on native) and its styling is hand-written RN
// rather than the shared css.create tokens. Worth it only because the avatar is a hot, purely
// presentational leaf that needs none of RSD's cascade, inheritance, or theming.
const TONE: Record<AvatarTone, string> = {
  teal: '#14B8A6',
  rose: '#FB7185',
  green: '#34D399',
  violet: '#A78BFA',
};

export function Avatar({ tone }: AvatarProps) {
  return (
    <View
      style={{
        width: 36,
        height: 36,
        borderRadius: 18,
        alignSelf: 'center',
        backgroundColor: TONE[tone],
      }}
    />
  );
}
