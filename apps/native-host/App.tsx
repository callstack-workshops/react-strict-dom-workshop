import React from 'react';
import { ScrollView, StatusBar, Platform, StyleSheet } from 'react-native';
import { LocalizationProvider } from '@core/i18n/provider';
import { BookingScreen } from '@screen/booking';
import { surfaceColor } from '@ui/tokens/tokens.css';

const androidTopInset = Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0;

export default function App() {
  return (
    <LocalizationProvider>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingTop: androidTopInset }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <BookingScreen />
      </ScrollView>
    </LocalizationProvider>
  );
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: surfaceColor,
  },
});
