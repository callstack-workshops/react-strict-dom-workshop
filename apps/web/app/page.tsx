'use client';

import { Surface } from '@ui/components';
import { BookingForm } from '@feature/booking';

export default function Index() {
  return (
    <Surface>
      <BookingForm onSubmit={(values) => console.log('booked', values)} />
    </Surface>
  );
}
