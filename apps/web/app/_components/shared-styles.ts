import { css } from 'react-strict-dom';
import { colors } from '@ui/tokens/tokens.css';

export const shared = css.create({
  chip: {
    alignSelf: 'flex-start',
    fontSize: 12.5,
    fontWeight: 600,
    color: colors.textMuted,
    backgroundColor: colors.bgSurface,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: 999,
    paddingBlock: 5,
    paddingInline: 10,
  },
  avatar: { width: 34, height: 34, borderRadius: 999, flexShrink: 0 },
  avatarGreen: { backgroundColor: '#34D399' },
});
