import React from 'react';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';

import {
    useFonts,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold
} from '@expo-google-fonts/archivo';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';

import { Home } from './src/screens/Home';

export default function App() {
    const [fontsLoaded] = useFonts({
        Archivo_400Regular,
        Archivo_500Medium,
        Inter_400Regular,
        Inter_500Medium,
        Archivo_600SemiBold
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <>
            <Home />
            <StatusBar style="auto" />
        </>
    );
}
