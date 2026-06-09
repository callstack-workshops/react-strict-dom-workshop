import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { Greeting } from '@ui/components';
import { LocalizationProvider, useLocalization } from '@core/i18n/provider';
import { locales } from '@core/i18n';

function AppContent() {
  const { locale, setLocale, i18n } = useLocalization();
  return (
    <View style={styles.root}>
      <Greeting name="React Strict DOM" i18n={i18n} />
      <View style={styles.switcher}>
        {locales.map((code) => (
          <Pressable
            key={code}
            onPress={() => setLocale(code)}
            style={[styles.button, code === locale && styles.buttonActive]}
          >
            <Text style={styles.buttonText}>{code.toUpperCase()}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function App() {
  return (
    <LocalizationProvider>
      <AppContent />
    </LocalizationProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#05070f',
  },
  switcher: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 12,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#1a2138',
  },
  buttonActive: {
    backgroundColor: '#3b82f6',
  },
  buttonText: {
    color: '#e8ecff',
    fontWeight: '600',
  },
});

export default App;
