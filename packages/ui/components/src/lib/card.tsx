import type { ReactNode } from 'react';
import { css, html } from 'react-strict-dom';
import { colors, spacing, radius } from '@ui/tokens/tokens.css';

export type CardProps = {
  children: ReactNode;
  'data-testid'?: string;
};

export function Card({ children, 'data-testid': dataTestId }: CardProps) {
  return (
    <html.div data-testid={dataTestId} style={styles.card}>
      {children}
    </html.div>
  );
}

const styles = css.create({
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: 420,
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radius.xl,
    paddingInline: spacing.x4,
    paddingBlock: spacing.x5,
    gap: spacing.x3,
  },
});
