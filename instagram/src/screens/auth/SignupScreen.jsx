import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthInput from '../../components/AuthInput';
import GradientButton from '../../components/GradientButton';
import ScreenWrapper from '../../components/ScreenWrapper';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [birthdate, setBirthdate] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);

  const isAvailable = username.length > 3 && !error;

  const handleNext = async () => {
    try {
      await AsyncStorage.setItem('fullName', name);
      await AsyncStorage.setItem('username', username);
    } catch (e) {
      console.log('Error saving user data:', e);
    }
    navigation.replace('MainTabs');
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>{'<'}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Enter your details to sign up for Instagram.
          </Text>

          <View style={styles.inputGroup}>
            <AuthInput
              label="Full name"
              placeholder="Full name"
              value={name}
              onChangeText={setName}
            />

            <AuthInput
              label="Password"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              rightIcon={
                <Text style={styles.eyeIcon}>{showPassword ? '👁' : '👁‍🗨'}</Text>
              }
              onRightIconPress={() => setShowPassword(!showPassword)}
            />

            <AuthInput
              label="Birthday"
              placeholder="e.g. January 21, 1999"
              value={birthdate}
              onChangeText={setBirthdate}
            />

            <AuthInput
              label="Username"
              placeholder="Username"
              value={username}
              onChangeText={txt => {
                setUsername(txt);
                setError(null);
              }}
              error={error}
              rightIcon={
                isAvailable ? (
                  <Text style={styles.checkIcon}>✅</Text>
                ) : error ? (
                  <Text style={styles.errorIcon}>ⓘ</Text>
                ) : null
              }
            />
          </View>
        </ScrollView>

        <View style={styles.bottomContainer}>
          <GradientButton
            title="Next"
            onPress={handleNext}
            style={styles.nextButton}
            disabled={!name || !password || !birthdate || !username}
          />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: '300',
    color: '#000',
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    lineHeight: 22,
  },
  inputGroup: {
    gap: 8, // proper spacing between inputs
  },
  eyeIcon: {
    fontSize: 16,
  },
  checkIcon: {
    fontSize: 16,
    color: 'green',
  },
  errorIcon: {
    fontSize: 16,
    color: '#ed4956',
  },
  bottomContainer: {
    paddingBottom: 24,
    paddingTop: 16,
  },
  nextButton: {
    marginBottom: 24,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: '#666',
    fontSize: 14,
  },
  loginLink: {
    color: '#F77737',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default SignupScreen;
