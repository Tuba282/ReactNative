// Splash1Screen.jsx
// PEHLI onboarding screen — app khulne pe ye dikhegi

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';

function Splash1Screen({ navigation }) {
  // Next button: Splash2 pe jaayega
  const goNext = () => {
    navigation.navigate('Splash2');
  };

  // Skip button: seedha Login pe jaayega (onboarding skip)
  const skipToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.imagePlaceholder}>
        <Image
          source={require('../../assets/splash-1.png')}
          style={styles.image}
        />
      </View>

      {/* ============ TITLE & SUBTITLE ============ */}
      <Text style={styles.title}>Your Smart Guide to{'\n'}Crop Protection</Text>
      <Text style={styles.subtitle}>
        Instant chemical recommendations powered by AI – based on your region's
        latest crop guide
      </Text>

      {/* ============ BOTTOM BUTTONS ============ */}
      <View style={styles.bottomSection}>
        {/* Dots indicator — pehla dot active */}
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton} onPress={goNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>

        {/* Skip Button */}
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
    height: 280,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1B1B1B',
    textAlign: 'center',
    marginTop: 20,
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

export default Splash1Screen;
