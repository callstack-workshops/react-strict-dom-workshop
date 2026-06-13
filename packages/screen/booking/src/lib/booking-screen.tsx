import { css, html } from 'react-strict-dom';
import { spacing, colors } from '@ui/tokens/tokens.css';
import { BookingForm } from '@feature/booking';

function BookingHeader() {
  return (
    <html.div style={styles.header}>
      <html.span style={styles.eyebrow}>Reserve a spot</html.span>
      <html.span style={styles.title}>Request a booking</html.span>
      <html.span style={styles.subtitle}>Reserve a spot on a guided experience</html.span>
    </html.div>
  );
}

export function BookingScreen() {
  return (
    <html.div style={styles.screen}>
      <BookingHeader />
      <BookingForm onSubmit={(values) => console.log('booked', values)} />
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
