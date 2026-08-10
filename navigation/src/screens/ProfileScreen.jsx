// ProfileScreen.jsx
// Ye DOOSRI screen hai - Home se data (params) receive karegi

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

// "route" prop mein woh data hota hai jo pichli screen ne bheja tha
// "navigation" prop se hum aur screens pe ja sakte hain ya wapas ja sakte hain
function ProfileScreen({route, navigation}) {
  // route.params se hum woh data nikalte hain jo Home screen ne bheja tha
  // Agar koi data nahi aaya toh default values use hongi
  const {name = 'Guest', age = 0} = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>👤</Text>
      <Text style={styles.title}>Profile Screen</Text>

      {/* Home screen se aaya hua data yahan show ho raha hai */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>User Information</Text>
        <Text style={styles.info}>📛 Naam: {name}</Text>
        <Text style={styles.info}>🎂 Umar: {age} saal</Text>
      </View>

      {/* goBack() => pichli screen pe wapas le jaata hai (Back button jaisa) */}
      <TouchableOpacity
        style={[styles.button, {backgroundColor: '#6C63FF'}]}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>⬅️ Wapas Jao (goBack)</Text>
      </TouchableOpacity>

      {/* Settings pe bhi ja sakte hain Profile se */}
      <TouchableOpacity
        style={[styles.button, {backgroundColor: '#FF6584'}]}
        onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.buttonText}>⚙️ Settings pe Jao</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F0FF',
    padding: 20,
  },
  emoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E1E2F',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    width: '85%',
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
    elevation: 4,
    shadowColor: '#6C63FF',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6C63FF',
    marginBottom: 12,
  },
  info: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
  },
  button: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
