'use client';

import { css, html } from 'react-strict-dom';
import { BookingForm } from '@feature/booking';

export default function Index() {
  return (
    <html.div style={styles.page}>
      <BookingForm onSubmit={(values) => console.log('booked', values)} />
    </html.div>
  );
}

const styles = css.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBlock: 32,
    paddingInline: 16,
  },
});
