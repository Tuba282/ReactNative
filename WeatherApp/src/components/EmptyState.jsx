import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';

const EmptyState = () => {
  return (
    <View style={styles.container}>
      <Icon name="partly-sunny" size={120} color="#FFD700" style={styles.icon} />
      <Text style={styles.title}>Welcome to Weather</Text>
      <Text style={styles.subtitle}>
        Search for a city or use your location to see the magic.
      </Text>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 80,
  },
  icon: {
    marginBottom: 30,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 15,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#A0A0B0',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
});
