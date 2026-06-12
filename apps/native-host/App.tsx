import { ScrollView, StatusBar, Platform, Pressable, Text } from 'react-native';
import { LocalizationProvider } from '@core/i18n/provider';
import { ThemeProvider, ThemeBoundary, useTheme } from '@core/providers/theme';
import { BookingScreen } from '@screen/booking';
import { surfaceColor, surfaceColorDark } from '@ui/tokens/tokens.css';

const androidTopInset =
  Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0;

function AppShell() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <ScrollView
        style={{ backgroundColor: isDark ? surfaceColorDark : surfaceColor }}
        contentContainerStyle={{ paddingTop: androidTopInset }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <Pressable
          onPress={toggleTheme}
          style={{
            margin: 16,
            padding: 12,
            borderRadius: 8,
            backgroundColor: '#2563EB',
            alignSelf: 'flex-start',
          }}
        >
          <Text style={{ color: '#FFFFFF' }}>Toggle theme</Text>
        </Pressable>
        <ThemeBoundary>
          <BookingScreen />
        </ThemeBoundary>
      </ScrollView>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LocalizationProvider>
        <AppShell />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
