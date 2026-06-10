import type { Locale, TranslationKey } from './i18n.types.js';

export const translations: Record<Locale, Record<TranslationKey, string>> = {
  en: {
    'greeting.hello': 'Hello',
    'greeting.subtitle': 'Rendered from @ui/components through React Strict DOM.',
  },
};
