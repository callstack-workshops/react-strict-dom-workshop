export type BookingFormValues = {
  name: string;
  email: string;
  participants: number;
  date: string;
  requests: string;
};

export type BookingErrors = Partial<Record<keyof BookingFormValues, string>>;

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
    errors.name = 'Please enter your name.';
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (form.participants < 1) {
    errors.participants = 'At least one participant is required.';
  }
  if (form.date.trim().length === 0) {
    errors.date = 'Please choose a date.';
  }
  return errors;
}

export function hasErrors(errors: BookingErrors): boolean {
  return Object.keys(errors).length > 0;
}
