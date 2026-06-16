import { useState } from 'react';
import { css, html } from 'react-strict-dom';
import { colors, spacing, radius } from '@ui/tokens/tokens.css';

type ChangeEventLike = { target: { value: string } };

export type PromoCodeProps = {
  announce?: (message: string) => void;
};

export function PromoCode({ announce }: PromoCodeProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const showError = (message: string) => {
    setError(message);
    if (message) announce?.(message);
  };

  const onCodeChange = (value: string) => {
    setCode(value);
    showError(value.length > 0 && value.length < 4 ? 'Code must be at least 4 characters.' : '');
  };

  const apply = () => {
    showError(code.length < 4 ? 'Code must be at least 4 characters.' : '');
  };

  const invalid = error.length > 0;
  // A7 + N1: native cannot bind label-for, and aria-describedby / aria-invalid are dropped, so the
  // input's name, its hint, and its validity all have to live in one place: the accessible name.
  const inputLabel = invalid
    ? `Promo code, invalid. ${error}`
    : 'Promo code. Use at least 4 characters.';

  return (
    <html.div style={styles.card}>
      <html.h3 style={styles.heading}>Have a promo code?</html.h3>

      <html.div style={styles.field}>
        <html.label for="promo-code" style={styles.label}>
          Promo code
        </html.label>
        <html.div style={styles.inputRow}>
          <html.input
            id="promo-code"
            aria-label={inputLabel}
            value={code}
            placeholder="Enter code"
            onChange={(e: ChangeEventLike) => onCodeChange(e.target.value)}
            style={styles.input}
          />
          <html.button onClick={apply} role="button" style={styles.apply}>
            Apply
          </html.button>
        </html.div>
        <html.span style={styles.hint}>Use at least 4 characters.</html.span>
        {error ? (
          <html.div aria-live="polite" style={styles.error}>
            {error}
          </html.div>
        ) : null}
      </html.div>
    </html.div>
  );
}

const styles = css.create({
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.x2,
    paddingBlock: spacing.x4,
    paddingInline: spacing.x4,
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radius.xl,
  },
  heading: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.x1,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
  },
  inputRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x2,
  },
  input: {
    flexGrow: 1,
    minWidth: 0,
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
    paddingBlock: spacing.x2,
    fontSize: 16,
  },
  apply: {
    flexShrink: 0,
    backgroundColor: colors.actionPrimary,
    color: colors.textOnAction,
    paddingInline: spacing.x4,
    paddingBlock: spacing.x2,
    borderWidth: 0,
    borderStyle: 'none',
    borderRadius: radius.md,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'inherit',
    cursor: 'pointer',
  },
  hint: {
    fontSize: 12,
    color: colors.textPlaceholder,
  },
  error: {
    fontSize: 13,
    color: colors.critical,
    marginBlockStart: spacing.x1,
  },
});
