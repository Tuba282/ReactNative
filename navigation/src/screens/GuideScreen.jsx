import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GuideScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Guide Screen (Coming Soon)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  text: { fontSize: 20, color: '#2E7D32' },
});
