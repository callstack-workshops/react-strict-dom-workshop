import { translations } from './translations.js';
import type { I18n, Locale, TranslationKey } from './i18n.types.js';

export type { I18n, Locale, TranslationKey } from './i18n.types.js';

export const locales = Object.keys(translations) as Locale[];

export function createI18n(locale: Locale): I18n {
  return {
    locale,
    t: (key: TranslationKey) => translations[locale][key],
  };
}
