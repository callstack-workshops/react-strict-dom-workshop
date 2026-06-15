import { css } from 'react-strict-dom';
import { colors } from './tokens.css.js';

const surface = '#09090B';
const card = '#18181B';
const border = '#27272A';
const textPrimary = '#FAFAFA';
const textMuted = '#A1A1AA';
const textPlaceholder = '#71717A';
const textOnAction = '#FFFFFF';
const action = '#3B82F6';
const actionHover = '#60A5FA';
const critical = '#F87171';
const criticalSubtle = '#450A0A';
const actionSubtle = '#172554';
const actionSubtleStrong = '#1E3A8A';
const onActionSubtle = '#93C5FD';

export const darkTheme = css.createTheme(colors, {
  bgSurface: surface,
  bgCard: card,
  border,
  textPrimary,
  textMuted,
  textPlaceholder,
  textOnAction,
  actionPrimary: action,
  actionPrimaryHover: actionHover,
  critical,
  bgCriticalSubtle: criticalSubtle,
  bgActionSubtle: actionSubtle,
  bgActionSubtleStrong: actionSubtleStrong,
  onActionSubtle,
});
