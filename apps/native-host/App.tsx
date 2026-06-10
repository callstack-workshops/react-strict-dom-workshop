import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { LocalizationProvider } from '@core/i18n/provider';
import { Surface } from '@ui/components';
import { BookingForm } from '@feature/booking';

export default function App() {
  return (
    <LocalizationProvider>
      <ScrollView contentContainerStyle={styles.root}>
        <Surface>
          <BookingForm onSubmit={(values) => console.log('booked', values)} />
        </Surface>
      </ScrollView>
    </LocalizationProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
  },
});
