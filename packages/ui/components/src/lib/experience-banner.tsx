import { css, html } from 'react-strict-dom';
import type { Styles } from 'react-strict-dom';
import { colors, spacing, radius, bp } from '@ui/tokens/tokens.css';

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
  'data-testid': dataTestId,
}: ExperienceBannerProps) {
  // X1 STRETCH: no `variant` prop. The banner reads the live viewport width
  // through the @media values in `styles` and re-resolves on web AND native.
  return (
    <html.div data-testid={dataTestId} style={styles.banner}>
      <html.div style={styles.media}>
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
      </html.div>
      <html.div style={styles.action}>
        <html.div style={styles.priceBlock}>
          <html.span style={styles.priceBig}>{price}</html.span>
          <html.span style={styles.priceSub}>{priceSub}</html.span>
          <html.span style={styles.priceRating}>{rating}</html.span>
        </html.div>
        <html.button style={[styles.cta, ctaStyle]} onClick={onView}>
          {ctaLabel}
        </html.button>
      </html.div>
    </html.div>
  );
}

const styles = css.create({
  // Narrow (default) renders as a stacked column; at >=480px (bp.wide) it lays out as a row.
  banner: {
    display: 'flex',
    flexDirection: { default: 'column', [bp.wide]: 'row' },
    alignItems: { default: 'stretch', [bp.wide]: 'center' },
    gap: spacing.x3,
    padding: spacing.x3,
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radius.xl,
  },
  media: {
    position: 'relative',
    width: { default: '100%', [bp.wide]: 184 },
    height: { default: 150, [bp.wide]: 110 },
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
  action: {
    display: 'flex',
    flexDirection: { default: 'row', [bp.wide]: 'column' },
    alignItems: { default: 'center', [bp.wide]: 'flex-end' },
    justifyContent: { default: 'space-between', [bp.wide]: 'flex-start' },
    alignSelf: { default: 'stretch', [bp.wide]: 'auto' },
    gap: spacing.x2,
    paddingInlineStart: { default: 0, [bp.wide]: spacing.x3 },
    paddingBlockStart: { default: spacing.x3, [bp.wide]: 0 },
    borderLeftWidth: { default: 0, [bp.wide]: 1 },
    borderLeftStyle: 'solid',
    borderTopWidth: { default: 1, [bp.wide]: 0 },
    borderTopStyle: 'solid',
    borderColor: colors.border,
    flexShrink: 0,
  },
  priceBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: { default: 'flex-start', [bp.wide]: 'flex-end' },
  },
  priceBig: {
    fontSize: 24,
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
    borderWidth: 0,
    borderStyle: 'none',
    paddingInline: spacing.x4,
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
