'use client';

import { useEffect } from 'react';
import { useTheme } from '@core/providers/theme';
import { surfaceColor, surfaceColorDark } from '@ui/tokens/tokens.css';

export function DocumentTheme() {
  const { isDark } = useTheme();
  useEffect(() => {
    document.body.style.backgroundColor = isDark ? surfaceColorDark : surfaceColor;
  }, [isDark]);
  return null;
}
