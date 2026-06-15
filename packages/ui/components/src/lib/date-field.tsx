import { css, html } from 'react-strict-dom';
import { colors, spacing, radius } from '@ui/tokens/tokens.css';
import { FieldLabel } from './field-label.js';
import { dateInputType, datePlaceholder } from './date-input-config.js';

type ChangeEventLike = { target: { value: string } };

export type DateFieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  id?: string;
  invalid?: boolean;
  'data-testid'?: string;
};

export function DateField({
  label,
  value,
  onChangeText,
  id,
  invalid = false,
  'data-testid': dataTestId,
}: DateFieldProps) {
  return (
    <html.div style={styles.field}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <html.input
        id={id}
        type={dateInputType}
        value={value}
        placeholder={datePlaceholder}
        aria-invalid={invalid}
        data-testid={dataTestId}
        onChange={(e: ChangeEventLike) => onChangeText(e.target.value)}
        style={[styles.input, invalid && styles.inputInvalid]}
      />
    </html.div>
  );
}

const styles = css.create({
  field: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    backgroundColor: colors.bgSurface,
    color: colors.textPrimary,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: {
      default: colors.border,
      ':focus': colors.actionPrimary,
    },
    '::placeholder': {
      color: colors.textPlaceholder,
    },
    borderRadius: radius.md,
    paddingInline: spacing.x3,
    paddingBlock: spacing.x3,
    fontSize: 16,
  },
  inputInvalid: {
    borderColor: colors.critical,
  },
});
