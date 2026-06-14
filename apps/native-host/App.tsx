import { View, StatusBar } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { LocalizationProvider } from '@core/i18n/provider';
import { ThemeProvider, useTheme } from '@core/providers/theme';
import { surfaceColor, surfaceColorDark } from '@ui/tokens/tokens.css';
import { Navbar } from './components/navbar';
import { TabBar } from './components/tab-bar';
import { AccountScreen } from './components/account-screen';

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
      <Navbar topInset={insets.top} />
      <AccountScreen />
      <TabBar bottomInset={insets.bottom} activeKey="user" />
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
