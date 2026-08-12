import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Navigate to Login after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ScreenWrapper style={styles.container}>
      <Image
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png' }}
        style={styles.logo}
        resizeMode="contain"
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
});

export default SplashScreen;
