import type { ReactNode } from 'react';
import { css, html } from 'react-strict-dom';
import { colors, spacing } from '@ui/tokens/tokens.css';

export type FieldLabelProps = {
  children: ReactNode;
  htmlFor?: string;
};

export function FieldLabel({ children, htmlFor }: FieldLabelProps) {
  return (
    <html.label for={htmlFor} style={styles.label}>
      {children}
    </html.label>
  );
}

const styles = css.create({
  label: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: 600,
    marginBlockEnd: spacing.x1,
  },
});
