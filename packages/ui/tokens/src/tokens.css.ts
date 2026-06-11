import { css } from 'react-strict-dom';

export const colors = css.defineVars({
  bgSurface: '#FAFAFA',
  bgCard: '#FFFFFF',
  border: '#E4E4E7',
  textPrimary: '#18181B',
  textMuted: '#52525B',
  textPlaceholder: '#A1A1AA',
  textOnAction: '#FFFFFF',
  actionPrimary: '#2563EB',
  actionPrimaryHover: '#1D4ED8',
  critical: '#B91C1C',
  bgCriticalSubtle: '#FEF2F2',
});

export const spacing = css.defineVars({
  x1: '4px',
  x2: '8px',
  x3: '16px',
  x4: '24px',
  x5: '32px',
});

export const radius = css.defineVars({
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
});
