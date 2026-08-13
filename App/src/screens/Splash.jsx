import React, { useEffect } from 'react';
import { Text, StyleSheet ,Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Splash = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 2000); // 2 seconds delay
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={{height:100,width:100,borderRadius:50}} source={require('../../assets/images/logo.png')} />
      <Text style={styles.text}>Welcome to My App</Text>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap:20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Splash;
