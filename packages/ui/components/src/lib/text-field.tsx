import { css, html } from 'react-strict-dom';
import { colors, spacing, radius } from '@ui/tokens/tokens.css';
import { FieldLabel } from './field-label.js';

export type TextFieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  id?: string;
  type?: 'text' | 'email';
  placeholder?: string;
  invalid?: boolean;
  'data-testid'?: string;
};

type ChangeEventLike = { target: { value: string } };

export function TextField({
  label,
  value,
  onChangeText,
  id,
  type = 'text',
  placeholder,
  invalid = false,
  'data-testid': dataTestId,
}: TextFieldProps) {
  return (
    <html.div style={styles.field}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <html.input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
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
  },
  inputInvalid: {
    borderColor: colors.critical,
  },
});
