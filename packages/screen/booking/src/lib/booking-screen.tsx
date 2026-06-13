import { css, html } from 'react-strict-dom';
import { spacing, colors } from '@ui/tokens/tokens.css';
import { useLocalization } from '@core/i18n/provider';
import { ThemeBoundary } from '@core/providers/theme';
import { BookingForm } from '@feature/booking';

function BookingHeader() {
  const { i18n } = useLocalization();
  return (
    <html.div style={styles.header}>
      <html.span style={styles.eyebrow}>{i18n.t('booking.header.eyebrow')}</html.span>
      <html.span style={styles.title}>{i18n.t('booking.title')}</html.span>
      <html.span style={styles.subtitle}>{i18n.t('booking.header.subtitle')}</html.span>
    </html.div>
  );
}

export function BookingScreen() {
  return (
    <html.div style={styles.screen}>
      <ThemeBoundary>
        <BookingHeader />
        <BookingForm onSubmit={(values) => console.log('booked', values)} />
      </ThemeBoundary>
    </html.div>
  );
}

const styles = css.create({
  screen: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBlockStart: spacing.x3,
    paddingBlockEnd: spacing.x5,
    paddingInline: spacing.x3,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    width: 470,
    maxWidth: '100%',
    paddingBlockEnd: spacing.x3,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: colors.actionPrimary,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.7,
    color: colors.textPrimary,
    marginBlockStart: 6,
  },
  subtitle: {
    fontSize: 14.5,
    color: colors.textPlaceholder,
    marginBlockStart: spacing.x1,
  },
});
