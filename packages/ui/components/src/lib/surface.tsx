import type { ReactNode } from 'react';
import { css, html } from 'react-strict-dom';
import { colors, spacing } from '@ui/tokens/tokens.css';

export type SurfaceProps = {
  children: ReactNode;
  'data-testid'?: string;
};

export function Surface({ children, 'data-testid': dataTestId }: SurfaceProps) {
  return (
    <html.div data-testid={dataTestId} style={styles.surface}>
      {children}
    </html.div>
  );
}

const styles = css.create({
  surface: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
    backgroundColor: colors.bgSurface,
    paddingBlock: spacing.x5,
    paddingInline: spacing.x3,
  },
});
