import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GradientButton from '../../components/GradientButton';
import ScreenWrapper from '../../components/ScreenWrapper';

const EditProfilePictureScreen = ({ navigation, route }) => {
  const initialImage = route.params?.imageUri || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=500&q=60';
  const [profileImage, setProfileImage] = useState(initialImage);

  const handleChangePicture = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (!result.didCancel && result.assets && result.assets.length > 0) {
      const selectedImageUri = result.assets[0].uri;
      setProfileImage(selectedImageUri);
    }
  };

  const handleDone = async () => {
    try {
      await AsyncStorage.setItem('profileImage', profileImage);
    } catch (e) {
      console.log('Error saving image to AsyncStorage:', e);
    }
    navigation.navigate('Welcome');
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Profile picture added</Text>
          
          <View style={styles.avatarContainer}>
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
            
            <TouchableOpacity style={styles.editButton} onPress={handleChangePicture}>
              <Text style={styles.editButtonText}>📝 Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <GradientButton
            title="Done"
            onPress={handleDone}
            style={styles.doneButton}
          />
          <GradientButton
            title="Change Picture"
            outline
            onPress={handleChangePicture}
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
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000',
    marginBottom: 40,
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatarBorder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    padding: 4,
    marginBottom: 20,
  },
  avatarImage: {
    flex: 1,
    borderRadius: 96,
    width: '100%',
    height: '100%',
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
  },
  bottomContainer: {
    paddingBottom: 24,
  },
  doneButton: {
    marginBottom: 12,
  },
});

export default EditProfilePictureScreen;
