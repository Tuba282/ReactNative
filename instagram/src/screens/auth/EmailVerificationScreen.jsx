import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, TextInput, ScrollView } from 'react-native';
import GradientButton from '../../components/GradientButton';
import ScreenWrapper from '../../components/ScreenWrapper';

const EmailVerificationScreen = ({ navigation }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>{'<'}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Enter the confirmation code</Text>
          <Text style={styles.subtitle}>To verify your account, simply enter the 6-digit code we've sent to your phone at <Text style={styles.boldText}>+62 8451 5451 0215</Text></Text>
          
          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                style={[styles.codeInput, digit && styles.codeInputFilled]}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                ref={(input) => inputs.current[index] = input}
              />
            ))}
          </View>
          
          <TouchableOpacity style={styles.resendContainer}>
            <Text style={styles.resendText}>I didn't get the code</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.bottomContainer}>
          <GradientButton
            title="Next"
            onPress={() => navigation.navigate('AddProfilePicture')}
          />
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
    marginBottom: 40,
    lineHeight: 22,
  },
  boldText: {
    fontWeight: '700',
    color: '#333',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    gap: 8,
  },
  codeInput: {
    width: 45,
    height: 55,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    fontSize: 24,
    textAlign: 'center',
    color: '#000',
    backgroundColor: '#fff',
  },
  codeInputFilled: {
    borderColor: '#F77737',
  },
  resendContainer: {
    alignItems: 'center',
  },
  resendText: {
    color: '#333',
    fontWeight: '500',
    fontSize: 14,
  },
  bottomContainer: {
    paddingBottom: 24,
    paddingTop: 16,
  },
});

export default EmailVerificationScreen;
