import { css } from 'react-strict-dom';

export const surfaceColor = '#FAFAFA';
export const surfaceColorDark = '#09090B';
export const fontFamily = 'Hanken Grotesk';

export const textPrimaryColor = '#18181B';
export const textPrimaryColorDark = '#FAFAFA';
export const textPlaceholderColor = '#A1A1AA';
export const textPlaceholderColorDark = '#71717A';
export const textOnActionColor = '#FFFFFF';
export const actionColor = '#2563EB';
export const actionColorDark = '#3B82F6';

export const colors = css.defineVars({
  bgSurface: surfaceColor,
  bgCard: '#FFFFFF',
  border: '#E4E4E7',
  textPrimary: textPrimaryColor,
  textMuted: '#52525B',
  textPlaceholder: textPlaceholderColor,
  textOnAction: textOnActionColor,
  actionPrimary: actionColor,
  actionPrimaryHover: '#1D4ED8',
  critical: '#B91C1C',
  bgCriticalSubtle: '#FEF2F2',
  bgActionSubtle: '#EEF3FE',
  bgActionSubtleStrong: '#E2EBFC',
  onActionSubtle: '#1D4ED8',
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

// X1 STRETCH: responsive breakpoints as shared design tokens. css.defineConsts
// lets a @media string be used as a named conditional key in css.create (deck
// slide 10). It must live in a tokens .css.ts file: the StyleX web compiler
// hashes defineConsts/defineVars by module path, so an inline const in a
// component file fails to compile ("must be bound to a named export").
export const bp = css.defineConsts({
  wide: '@media (min-width: 480px)',
});
