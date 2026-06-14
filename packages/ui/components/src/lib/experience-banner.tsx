import { css, html } from 'react-strict-dom';
import type { Styles } from 'react-strict-dom';
import { colors, spacing, radius } from '@ui/tokens/tokens.css';

const shimmer = css.keyframes({
  '0%': { opacity: 1 },
  '50%': { opacity: 0.45 },
  '100%': { opacity: 1 },
});

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

const AVAILABILITY_COLOR: Record<Availability, [string, string]> = {
  available: ['#DCFCE7', '#15803D'],
  filling: ['#FEF3C7', '#B45309'],
  soldout: ['#FEE2E2', '#B91C1C'],
};

const badgeSwatch = css.create({
  // WORKSHOP-TODO(X1): availability is one of three known values, yet this colours the badge
  // with a DYNAMIC style function. StyleX compiles a dynamic function to a CSS variable set at
  // runtime on every render, off the cheap static path. Refactor to a static VARIANT: a
  // css.create keyed by availability (available/filling/soldout), selected with
  // styles[availability]. List the values, pick by key.
  tone: (bg: string, fg: string) => ({ backgroundColor: bg, color: fg }),
});

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
          <html.span style={[styles.badge, badgeSwatch.tone(...AVAILABILITY_COLOR[availability])]}>
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
      <html.div style={[styles.action, stacked && styles.actionStacked]}>
        <html.div style={[styles.priceBlock, stacked && styles.priceBlockStacked]}>
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
    // WORKSHOP-TODO(X1): css.keyframes compiles, so this skeleton shimmer looks fine, but every
    // animation* property is unsupported on native (native logs `css.keyframes() is not
    // supported.`) so the shimmer is dead there while it animates on web. Cut it, or split a
    // Reanimated shimmer into a .native file.
    animationName: shimmer,
    animationDuration: '1400ms',
    animationIterationCount: 'infinite',
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
    // WORKSHOP-TODO(X1): native logs `"display:flex" is required for "justifyContent" to have an
    // effect.` Without display:flex this row drops to block flow on web (the badge falls under
    // the location instead of sitting at the end); native still lays the row out but warns. Add
    // the missing display.
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
  action: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: spacing.x2,
    paddingInlineStart: spacing.x3,
    borderLeftWidth: 1,
    borderLeftStyle: 'solid',
    borderColor: colors.border,
    flexShrink: 0,
  },
  actionStacked: {
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
  priceBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  priceBlockStacked: {
    alignItems: 'flex-start',
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
