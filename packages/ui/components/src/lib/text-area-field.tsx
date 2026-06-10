import { css, html } from 'react-strict-dom';
import { colors, spacing, radius } from '@ui/tokens/tokens.css';
import { FieldLabel } from './field-label.js';

export type TextAreaFieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  id?: string;
  placeholder?: string;
  rows?: number;
  invalid?: boolean;
  'data-testid'?: string;
};

type ChangeEventLike = { target: { value: string } };

export function TextAreaField({
  label,
  value,
  onChangeText,
  id,
  placeholder,
  rows = 4,
  invalid = false,
  'data-testid': dataTestId,
}: TextAreaFieldProps) {
  return (
    <html.div style={styles.field}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <html.textarea
        id={id}
        value={value}
        placeholder={placeholder}
        rows={rows}
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
    borderRadius: radius.md,
    paddingInline: spacing.x3,
    paddingBlock: spacing.x3,
    fontSize: 16,
    minHeight: 96,
  },
  inputInvalid: {
    borderColor: colors.critical,
  },
});
