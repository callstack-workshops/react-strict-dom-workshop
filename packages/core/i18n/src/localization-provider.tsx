'use client';

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { createI18n } from './i18n.js';
import type { I18n, Locale } from './i18n.types.js';

type LocalizationContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  i18n: I18n;
};

const LocalizationContext = createContext<LocalizationContextValue>({
  locale: 'en',
  setLocale: () => {},
  i18n: createI18n('en'),
});

export function LocalizationProvider({
  children,
  initialLocale = 'en',
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const value = useMemo<LocalizationContextValue>(
    () => ({ locale, setLocale, i18n: createI18n(locale) }),
    [locale],
  );
  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
}

export function useLocalization(): LocalizationContextValue {
  return useContext(LocalizationContext);
}
