'use client';

import { css, html } from 'react-strict-dom';
import { useLocalization } from '@core/i18n/provider';
import { colors, spacing, radius } from '@ui/tokens/tokens.css';
import { Hatch } from './hatch';
import { shared } from './shared-styles';

export function ExperienceBanner() {
  const { i18n } = useLocalization();
  return (
    <html.div style={styles.banner}>
      <html.div style={styles.bannerMedia}>
        <Hatch color="rgba(113,113,122,0.16)" rounded={radius.lg} />
        <html.span style={styles.phLabel}>img · experience</html.span>
      </html.div>
      <html.div style={styles.bannerBody}>
        <html.span style={shared.chip}>Sintra Coast, Portugal</html.span>
        <html.span style={styles.bannerTitle}>Coastal Caves Kayak Tour</html.span>
        <html.div style={styles.chipRow}>
          <html.span style={shared.chip}>{i18n.t('shell.banner.duration')}</html.span>
          <html.span style={shared.chip}>{i18n.t('shell.banner.group')}</html.span>
          <html.span style={shared.chip}>EN · DE</html.span>
        </html.div>
      </html.div>
      <html.div style={styles.bannerPrice}>
        <html.span style={styles.priceBig}>€74</html.span>
        <html.span style={styles.priceSub}>{i18n.t('shell.banner.perPerson')}</html.span>
        <html.span style={styles.priceRating}>★★★★★ 4.9</html.span>
      </html.div>
    </html.div>
  );
}

const styles = css.create({
  banner: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: spacing.x3, padding: spacing.x3, backgroundColor: colors.bgCard, borderWidth: 1, borderStyle: 'solid', borderColor: colors.border, borderRadius: radius.xl },
  bannerMedia: { position: 'relative', width: 184, height: 110, flexShrink: 0, borderRadius: radius.lg, backgroundColor: colors.bgSurface, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  bannerBody: { display: 'flex', flexDirection: 'column', gap: spacing.x2, flexGrow: 1, minWidth: 0 },
  bannerTitle: { fontSize: 19, fontWeight: 700, color: colors.textPrimary },
  bannerPrice: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', paddingInlineStart: spacing.x3, borderLeftWidth: 1, borderLeftStyle: 'solid', borderColor: colors.border, flexShrink: 0 },
  priceBig: { fontSize: 26, fontWeight: 700, color: colors.textPrimary },
  priceSub: { fontSize: 12, color: colors.textMuted },
  priceRating: { fontSize: 13, color: colors.actionPrimary, marginBlockStart: spacing.x1 },
  chipRow: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: spacing.x1 },
  phLabel: { position: 'relative', fontFamily: 'monospace', fontSize: 11.5, color: colors.textPlaceholder },
});
