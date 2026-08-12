import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenWrapper from './ScreenWrapper';

const CreatePostModal = ({ visible, onClose, onPostCreated }) => {
  const [caption, setCaption] = useState('');
  const [images, setImages] = useState([]);

  const handlePickImages = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 5,
      quality: 1,
    });

    if (!result.didCancel && result.assets) {
      const uris = result.assets.map(asset => asset.uri);
      setImages(uris);
    }
  };

  const handleShare = async () => {
    if (images.length === 0) {
      alert('Please select at least one image');
      return;
    }

    try {
      const username = (await AsyncStorage.getItem('username')) || 'user';
      const profileImage =
        (await AsyncStorage.getItem('profileImage')) ||
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=500&q=60';

      const newPost = {
        id: Date.now().toString(),
        userName: username,
        userAvatar: profileImage,
        isVerified: false,
        images: images,
        likes: 0,
        caption: caption,
        postTime: 'Just now',
      };

      onPostCreated(newPost);
      // Reset state
      setCaption('');
      setImages([]);
      onClose();
    } catch (e) {
      console.log('Error creating post:', e);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <ScreenWrapper>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.headerIcon}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/2961/2961937.png',
              }}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Post</Text>
          <TouchableOpacity onPress={handleShare}>
            <Text style={styles.shareText}>Share</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Write a caption..."
              multiline
              value={caption}
              onChangeText={setCaption}
            />
          </View>

          <TouchableOpacity
            style={styles.pickButton}
            onPress={handlePickImages}
          >
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/3342/3342137.png',
              }}
              style={styles.icon}
            />
            <Text style={styles.pickButtonText}>
              {images.length > 0
                ? `Selected ${images.length} Image(s) (Tap to change)`
                : 'Select Images (Max 5)'}
            </Text>
          </TouchableOpacity>

          {images.length > 0 && (
            <ScrollView horizontal style={styles.imagePreviewContainer}>
              {images.map((uri, index) => (
                <Image
                  key={index}
                  source={{ uri }}
                  style={styles.previewImage}
                />
              ))}
            </ScrollView>
          )}
        </ScrollView>
      </ScreenWrapper>
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
  },
  headerIcon: {
    width: 40,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  shareText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3897f0',
    width: 40,
    textAlign: 'right',
  },
  content: {
    flex: 1,
  },
  inputContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
  },
  input: {
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    color: '#000',
  },
  pickButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
  },
  pickButtonText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#000',
  },
  imagePreviewContainer: {
    padding: 15,
  },
  previewImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 8,
  },
});

export default CreatePostModal;
