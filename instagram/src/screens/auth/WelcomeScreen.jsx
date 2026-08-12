import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GradientButton from '../../components/GradientButton';
import ScreenWrapper from '../../components/ScreenWrapper';

const WelcomeScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=500&q=60');
  const [username, setUsername] = useState('alvian_putra');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedImage = await AsyncStorage.getItem('profileImage');
        if (storedImage) {
          setProfileImage(storedImage);
        }
        
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
      } catch (e) {
        console.log('Error fetching data from AsyncStorage:', e);
      }
    };
    fetchData();
  }, []);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png' }}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.logoText}>Instagram</Text>
          </View>
          
          <LinearGradient
            colors={['#F77737', '#FCAF45']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.avatarBorder}
          >
            <Image 
              source={{ uri: profileImage }}
              style={styles.avatarImage}
            />
          </LinearGradient>

          <Text style={styles.title}>Welcome to Instagram,{'\n'}{username}</Text>
          <Text style={styles.subtitle}>Let's start customizing your experience</Text>
        </View>

        <View style={styles.buttonContainer}>
          <GradientButton
            title="Continue"
            onPress={() => navigation.replace('Home', { showCreatePost: true })}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingTop: 80,
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  avatarBorder: {
    width: 160,
    height: 160,
    borderRadius: 80,
    padding: 4, 
    marginBottom: 30,
  },
  avatarImage: {
    flex: 1,
    borderRadius: 76,
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  bottomContainer: {
    paddingBottom: 24,
  },
});

export default WelcomeScreen;
