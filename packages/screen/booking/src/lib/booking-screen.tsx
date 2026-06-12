import { css, html } from 'react-strict-dom';
import { spacing } from '@ui/tokens/tokens.css';
import { BookingForm } from '@feature/booking';

export function BookingScreen() {
  return (
    <html.div style={styles.screen}>
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
});
