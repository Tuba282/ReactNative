import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
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
        source={require('../../../assets/insta.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.splashText}>Instagram</Text>
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
  splashText: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  }
});

export default SplashScreen;
