'use client';

import { LocalizationProvider } from '@core/i18n/provider';
import { BookingScreen } from '@screen/booking';

export default function Index() {
  return (
    <LocalizationProvider>
      <BookingScreen />
    </LocalizationProvider>
  );
}
