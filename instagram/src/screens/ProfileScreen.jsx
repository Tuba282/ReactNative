import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenWrapper from '../components/ScreenWrapper';
import { TextInput, Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const DUMMY_POSTS = [
  {
    id: '1', userName: 'joshua_l',
    images: ['https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1524413840845-3c3c661ddfa2?auto=format&fit=crop&w=800&q=80']
  },
  {
    id: '2', userName: 'joshua_l',
    images: ['https://images.unsplash.com/photo-1512412046876-f386342eddb3?auto=format&fit=crop&w=800&q=80']
  },
  {
    id: '3', userName: 'user',
    images: ['https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80']
  }
];

const { width } = Dimensions.get('window');

const ProfileScreen = ({ navigation, route }) => {
  const allPosts = route.params?.posts || [];
  const [userPosts, setUserPosts] = useState([]);
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=500&q=60');
  const [fullName, setFullName] = useState('User');
  const [username, setUsername] = useState('user');
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editUsername, setEditUsername] = useState('');
  const [isViewerVisible, setIsViewerVisible] = useState(false);
  const [viewerImages, setViewerImages] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedImage = await AsyncStorage.getItem('profileImage');
      const storedFullName = await AsyncStorage.getItem('fullName'); // Fixed key
      const storedUsername = await AsyncStorage.getItem('username');

      if (storedImage) setProfileImage(storedImage);
      if (storedFullName) setFullName(storedFullName);
      if (storedUsername) setUsername(storedUsername);

      const currentUsername = storedUsername || 'user';
      // Filter posts that belong to this user from DUMMY_POSTS
      const filtered = DUMMY_POSTS.filter(p => p.userName === currentUsername || p.userName === 'joshua_l'); 
      setUserPosts(filtered);
    };

    fetchUserData();
  }, [allPosts]);

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerLeft}>
        <Text style={styles.backButtonText}>{'<'}</Text>
      </TouchableOpacity>
      
      <View style={styles.headerCenter}>
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3064/3064155.png' }} style={styles.lockIcon} />
        <Text style={styles.headerUsername}>{username}</Text>
        <Text style={styles.dropdownIcon}>˅</Text>
      </View>

      <TouchableOpacity style={styles.headerRight}>
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2976/2976215.png' }} style={styles.menuIcon} />
      </TouchableOpacity>
    </View>
  );

  const renderProfileInfo = () => (
    <View style={styles.profileInfoContainer}>
      <View style={styles.statsRow}>
        <Image source={{ uri: profileImage }} style={styles.profileAvatar} />
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{userPosts.length}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>834</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>162</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>

      <View style={styles.bioContainer}>
        {isEditing ? (
          <>
            <TextInput style={styles.editInput} value={editName} onChangeText={setEditName} placeholder="Full Name" />
            <TextInput style={styles.editInput} value={editUsername} onChangeText={setEditUsername} placeholder="Username" />
          </>
        ) : (
          <>
            <Text style={styles.bioName}>{fullName}</Text>
            <Text style={styles.bioText}>Digital goodies designer @pixsellz</Text>
            <Text style={styles.bioText}>Everything is designed.</Text>
          </>
        )}
      </View>

      <TouchableOpacity style={styles.editProfileButton} onPress={async () => {
        if (isEditing) {
          setFullName(editName);
          setUsername(editUsername);
          await AsyncStorage.setItem('name', editName);
          await AsyncStorage.setItem('username', editUsername);
        } else {
          setEditName(fullName);
          setEditUsername(username);
        }
        setIsEditing(!isEditing);
      }}>
        <Text style={styles.editProfileText}>{isEditing ? 'Save Profile' : 'Edit Profile'}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderGridItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.gridItem} 
      onPress={() => {
        setViewerImages(item.images.map(img => ({ url: img })));
        setIsViewerVisible(true);
      }}
    >
      <Image source={{ uri: item.images[0] }} style={styles.gridImage} />
      {item.images.length > 1 && (
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3342/3342137.png' }} style={styles.multipleIcon} />
      )}
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper style={styles.container}>
      {renderHeader()}
      
      <FlatList
        data={userPosts}
        ListHeaderComponent={renderProfileInfo}
        renderItem={renderGridItem}
        keyExtractor={item => item.id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />
      
      <Modal visible={isViewerVisible} transparent={true} onRequestClose={() => setIsViewerVisible(false)}>
        <ImageViewer 
          imageUrls={viewerImages}
          enableSwipeDown={true}
          onSwipeDown={() => setIsViewerVisible(false)}
          onCancel={() => setIsViewerVisible(false)}
        />
      </Modal>
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
  headerLeft: {
    width: 40,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lockIcon: {
    width: 12,
    height: 12,
    tintColor: '#000',
    marginRight: 5,
  },
  headerUsername: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  dropdownIcon: {
    fontSize: 12,
    marginLeft: 5,
    color: '#000',
  },
  headerRight: {
    width: 40,
    alignItems: 'flex-end',
  },
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: '#000',
  },
  profileInfoContainer: {
    padding: 15,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#dbdbdb',
  },
  statsContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    marginLeft: 20,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  statLabel: {
    fontSize: 14,
    color: '#000',
  },
  bioContainer: {
    marginTop: 15,
  },
  bioName: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  bioText: {
    fontSize: 14,
    color: '#000',
  },
  editProfileButton: {
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 5,
    paddingVertical: 8,
    marginTop: 15,
    alignItems: 'center',
  },
  editProfileText: {
    fontWeight: '600',
    color: '#000',
  },
  gridItem: {
    width: width / 3,
    height: width / 3,
    borderWidth: 0.5,
    borderColor: '#fff',
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  multipleIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 16,
    height: 16,
    tintColor: '#fff',
  },
  editInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
    marginBottom: 8,
    paddingVertical: 4,
    fontSize: 14,
  }
});

export default ProfileScreen;
