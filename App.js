import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';
import * as Font from 'expo-font';
import TabNavigator from './src/navigation/TabNavigation';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Load fonts
  const loadFonts = async () => {
    await Font.loadAsync({
      'CustomFont': require('./assets/fonts/Poppins-Black.ttf'), // Add your font file here
      'CustomFont-Bold': require('./assets/fonts/Poppins-Bold.ttf'), // Optional: Add bold version
    });
    setFontsLoaded(true);
  };

  React.useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
)
}
