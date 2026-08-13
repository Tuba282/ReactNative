import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity, Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const DUMMY_STORIES = [
  { id: '1', userName: 'Your Story', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=500&q=60', storyImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80' },
  { id: '2', userName: 'karennne', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=60', storyImage: 'https://images.unsplash.com/photo-1512412046876-f386342eddb3?auto=format&fit=crop&w=800&q=80' },
  { id: '3', userName: 'zackjohn', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=500&q=60', storyImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80' },
  { id: '4', userName: 'kieron_d', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=60', storyImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80' },
  { id: '5', userName: 'craig_love', avatar: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=60', storyImage: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80' }
];

const StoriesBar = () => {
  const [isViewerVisible, setIsViewerVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = DUMMY_STORIES.map(story => ({ url: story.storyImage }));

  const handleStoryPress = (index) => {
    setCurrentImageIndex(index);
    setIsViewerVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {DUMMY_STORIES.map((story, index) => (
          <TouchableOpacity key={story.id} style={styles.storyContainer} onPress={() => handleStoryPress(index)}>
            <View style={styles.avatarRing}>
              <Image source={{ uri: story.avatar }} style={styles.avatar} />
            </View>
            <Text style={styles.userName} numberOfLines={1}>{story.userName}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal visible={isViewerVisible} transparent={true} onRequestClose={() => setIsViewerVisible(false)}>
        <ImageViewer 
          imageUrls={images}
          index={currentImageIndex}
          enableSwipeDown={true}
          onSwipeDown={() => setIsViewerVisible(false)}
          onCancel={() => setIsViewerVisible(false)}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  scrollContent: {
    paddingHorizontal: 15,
  },
  storyContainer: {
    alignItems: 'center',
    marginRight: 15,
    width: 70,
  },
  avatarRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: '#c13584',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
  }
});

export default StoriesBar;
