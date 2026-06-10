import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { LocalizationProvider } from '@core/i18n/provider';
import { BookingForm } from '@feature/booking';

export default function App() {
  return (
    <LocalizationProvider>
      <ScrollView contentContainerStyle={styles.root}>
        <BookingForm onSubmit={(values) => console.log('booked', values)} />
      </ScrollView>
    </LocalizationProvider>
  );
}

const styles = StyleSheet.create({
  root: { alignItems: 'center', justifyContent: 'center', backgroundColor: '#05070f', paddingVertical: 48, paddingHorizontal: 16 },
});