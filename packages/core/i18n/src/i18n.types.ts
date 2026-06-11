export type Locale = 'en' | 'de';

export type TranslationKey =
  | 'booking.title'
  | 'booking.label.name'
  | 'booking.label.email'
  | 'booking.label.participants'
  | 'booking.label.date'
  | 'booking.label.requests'
  | 'booking.placeholder.name'
  | 'booking.placeholder.email'
  | 'booking.placeholder.requests'
  | 'booking.submit'
  | 'booking.confirm.title'
  | 'booking.confirm.edit'
  | 'booking.error.nameRequired'
  | 'booking.error.emailInvalid'
  | 'booking.error.participantsMin'
  | 'booking.error.dateRequired';

export interface I18n {
  readonly locale: Locale;
  t(key: TranslationKey): string;
}
