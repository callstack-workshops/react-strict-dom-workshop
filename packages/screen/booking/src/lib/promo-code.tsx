import { useState } from 'react';
import { css, html } from 'react-strict-dom';
import { colors, spacing, radius } from '@ui/tokens/tokens.css';

type ChangeEventLike = { target: { value: string } };

export function PromoCode() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const onCodeChange = (value: string) => {
    setCode(value);
    setError(value.length > 0 && value.length < 4 ? 'Code must be at least 4 characters.' : '');
  };

  const apply = () => {
    setError(code.length < 4 ? 'Code must be at least 4 characters.' : '');
  };

  const invalid = error.length > 0;

  return (
    <html.div style={styles.card}>
      <html.h3 style={styles.heading}>Have a promo code?</html.h3>

      <html.div style={styles.field}>
        {/* WORKSHOP-TODO(X2 A7): the label's `for` is in the allowed prop set but is never mapped on
            native, so the input has no accessibilityLabel and the screen reader announces an unnamed
            edit field. Fix: put aria-label on the input itself. */}
        <html.label for="promo-code" style={styles.label}>
          Promo code
        </html.label>
        <html.div style={styles.inputRow}>
          {/* WORKSHOP-TODO(X2 N1): the hint and the invalid state are wired with aria-describedby and
              aria-invalid. Both are in the accepted prop set (tsc is green, no warning) but neither is
              mapped on native, so the screen reader never reads the hint or "invalid" on focus, the
              association is silently dropped (accessibilityHint cannot be expressed through RSD at all).
              Fix: fold the hint and the error into the input's accessible name (aria-label), since you
              cannot associate them on native. */}
          <html.input
            id="promo-code"
            aria-describedby="promo-hint"
            aria-invalid={invalid}
            value={code}
            placeholder="Enter code"
            onChange={(e: ChangeEventLike) => onCodeChange(e.target.value)}
            style={styles.input}
          />
          {/* WORKSHOP-TODO(X2 A1): this taps (onClick fires) but is a div with no role, so the screen
              reader reads "Apply" as static text and there is no button activation. Fix: make it an
              html.button AND add role="button" (html.button alone still gets no native role). */}
          <html.div onClick={apply} style={styles.apply}>
            Apply
          </html.div>
        </html.div>
        <html.span id="promo-hint" style={styles.hint}>
          Use at least 4 characters.
        </html.span>
        {/* WORKSHOP-TODO(X2 A4): the error appears in an aria-live region. aria-live maps to
            accessibilityLiveRegion (Android-only, broken on Fabric) and iOS has no live regions, so on
            this stack it announces on neither. Fix: announce it yourself
            (AccessibilityInfo.announceForAccessibility), injected by the native host. */}
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
    borderRadius: radius.md,
    fontSize: 14,
    fontWeight: '600',
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
