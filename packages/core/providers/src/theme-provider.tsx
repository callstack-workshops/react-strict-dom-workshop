'use client';

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ComponentProps,
  type ReactNode,
} from 'react';
import { html } from 'react-strict-dom';
import { darkTheme } from '@ui/tokens/themes';

type ThemeName = 'light' | 'dark';
type DivStyle = ComponentProps<typeof html.div>['style'];

type ThemeContextValue = {
  themeName: ThemeName;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  themeName: 'light',
  isDark: false,
  toggleTheme: () => {},
});

export function ThemeProvider({
  children,
  initialTheme = 'light',
}: {
  children: ReactNode;
  initialTheme?: ThemeName;
}) {
  const [themeName, setThemeName] = useState<ThemeName>(initialTheme);
  const value = useMemo<ThemeContextValue>(
    () => ({
      themeName,
      isDark: themeName === 'dark',
      toggleTheme: () =>
        setThemeName((current) => (current === 'dark' ? 'light' : 'dark')),
    }),
    [themeName],
  );
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function ThemeBoundary({ children }: { children: ReactNode }) {
  const { themeName } = useTheme();
  return (
    <html.div
      style={themeName === 'dark' ? (darkTheme as unknown as DivStyle) : undefined}
    >
      {children}
    </html.div>
  );
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
