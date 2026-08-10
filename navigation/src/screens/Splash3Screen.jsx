// Splash3Screen.jsx
// TEESRI (aakhri) onboarding screen — iske baad Login aayega

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';

function Splash3Screen({ navigation }) {
  // Back: Splash2 pe wapas
  const goBack = () => {
    navigation.goBack();
  };

  // Get Started: Login screen pe jaayega (onboarding khatam)
  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Text style={styles.backArrow}>‹</Text>
      </TouchableOpacity>

      <View style={styles.imagePlaceholder}>
        <Image
          source={require('../../assets/splash-3.png')}
          style={styles.image}
        />
      </View>

      {/* ============ TITLE & SUBTITLE ============ */}
      <Text style={styles.title}>Talk to Real Experts</Text>
      <Text style={styles.subtitle}>
        Need personalized advice? Unlock direct messaging with certified
        agri-chemical professionals.
      </Text>

      {/* ============ BOTTOM BUTTONS ============ */}
      <View style={styles.bottomSection}>
        {/* Dots indicator — teesra dot active */}
        <View style={styles.dotsContainer}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
        </View>

        {/* Get Started Button (Next ki jagah) */}
        <TouchableOpacity style={styles.nextButton} onPress={goToLogin}>
          <Text style={styles.nextButtonText}>Get Started</Text>
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
});

export default Splash3Screen;
