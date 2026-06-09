export type Locale = 'en' | 'el' | 'pl' | 'de';

export type TranslationKey = 'greeting.hello' | 'greeting.subtitle';

export interface I18n {
  readonly locale: Locale;
  t(key: TranslationKey): string;
}
