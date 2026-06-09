import type { Locale, TranslationKey } from './i18n.types.js';

export const translations: Record<Locale, Record<TranslationKey, string>> = {
  en: {
    'greeting.hello': 'Hello',
    'greeting.subtitle': 'Rendered from @ui/components through React Strict DOM.',
  },
  el: {
    'greeting.hello': 'Γεια',
    'greeting.subtitle': 'Σχεδιάστηκε από το @ui/components μέσω React Strict DOM.',
  },
  pl: {
    'greeting.hello': 'Cześć',
    'greeting.subtitle': 'Wyrenderowane z @ui/components przez React Strict DOM.',
  },
  de: {
    'greeting.hello': 'Hallo',
    'greeting.subtitle': 'Gerendert aus @ui/components durch React Strict DOM.',
  },
};
