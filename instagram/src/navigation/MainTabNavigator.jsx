import React, { useState, useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import AddPostScreen from '../screens/AddPostScreen';
import HeartScreen from '../screens/HeartScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const [profileImage, setProfileImage] = useState(
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=500&q=60'
  );

  useEffect(() => {
    const fetchProfileData = async () => {
      const storedImage = await AsyncStorage.getItem('profileImage');
      if (storedImage) {
        setProfileImage(storedImage);
      }
    };
    fetchProfileData();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused }) => {
          let iconSource;
          let iconStyle = [styles.icon, focused && styles.iconFocused];

          if (route.name === 'Home') {
            iconSource = { uri: 'https://cdn-icons-png.flaticon.com/512/1946/1946436.png' };
          } else if (route.name === 'Search') {
            iconSource = { uri: 'https://cdn-icons-png.flaticon.com/512/54/54481.png' };
          } else if (route.name === 'AddPost') {
            iconSource = { uri: 'https://cdn-icons-png.flaticon.com/512/992/992651.png' };
          } else if (route.name === 'Heart') {
            iconSource = { uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077035.png' };
          } else if (route.name === 'Profile') {
            iconSource = { uri: profileImage };
            iconStyle = [styles.tabAvatar, focused && styles.tabAvatarFocused];
          }

          return <Image source={iconSource} style={iconStyle} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="AddPost" component={AddPostScreen} />
      <Tab.Screen name="Heart" component={HeartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 1,
    borderTopColor: '#dbdbdb',
    backgroundColor: '#fff',
    height: 60,
  },
  icon: {
    width: 26,
    height: 26,
    tintColor: '#000',
    opacity: 0.5,
  },
  iconFocused: {
    opacity: 1,
  },
  tabAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    opacity: 0.5,
  },
  tabAvatarFocused: {
    opacity: 1,
    borderWidth: 1,
    borderColor: '#000',
  },
});

export default MainTabNavigator;
