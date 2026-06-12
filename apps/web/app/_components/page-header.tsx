'use client';

import { css, html } from 'react-strict-dom';
import { useLocalization } from '@core/i18n/provider';
import { colors, spacing } from '@ui/tokens/tokens.css';

export function PageHeader() {
  const { i18n } = useLocalization();
  return (
    <html.div style={styles.head}>
      <html.span style={styles.eyebrow}>{i18n.t('shell.header.eyebrow')}</html.span>
      <html.h1 style={styles.h1}>{i18n.t('booking.title')}</html.h1>
      <html.p style={styles.lead}>{i18n.t('shell.header.lead')}</html.p>
    </html.div>
  );
}

const styles = css.create({
  head: { marginBlockEnd: spacing.x4 },
  eyebrow: { fontFamily: 'monospace', fontSize: 12, letterSpacing: 1.4, textTransform: 'uppercase', color: colors.actionPrimary, fontWeight: 600 },
  h1: { fontSize: 30, fontWeight: 700, letterSpacing: -0.5, color: colors.textPrimary, marginBlock: spacing.x1 },
  lead: { fontSize: 15, color: colors.textMuted },
});
