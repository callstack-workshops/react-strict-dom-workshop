import { css, html } from 'react-strict-dom';
import { colors, spacing } from '@ui/tokens/tokens.css';
import { Button } from './button.js';
import { FieldLabel } from './field-label.js';

export type StepperProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  'data-testid'?: string;
};

export function Stepper({
  label,
  value,
  onChange,
  min = 1,
  max = 99,
  'data-testid': dataTestId,
}: StepperProps) {
  const decrement = () => onChange(Math.max(min, value - 1));
  const increment = () => onChange(Math.min(max, value + 1));

  return (
    <html.div style={styles.field} data-testid={dataTestId}>
      <FieldLabel>{label}</FieldLabel>
      <html.div style={styles.row}>
        <Button variant="secondary" style={styles.stepButton} onPress={decrement} disabled={value <= min} data-testid="stepper-decrement">
          -
        </Button>
        <html.span style={styles.value} aria-live="polite">
          {String(value)}
        </html.span>
        <Button variant="secondary" style={styles.stepButton} onPress={increment} disabled={value >= max} data-testid="stepper-increment">
          +
        </Button>
      </html.div>
    </html.div>
  );
}

const styles = css.create({
  field: {
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x3,
  },
  stepButton: {
    paddingInline: spacing.x3,
    paddingBlock: spacing.x2,
  },
  value: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: 700,
    minWidth: 40,
    textAlign: 'center',
  },
});
