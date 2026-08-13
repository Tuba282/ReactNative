import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenWrapper from '../components/ScreenWrapper';
import PostCard from '../components/PostCard';
import CreatePostModal from '../components/CreatePostModal';
import StoriesBar from '../components/StoriesBar';
// import BottomTab from '../components/BottomTab'; // Removed as we use Bottom Tabs Navigator
// Dummy initial data
const INITIAL_POSTS = [
  {
    id: '1',
    userName: 'joshua_l',
    userAvatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
    isVerified: true,
    images: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524413840845-3c3c661ddfa2?auto=format&fit=crop&w=800&q=80',
    ],
    likes: '44,686',
    caption: 'The game in Japan was amazing and I want to share some photos',
    postTime: '2 hours ago',
  },
  {
    id: '2',
    userName: 'karennne',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    isVerified: false,
    images: [
      'https://images.unsplash.com/photo-1512412046876-f386342eddb3?auto=format&fit=crop&w=800&q=80',
    ],
    likes: '12,340',
    caption: 'Coffee time in the city! ☕️',
    postTime: '5 hours ago',
  },
  {
    id: '3',
    userName: 'zackjohn',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=500&q=60',
    isVerified: true,
    images: [
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=800&q=80',
    ],
    likes: '89,211',
    caption: 'Exploring the mountains. Best trip ever! 🏔️',
    postTime: '1 day ago',
  },
  {
    id: '4',
    userName: 'craig_love',
    userAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=500&q=60',
    isVerified: false,
    images: [
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    ],
    likes: '3,421',
    caption: 'Cheers to the weekend! 🍹',
    postTime: '2 days ago',
  }
];

const HomeScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=500&q=60',
  );
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    // Check if we should show the create post modal immediately (e.g. after login/signup)
    if (route.params?.showCreatePost) {
      setCreateModalVisible(true);
    }

    // Check if returning from ProfileScreen after creating a new post
    if (route.params?.newPost) {
      setPosts((prevPosts) => {
        // Prevent duplicate addition
        const exists = prevPosts.find(p => p.id === route.params.newPost.id);
        if (!exists) return [route.params.newPost, ...prevPosts];
        return prevPosts;
      });
      // Clear param
      navigation.setParams({ newPost: undefined });
    }
    
    const fetchProfileData = async () => {
      const storedImage = await AsyncStorage.getItem('profileImage');
      if (storedImage) {
        setProfileImage(storedImage);
      }
      
      const storedLikes = await AsyncStorage.getItem('likedPosts');
      if (storedLikes) {
        setLikedPosts(JSON.parse(storedLikes));
      }
    };
    fetchProfileData();
  }, [route.params?.showCreatePost, route.params?.newPost]);

  const handleCreatePost = newPost => {
    setPosts([newPost, ...posts]);
  };

  const handleLikeToggle = async (postId) => {
    let newLikedPosts;
    if (likedPosts.includes(postId)) {
      newLikedPosts = likedPosts.filter(id => id !== postId);
    } else {
      newLikedPosts = [...likedPosts, postId];
    }
    setLikedPosts(newLikedPosts);
    await AsyncStorage.setItem('likedPosts', JSON.stringify(newLikedPosts));
    // Also store the actual post objects for the HeartScreen to display
    const likedPostObjects = posts.filter(p => newLikedPosts.includes(p.id));
    await AsyncStorage.setItem('likedPostObjects', JSON.stringify(likedPostObjects));
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity>
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3004/3004613.png' }} style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.headerLogoText}>
        <Image
          source={require('../../assets/Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.headerIcon}>
          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/7173/7173950.png' }} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3024/3024593.png' }} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScreenWrapper style={styles.container}>
      {renderHeader()}

      <FlatList
        data={posts}
        ListHeaderComponent={<StoriesBar />}
        renderItem={({ item }) => (
          <PostCard 
            post={item} 
            isLiked={likedPosts.includes(item.id)}
            onLikeToggle={handleLikeToggle}
          />
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />

      {/* BottomTab removed */}
      <CreatePostModal
        visible={isCreateModalVisible}
        onClose={() => setCreateModalVisible(false)}
        onPostCreated={handleCreatePost}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
  },
  headerLogoText: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 35,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 15,
  },
  icon: {
    width: 26,
    height: 26,
    tintColor: '#000',
  },
  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#dbdbdb',
    backgroundColor: '#fff',
  },
  tabAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
});

export default HomeScreen;
