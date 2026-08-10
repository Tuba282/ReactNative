// LoginScreen.jsx
// LOGIN screen — user yahan email/password daale ga

import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Alert,
} from 'react-native';

function LoginScreen({ navigation }) {
  // Input fields ka state
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  // Login button: Home screen pe jaayega
  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter your email and password to login.');
      return;
    }
    navigation.navigate('Home');
  };

  // Sign Up link: SignUp screen pe jaayega
  const goToSignUp = () => {
    navigation.navigate('SignUp');
  };

  // Back: pichli screen pe
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        {/* Back Arrow */}
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>

        {/* ============ HEADING ============ */}
        <Text style={styles.title}>Welcome Back !</Text>
        <Text style={styles.subtitle}>
          Log in to get instant crop protection guidance.
        </Text>

        {/* ============ INPUT FIELDS ============ */}
        <View style={styles.inputContainer}>
          {/* Email/Phone Input */}
          <View style={styles.inputWrapper}>
            <Image
              source={require('../../assets/email-icon.png')}
              style={{ width: 20, height: 20 }}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number Or Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputIcon}>
              <Image
                source={require('../../assets/lock-icon.png')}
                style={{ width: 20, height: 20 }}
              />
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image
                source={require('../../assets/eye-icon.png')}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotContainer}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* ============ LOGIN BUTTON ============ */}
        <View style={styles.bottomSection}>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <TouchableOpacity onPress={goToSignUp}>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginTop: 30,
  },
  subtitle: {
    fontSize: 20,
    color: '#666',
    marginTop: 8,
    marginBottom: 30,
  },
  inputContainer: {
    gap: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2e7d3291',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 4,
    gap:5
  },
  inputIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 20,
    color: '#1B1B1B',
    paddingVertical: 14,
  },
  eyeIcon: {
    fontSize: 18,
    padding: 4,
  },
  forgotContainer: {
    alignItems: 'flex-end',
  },
  forgotText: {
    color: '#2E7D32',
    fontSize: 13,
    fontWeight: '500',
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  loginButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpText: {
    color: '#666',
    fontSize: 14,
  },
  signUpLink: {
    color: '#2E7D32',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default LoginScreen;
