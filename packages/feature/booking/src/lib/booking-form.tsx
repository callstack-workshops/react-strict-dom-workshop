import { useState } from 'react';
import { css, html } from 'react-strict-dom';
import { useLocalization } from '@core/i18n/provider';
import { colors, spacing } from '@ui/tokens/tokens.css';
import {
  Button,
  Card,
  DateField,
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
  const { i18n } = useLocalization();
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
    if (hasErrors(nextErrors) === false) {
      setSubmitted(true);
      onSubmit?.(values);
    }
  };

  if (submitted) {
    return (
      <Card data-testid="booking-confirmation">
        <html.span style={styles.summaryRow}>
          {i18n.t('booking.label.name')}: {values.name}
        </html.span>
        <html.span style={styles.summaryRow}>
          {i18n.t('booking.label.email')}: {values.email}
        </html.span>
        <html.span style={styles.summaryRow}>
          {i18n.t('booking.label.participants')}: {String(values.participants)}
        </html.span>
        <html.span style={styles.summaryRow}>
          {i18n.t('booking.label.date')}: {values.date}
        </html.span>
        <Button variant="secondary" onPress={() => setSubmitted(false)} data-testid="booking-edit">
          {i18n.t('booking.confirm.edit')}
        </Button>
      </Card>
    );
  }

  return (
    <Card data-testid="booking-form">
      <TextField
        label={i18n.t('booking.label.name')}
        id="booking-name"
        value={values.name}
        onChangeText={(v) => update('name', v)}
        placeholder={i18n.t('booking.placeholder.name')}
        invalid={errors.name != null}
        data-testid="booking-field-name"
      />
      {errors.name != null ? <InlineAlert data-testid="booking-error-name">{i18n.t(errors.name)}</InlineAlert> : null}
      <TextField
        label={i18n.t('booking.label.email')}
        id="booking-email"
        type="email"
        value={values.email}
        onChangeText={(v) => update('email', v)}
        placeholder={i18n.t('booking.placeholder.email')}
        invalid={errors.email != null}
        data-testid="booking-field-email"
      />
      {errors.email != null ? <InlineAlert data-testid="booking-error-email">{i18n.t(errors.email)}</InlineAlert> : null}
      <Stepper
        label={i18n.t('booking.label.participants')}
        value={values.participants}
        onChange={(v) => update('participants', v)}
        data-testid="booking-field-participants"
      />
      <DateField
        label={i18n.t('booking.label.date')}
        id="booking-date"
        value={values.date}
        onChangeText={(v) => update('date', v)}
        invalid={errors.date != null}
        data-testid="booking-field-date"
      />
      {errors.date != null ? <InlineAlert data-testid="booking-error-date">{i18n.t(errors.date)}</InlineAlert> : null}
      <TextAreaField
        label={i18n.t('booking.label.requests')}
        id="booking-requests"
        value={values.requests}
        onChangeText={(v) => update('requests', v)}
        placeholder={i18n.t('booking.placeholder.requests')}
        data-testid="booking-field-requests"
      />
      <Button onPress={submit} data-testid="booking-submit">
        {i18n.t('booking.submit')}
      </Button>
    </Card>
  );
}

const styles = css.create({
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBlockEnd: spacing.x1,
  },
  heading: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: 700,
  },
  summaryRow: {
    color: colors.textMuted,
    fontSize: 16,
  },
});
