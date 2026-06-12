import { css } from 'react-strict-dom';
import { colors } from './tokens.css.js';

export const darkTheme = css.createTheme(colors, {
  bgSurface: '#09090B',
  bgCard: '#18181B',
  border: '#27272A',
  textPrimary: '#FAFAFA',
  textMuted: '#A1A1AA',
  textPlaceholder: '#71717A',
  textOnAction: '#FFFFFF',
  actionPrimary: '#3B82F6',
  actionPrimaryHover: '#60A5FA',
  critical: '#F87171',
  bgCriticalSubtle: '#450A0A',
  bgActionSubtle: '#172554',
  bgActionSubtleStrong: '#1E3A8A',
  onActionSubtle: '#93C5FD',
});
