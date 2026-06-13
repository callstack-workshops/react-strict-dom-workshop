import { View, ScrollView, StatusBar } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { LocalizationProvider } from '@core/i18n/provider';
import { ThemeProvider, ThemeBoundary, useTheme } from '@core/providers/theme';
import { BookingScreen } from '@screen/booking';
import { surfaceColor, surfaceColorDark } from '@ui/tokens/tokens.css';
import { Navbar } from './components/navbar';
import { TabBar } from './components/tab-bar';

function AppShell() {
  const insets = useSafeAreaInsets();
  const { isDark } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? surfaceColorDark : surfaceColor,
      }}
    >
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <ThemeBoundary>
        <Navbar topInset={insets.top} />
      </ThemeBoundary>
      <ScrollView style={{ flex: 1 }}>
        <ThemeBoundary>
          <BookingScreen />
        </ThemeBoundary>
      </ScrollView>
      <ThemeBoundary>
        <TabBar bottomInset={insets.bottom} />
      </ThemeBoundary>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LocalizationProvider>
          <AppShell />
        </LocalizationProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
