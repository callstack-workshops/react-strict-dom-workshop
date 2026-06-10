export type Locale = 'en';

export type TranslationKey = 'greeting.hello' | 'greeting.subtitle';

export interface I18n {
  readonly locale: Locale;
  t(key: TranslationKey): string;
}
