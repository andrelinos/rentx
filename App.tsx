import axios from 'axios';
import React from 'react';
import AppLoading from 'expo-app-loading';
import { LogBox } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AppProvider } from './src/hooks';

import { useAuth } from './src/hooks/auth';

import {
  useFonts,
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
} from '@expo-google-fonts/archivo';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';

import theme from './src/styles/theme';

import { Routes } from './src/routes';
import api from './src/services/api';

export default function App() {
  const { user } = useAuth();

  api.interceptors.request.use(config => {
    const { token } = user;

    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_500Medium,
    Inter_400Regular,
    Inter_500Medium,
    Archivo_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  return (
    <ThemeProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppProvider>
          <Routes />
        </AppProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
