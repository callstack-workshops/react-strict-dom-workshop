import { useState } from 'react';
import { css, html } from 'react-strict-dom';
import { spacing } from '@ui/tokens/tokens.css';
import {
  Button,
  Card,
  InlineAlert,
  Stepper,
  TextAreaField,
  TextField,
} from '@ui/components';
import {
  type BookingErrors,
  type BookingFormValues,
  initialBooking,
  hasErrors,
  validateBooking,
} from './booking-state.js';

export type BookingFormProps = {
  onSubmit?: (values: BookingFormValues) => void;
};

export function BookingForm({ onSubmit }: BookingFormProps) {
  const [values, setValues] = useState<BookingFormValues>(initialBooking);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof BookingFormValues>(
    key: K,
    value: BookingFormValues[K],
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (prev[key] == null) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const submit = () => {
    const nextErrors = validateBooking(values);
    setErrors(nextErrors);
    if (!hasErrors(nextErrors)) {
      setSubmitted(true);
      onSubmit?.(values);
    }
  };

  if (submitted) {
    return (
      <Card data-testid="booking-confirmation">
        <html.span style={styles.heading}>You are booked</html.span>
        <html.span style={styles.confirmText}>
          Thanks {values.name}. We will email {values.email} to confirm {String(values.participants)} on {values.date}.
        </html.span>
        <Button variant="secondary" onPress={() => setSubmitted(false)} data-testid="booking-edit">
          Edit request
        </Button>
      </Card>
    );
  }

  return (
    <Card data-testid="booking-form">
      <html.span style={styles.heading}>Request a booking</html.span>
      <TextField
        label="Full name"
        id="booking-name"
        value={values.name}
        onChangeText={(v) => update('name', v)}
        placeholder="Ada Lovelace"
        invalid={errors.name != null}
        data-testid="booking-field-name"
      />
      {errors.name != null ? <InlineAlert data-testid="booking-error-name">{errors.name}</InlineAlert> : null}
      <TextField
        label="Email"
        id="booking-email"
        type="email"
        value={values.email}
        onChangeText={(v) => update('email', v)}
        placeholder="ada@example.com"
        invalid={errors.email != null}
        data-testid="booking-field-email"
      />
      {errors.email != null ? <InlineAlert data-testid="booking-error-email">{errors.email}</InlineAlert> : null}
      <Stepper
        label="Participants"
        value={values.participants}
        onChange={(v) => update('participants', v)}
        data-testid="booking-field-participants"
      />
      <TextField
        label="Date"
        id="booking-date"
        value={values.date}
        onChangeText={(v) => update('date', v)}
        placeholder="YYYY-MM-DD"
        invalid={errors.date != null}
        data-testid="booking-field-date"
      />
      {errors.date != null ? <InlineAlert data-testid="booking-error-date">{errors.date}</InlineAlert> : null}
      <TextAreaField
        label="Special requests"
        id="booking-requests"
        value={values.requests}
        onChangeText={(v) => update('requests', v)}
        placeholder="Anything we should know?"
        data-testid="booking-field-requests"
      />
      <Button onPress={submit} data-testid="booking-submit">
        Request booking
      </Button>
    </Card>
  );
}

const styles = css.create({
  heading: {
    color: '#18181B',
    fontSize: 20,
    fontWeight: 700,
    marginBlockEnd: spacing.x1,
  },
  confirmText: {
    color: '#18181B',
    fontSize: 16,
  },
});
