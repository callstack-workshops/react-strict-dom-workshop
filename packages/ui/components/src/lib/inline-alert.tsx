import type { ReactNode } from 'react';
import { css, html } from 'react-strict-dom';
import { colors, spacing, radius } from '@ui/tokens/tokens.css';

export type InlineAlertProps = {
  children: ReactNode;
  'data-testid'?: string;
};

export function InlineAlert({ children, 'data-testid': dataTestId }: InlineAlertProps) {
  return (
    <html.div role="alert" data-testid={dataTestId} style={styles.alert}>
      <html.span style={styles.text}>{children}</html.span>
    </html.div>
  );
}

const styles = css.create({
  alert: {
    backgroundColor: colors.bgCard,
    borderInlineStartWidth: 4,
    borderInlineStartStyle: 'solid',
    borderInlineStartColor: colors.critical,
    borderRadius: radius.sm,
    paddingInline: spacing.x3,
    paddingBlock: spacing.x2,
  },
  text: {
    color: colors.critical,
    fontSize: 14,
  },
});
