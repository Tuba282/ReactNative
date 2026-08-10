// SignUpScreen.jsx
// SIGNUP screen — naya account banana ke liye

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
  Alert,
  Image,
} from 'react-native';

function SignUpScreen({ navigation }) {
  // Form fields ka state
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  // Sign Up button: OTP screen pe jaayega (phone number bhi bhejega)
  const handleSignUp = () => {
    if (
      !fullName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !password.trim()
    ) {
      Alert.alert('Error', 'Please fill all the fields to sign up.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    navigation.navigate('OTP', { phone: phone });
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
        <Text style={styles.title}>Create Your Account</Text>
        <Text style={styles.subtitle}>
          Start your journey toward smarter crop protection.
        </Text>

        {/* ============ INPUT FIELDS ============ */}
        <View style={styles.inputContainer}>
          {/* Full Name */}
          <View style={styles.inputWrapper}>
            <Image
              source={require('../../assets/profile.png')}
              style={{ width: 20, height: 20 }}
            />
            <TextInput
              style={styles.input}
              placeholder="Your Full Name"
              placeholderTextColor="#999"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          {/* Email */}
          <View style={styles.inputWrapper}>
            <Image
              source={require('../../assets/email-icon.png')}
              style={{ width: 20, height: 20 }}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Your Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Phone */}
          <View style={styles.inputWrapper}>
            <Image
              source={require('../../assets/call.png')}
              style={{ width: 20, height: 20 }}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Your Phone"
              placeholderTextColor="#999"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          {/* Password */}
          <View style={styles.inputWrapper}>
            <Image
              source={require('../../assets/lock-icon.png')}
              style={{ width: 20, height: 20 }}
            />
            <TextInput
              style={styles.input}
              placeholder="Create A Password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image
                source={require('../../assets/eye-icon.png')}
                style={{ width: 20, height: 20 }}
              />{' '}
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputWrapper}>
            <Image
              source={require('../../assets/lock-icon.png')}
              style={{ width: 20, height: 20 }}
            />
            <TextInput
              style={styles.input}
              placeholder="Re-Enter Your Password"
              placeholderTextColor="#999"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Image
                source={require('../../assets/eye-icon.png')}
                style={{ width: 20, height: 20 }}
              />{' '}
            </TouchableOpacity>
          </View>

          {/* Terms */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsCheck}>✅</Text>
            <Text style={styles.termsText}>
              By signing up, you agree to the{' '}
              <Text style={styles.termsLink}>Terms of service</Text>
              {'\n'}and <Text style={styles.termsLink}>Privacy policy</Text>.
            </Text>
          </View>
        </View>

        {/* ============ SIGN UP BUTTON ============ */}
        <View style={styles.bottomSection}>
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginTop: 25,
  },
  subtitle: {
    fontSize: 20,
    color: '#666',
    marginTop: 8,
    marginBottom: 25,
  },
  inputContainer: {
    gap: 14,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 4,
    backgroundColor: '#FAFAFA',
    gap: 5,
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
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 4,
  },
  termsCheck: {
    fontSize: 14,
  },
  termsText: {
    fontSize: 13,
    color: '#666',
    flex: 1,
    lineHeight: 18,
  },
  termsLink: {
    color: '#2E7D32',
    fontWeight: '500',
  },
  bottomSection: {
    paddingVertical: 30,
    paddingBottom: 40,
  },
  signUpButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SignUpScreen;
