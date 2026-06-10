import { css } from 'react-strict-dom';

export const colors = css.defineVars({
  bgSurface: '#FFFFFF',
  bgCard: '#F4F4F5',
  textPrimary: '#18181B',
  textMuted: '#52525B',
  textOnAction: '#FFFFFF',
  actionPrimary: '#0D9488',
  actionPrimaryHover: '#0F766E',
  critical: '#B91C1C',
});

export const spacing = css.defineVars({
  x1: '4px',
  x2: '8px',
  x3: '16px',
  x4: '24px',
});

export const radius = css.defineVars({
  sm: '4px',
  md: '8px',
  lg: '12px',
});
