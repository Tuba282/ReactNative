// OTPScreen.jsx
// OTP VERIFICATION screen — phone number verify karne ke liye

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
} from 'react-native';

function OTPScreen({ route, navigation }) {
  // SignUp screen se phone number receive karo
  const { phone = '000 000-0000' } = route.params || {};

  // 4 OTP digits ka state (har box ka alag state)
  const [otp1, setOtp1] = React.useState('');
  const [otp2, setOtp2] = React.useState('');
  const [otp3, setOtp3] = React.useState('');
  const [otp4, setOtp4] = React.useState('');

  // Refs — ek box fill hone pe next box pe focus karne ke liye
  const input2 = React.useRef(null);
  const input3 = React.useRef(null);
  const input4 = React.useRef(null);

  // Confirm button: Home screen pe jaayega
  const handleConfirm = () => {
    navigation.navigate('Home');
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
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        {/* Back Arrow */}
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>

        {/* ============ HEADING ============ */}
        <Text style={styles.title}>Phone Verification</Text>
        <Text style={styles.subtitle}>
          Enter your OTP which has been sent to your Phone and completely verify
          your account.
        </Text>

        {/* ============ OTP INPUT BOXES ============ */}
        <View style={styles.otpContainer}>
          <TextInput
            style={styles.otpBox}
            maxLength={1}
            keyboardType="number-pad"
            value={otp1}
            onChangeText={text => {
              setOtp1(text);
              // Jab 1 digit daali, next box pe focus karo
              if (text) input2.current?.focus();
            }}
          />
          <TextInput
            ref={input2}
            style={styles.otpBox}
            maxLength={1}
            keyboardType="number-pad"
            value={otp2}
            onChangeText={text => {
              setOtp2(text);
              if (text) input3.current?.focus();
            }}
          />
          <TextInput
            ref={input3}
            style={styles.otpBox}
            maxLength={1}
            keyboardType="number-pad"
            value={otp3}
            onChangeText={text => {
              setOtp3(text);
              if (text) input4.current?.focus();
            }}
          />
          <TextInput
            ref={input4}
            style={styles.otpBox}
            maxLength={1}
            keyboardType="number-pad"
            value={otp4}
            onChangeText={setOtp4}
          />
        </View>

        {/* Phone number info */}
        <Text style={styles.phoneInfo}>
          A code has been sent to your Phone ({phone})
        </Text>

        {/* ============ CONFIRM BUTTON ============ */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
          >
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    marginTop: 30,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginTop: 8,
    marginBottom: 40,
    lineHeight: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 20,
  },
  otpBox: {
    width: 66,
    height: 66,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B1B1B',
    backgroundColor: '#FAFAFA',
  },
  phoneInfo: {
    textAlign: 'center',
    color: '#999',
    fontSize: 18,
    marginTop: 10,
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  confirmButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OTPScreen;
