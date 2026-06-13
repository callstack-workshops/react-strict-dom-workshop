import { css } from 'react-strict-dom';
import {
  colors,
  surfaceColorDark,
  textPrimaryColorDark,
  textPlaceholderColorDark,
  textOnActionColor,
  actionColorDark,
} from './tokens.css.js';

export const darkTheme = css.createTheme(colors, {
  bgSurface: surfaceColorDark,
  bgCard: '#18181B',
  border: '#27272A',
  textPrimary: textPrimaryColorDark,
  textMuted: '#A1A1AA',
  textPlaceholder: textPlaceholderColorDark,
  textOnAction: textOnActionColor,
  actionPrimary: actionColorDark,
  actionPrimaryHover: '#60A5FA',
  critical: '#F87171',
  bgCriticalSubtle: '#450A0A',
  bgActionSubtle: '#172554',
  bgActionSubtleStrong: '#1E3A8A',
  onActionSubtle: '#93C5FD',
});
