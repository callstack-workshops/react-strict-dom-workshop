import type { TranslationKey } from '@core/i18n';

export type BookingFormValues = {
  name: string;
  email: string;
  participants: number;
  date: string;
  requests: string;
};

export type BookingErrors = Partial<Record<keyof BookingFormValues, TranslationKey>>;

export const initialBooking: BookingFormValues = {
  name: '',
  email: '',
  participants: 2,
  date: '',
  requests: '',
};

export function validateBooking(form: BookingFormValues): BookingErrors {
  const errors: BookingErrors = {};
  if (form.name.trim().length === 0) {
    errors.name = 'booking.error.nameRequired';
  }
  if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) === false) {
    errors.email = 'booking.error.emailInvalid';
  }
  if (form.participants < 1) {
    errors.participants = 'booking.error.participantsMin';
  }
  if (form.date.trim().length === 0) {
    errors.date = 'booking.error.dateRequired';
  }
  return errors;
}

export function hasErrors(errors: BookingErrors): boolean {
  return Object.keys(errors).length > 0;
}
