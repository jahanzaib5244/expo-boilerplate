import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import "../../global.css";
import { verifyInstallation } from 'nativewind';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  console.log(verifyInstallation());

  return (
    <React.Fragment>
      <Stack />
      <StatusBar style="auto" />
    </React.Fragment>
  );
}
