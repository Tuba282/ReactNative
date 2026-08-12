import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AuthInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  rightIcon,
  onRightIconPress,
  error,
  style
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={[styles.label, error && styles.errorText]}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          error && styles.inputError
        ]}
      >
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#a9a9a9"
          secureTextEntry={secureTextEntry}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} style={styles.iconContainer} disabled={!onRightIconPress}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      {error && typeof error === 'string' && (
        <Text style={styles.errorMsg}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#fafafa',
    height: 50,
  },
  inputFocused: {
    borderColor: '#a9a9a9',
  },
  inputError: {
    borderColor: '#ed4956',
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#262626',
  },
  iconContainer: {
    paddingHorizontal: 16,
    height: '100%',
    justifyContent: 'center',
  },
  errorText: {
    color: '#ed4956',
  },
  errorMsg: {
    color: '#ed4956',
    fontSize: 12,
    marginTop: 4,
  }
});

export default AuthInput;
