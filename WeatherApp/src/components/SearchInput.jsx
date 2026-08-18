import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';

const SearchInput = ({ value, onChangeText, onSubmit }) => {
  return (
    <View style={styles.container}>
      <Icon name="search" size={22} color="#A0A0B0" style={styles.icon} />
      <TextInput 
        style={styles.input}
        placeholder="Search for a city..."
        placeholderTextColor="#A0A0B0"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
        autoCapitalize="words"
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },
});
