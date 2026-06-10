import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { LocalizationProvider } from '@core/i18n/provider';
import { BookingScreen } from '@screen/booking';

export default function App() {
  return (
    <LocalizationProvider>
      <ScrollView contentContainerStyle={styles.root}>
        <BookingScreen />
      </ScrollView>
    </LocalizationProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
  },
});
