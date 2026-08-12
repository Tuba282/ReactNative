import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { launchImageLibrary } from 'react-native-image-picker';
import GradientButton from '../../components/GradientButton';
import ScreenWrapper from '../../components/ScreenWrapper';

const AddProfilePictureScreen = ({ navigation }) => {

  const handleAddPicture = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (!result.didCancel && result.assets && result.assets.length > 0) {
      const selectedImageUri = result.assets[0].uri;
      navigation.navigate('EditProfilePicture', { imageUri: selectedImageUri });
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>{'<'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Add a profile picture</Text>
          <Text style={styles.subtitle}>Let's add a profile picture so your friends can easily recognize you. Your picture will be visible to everyone.</Text>
          
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={['#F77737', '#FCAF45']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.avatarBorder}
            >
              <View style={styles.avatarInner}>
                <View style={styles.placeholderHead} />
                <View style={styles.placeholderBody} />
              </View>
            </LinearGradient>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <GradientButton
            title="Add picture"
            onPress={handleAddPicture}
            style={styles.addButton}
          />
          <GradientButton
            title="Skip"
            outline
            onPress={() => navigation.navigate('Welcome')}
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
  content: {
    flex: 1,
    marginTop: 20,
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
    marginBottom: 60,
    lineHeight: 22,
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarBorder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    padding: 3, 
  },
  avatarInner: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 97,
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    paddingTop: 30,
  },
  placeholderHead: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
  },
  placeholderBody: {
    width: 140,
    height: 100,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    backgroundColor: '#e0e0e0',
  },
  bottomContainer: {
    paddingBottom: 24,
  },
  addButton: {
    marginBottom: 12,
  },
});

export default AddProfilePictureScreen;
