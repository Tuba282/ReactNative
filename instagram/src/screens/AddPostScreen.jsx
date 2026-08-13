import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import CreatePostModal from '../components/CreatePostModal';

const AddPostScreen = ({ navigation }) => {
  const handlePostCreated = (newPost) => {
    // Navigate to Home tab with new post param
    navigation.navigate('Home', { newPost });
  };

  return (
    <ScreenWrapper style={styles.container}>
      {/* We use the modal component directly as a screen content or open the modal */}
      <CreatePostModal 
        visible={true} 
        onClose={() => navigation.goBack()}
        onPostCreated={handlePostCreated}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' }
});

export default AddPostScreen;
