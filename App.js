import 'react-native-gesture-handler';

import React from 'react';
import Routes from './src/routes';
import { NavigationContainer } from '@react-navigation/native';

import AppProvider from './src/hooks';

export default function App() {
  return (
    <NavigationContainer>
      <AppProvider>
        <Routes />
      </AppProvider>
    </NavigationContainer>
  );
}

