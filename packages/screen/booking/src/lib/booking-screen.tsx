import { Surface } from '@ui/components';
import { BookingForm } from '@feature/booking';

export function BookingScreen() {
  return (
    <Surface>
      <BookingForm onSubmit={(values) => console.log('booked', values)} />
    </Surface>
  );
}
