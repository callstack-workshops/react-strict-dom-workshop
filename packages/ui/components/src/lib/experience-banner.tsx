import { css, html } from 'react-strict-dom';
import { colors, spacing, radius } from '@ui/tokens/tokens.css';

export type ExperienceBannerProps = {
  title: string;
  location: string;
  chips: string[];
  price: string;
  priceSub: string;
  rating: string;
  mediaLabel?: string;
  variant?: 'row' | 'stacked';
  'data-testid'?: string;
};

export function ExperienceBanner({
  title,
  location,
  chips,
  price,
  priceSub,
  rating,
  mediaLabel = 'img · experience',
  variant = 'row',
  'data-testid': dataTestId,
}: ExperienceBannerProps) {
  const stacked = variant === 'stacked';
  return (
    <html.div data-testid={dataTestId} style={[styles.banner, stacked && styles.bannerStacked]}>
      <html.div style={[styles.media, stacked && styles.mediaStacked]}>
        <html.span style={styles.mediaLabel}>{mediaLabel}</html.span>
      </html.div>
      <html.div style={styles.body}>
        <html.span style={styles.chip}>{location}</html.span>
        <html.span style={styles.title}>{title}</html.span>
        <html.div style={styles.chipRow}>
          {chips.map((chip, i) => (
            <html.span key={i} style={styles.chip}>
              {chip}
            </html.span>
          ))}
        </html.div>
      </html.div>
      <html.div style={[styles.price, stacked && styles.priceStacked]}>
        <html.span style={styles.priceBig}>{price}</html.span>
        <html.span style={styles.priceSub}>{priceSub}</html.span>
        <html.span style={styles.priceRating}>{rating}</html.span>
      </html.div>
    </html.div>
  );
}

const styles = css.create({
  banner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x3,
    padding: spacing.x3,
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radius.xl,
  },
  bannerStacked: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  media: {
    position: 'relative',
    width: 184,
    height: 110,
    flexShrink: 0,
    borderRadius: radius.lg,
    backgroundColor: colors.bgSurface,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  mediaStacked: {
    width: '100%',
    height: 150,
  },
  mediaLabel: {
    fontFamily: 'monospace',
    fontSize: 11.5,
    color: colors.textPlaceholder,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.x2,
    flexGrow: 1,
    minWidth: 0,
  },
  title: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  chipRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.x1,
  },
  chip: {
    alignSelf: 'flex-start',
    fontSize: 12.5,
    fontWeight: '600',
    color: colors.textMuted,
    backgroundColor: colors.bgSurface,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: 999,
    paddingBlock: 5,
    paddingInline: 10,
  },
  price: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    paddingInlineStart: spacing.x3,
    borderLeftWidth: 1,
    borderLeftStyle: 'solid',
    borderColor: colors.border,
    flexShrink: 0,
  },
  priceStacked: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingInlineStart: 0,
    borderLeftWidth: 0,
    paddingBlockStart: spacing.x3,
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderColor: colors.border,
  },
  priceBig: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  priceSub: {
    fontSize: 12,
    color: colors.textMuted,
  },
  priceRating: {
    fontSize: 13,
    color: colors.actionPrimary,
    marginBlockStart: spacing.x1,
  },
});
