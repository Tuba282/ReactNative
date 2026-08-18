import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WeatherProvider } from './src/context/WeatherContext';
import TabNavigator from './src/navigation/TabNavigator';

const App = () => {
  return (
    <WeatherProvider>
      <SafeAreaProvider style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1A1A2E" />
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </WeatherProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
  }
});