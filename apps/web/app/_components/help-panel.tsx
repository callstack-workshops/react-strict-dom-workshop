'use client';

import { css, html } from 'react-strict-dom';
import { useLocalization } from '@core/i18n/provider';
import { colors, spacing, radius } from '@ui/tokens/tokens.css';
import { IconLife } from './icons';

export function HelpPanel() {
  const { i18n } = useLocalization();
  return (
    <html.div style={styles.help}>
      <html.div style={styles.helpIcon}>
        <IconLife />
      </html.div>
      <html.div style={styles.helpBody}>
        <html.span style={styles.helpTitle}>{i18n.t('shell.help.title')}</html.span>
        <html.span style={styles.helpText}>{i18n.t('shell.help.text')}</html.span>
      </html.div>
    </html.div>
  );
}

const styles = css.create({
  help: { display: 'flex', flexDirection: 'row', gap: spacing.x2, alignItems: 'flex-start', padding: spacing.x3, backgroundColor: colors.bgCard, borderWidth: 1, borderStyle: 'solid', borderColor: colors.border, borderRadius: radius.xl },
  helpIcon: { width: 38, height: 38, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: radius.md, backgroundColor: colors.bgActionSubtle, color: colors.onActionSubtle },
  helpBody: { display: 'flex', flexDirection: 'column', gap: 3 },
  helpTitle: { fontSize: 14.5, fontWeight: 700, color: colors.textPrimary },
  helpText: { fontSize: 13, color: colors.textMuted },
});
