// Splash2Screen.jsx
// DOOSRI onboarding screen

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';

function Splash2Screen({ navigation }) {
  // Back button: Splash1 pe wapas
  const goBack = () => {
    navigation.goBack();
  };

  // Next button: Splash3 pe
  const goNext = () => {
    navigation.navigate('Splash3');
  };

  // Skip: seedha Login pe
  const skipToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Back Arrow Button */}
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Text style={styles.backArrow}>‹</Text>
      </TouchableOpacity>

      {/* ============ IMAGE PLACEHOLDER ============ */}
      {/* <Image source={require('../../assets/splash2.png')} style={styles.image} /> */}
      <View style={styles.imagePlaceholder}>
        <Image
          source={require('../../assets/splash-2.png')}
          style={styles.image}
        />
      </View>

      {/* ============ TITLE & SUBTITLE ============ */}
      <Text style={styles.title}>Get Instant Answers</Text>
      <Text style={styles.subtitle}>
        Just describe your crop issue – our AI scans the official protection
        guide and finds the best solution.
      </Text>

      {/* ============ BOTTOM BUTTONS ============ */}
      <View style={styles.bottomSection}>
        {/* Dots indicator — doosra dot active */}
        <View style={styles.dotsContainer}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={goNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={skipToLogin}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 60,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 32,
    color: '#1B1B1B',
    marginTop: -2,
  },
  imagePlaceholder: {
    height: 340,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  image: {
    width: '80%',
    height: 260,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1B1B1B',
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 40,
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D9D9D9',
  },
  dotActive: {
    backgroundColor: '#2E7D32',
    width: 24,
    borderRadius: 4,
  },
  nextButton: {
    backgroundColor: '#2E7D32',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  skipText: {
    color: '#666',
    fontSize: 14,
  },
});

export default Splash2Screen;
