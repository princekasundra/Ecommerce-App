import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import store from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './ThemeContext';

enableScreens();

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppNavigator />
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;