import { css, html } from 'react-strict-dom';
import type { Styles } from 'react-strict-dom';
import { colors, spacing, radius } from '@ui/tokens/tokens.css';

export type CtaStyleOverride = Styles<{
  backgroundColor?: string;
  color?: string;
  paddingInline?: string;
  paddingBlock?: string;
}>;

export type Availability = 'available' | 'filling' | 'soldout';

const AVAILABILITY_LABEL: Record<Availability, string> = {
  available: 'Available',
  filling: 'Filling fast',
  soldout: 'Sold out',
};

export type ExperienceBannerProps = {
  title: string;
  location: string;
  availability: Availability;
  chips: string[];
  price: string;
  priceSub: string;
  rating: string;
  mediaLabel?: string;
  ctaLabel?: string;
  ctaStyle?: CtaStyleOverride;
  onView?: () => void;
  variant?: 'row' | 'stacked';
  'data-testid'?: string;
};

export function ExperienceBanner({
  title,
  location,
  availability,
  chips,
  price,
  priceSub,
  rating,
  mediaLabel = 'img · experience',
  ctaLabel = 'View',
  ctaStyle,
  onView,
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
        <html.div style={styles.topRow}>
          <html.span style={styles.chip}>{location}</html.span>
          <html.span style={[styles.badge, styles[availability]]}>
            {AVAILABILITY_LABEL[availability]}
          </html.span>
        </html.div>
        <html.span style={styles.title}>{title}</html.span>
        <html.div style={styles.chipRow}>
          {chips.map((chip, i) => (
            <html.span key={i} style={styles.chip}>
              {chip}
            </html.span>
          ))}
        </html.div>
        <html.button style={[styles.cta, ctaStyle]} onClick={onView}>
          {ctaLabel}
        </html.button>
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
  topRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.x2,
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
  badge: {
    fontSize: 11.5,
    fontWeight: '700',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
    borderRadius: 999,
    paddingBlock: 4,
    paddingInline: 9,
    flexShrink: 0,
  },
  available: {
    backgroundColor: '#DCFCE7',
    color: '#15803D',
  },
  filling: {
    backgroundColor: '#FEF3C7',
    color: '#B45309',
  },
  soldout: {
    backgroundColor: '#FEE2E2',
    color: '#B91C1C',
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
  cta: {
    alignSelf: 'flex-start',
    marginBlockStart: spacing.x1,
    borderWidth: 0,
    borderStyle: 'none',
    paddingInline: spacing.x3,
    paddingBlock: spacing.x2,
    borderRadius: radius.md,
    fontSize: 14,
    fontWeight: '600',
    color: colors.textOnAction,
    cursor: 'pointer',
    transitionProperty: 'background-color',
    transitionDuration: '200ms',
    backgroundColor: {
      default: colors.actionPrimary,
      ':hover': colors.actionPrimaryHover,
      ':active': colors.actionPrimaryHover,
    },
  },
});
