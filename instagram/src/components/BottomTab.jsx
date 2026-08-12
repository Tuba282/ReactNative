import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BottomTab = ({ profileImage, onCreatePostPress, posts }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.bottomTab}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1946/1946436.png' }} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/54/54481.png' }} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onCreatePostPress}>
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/992/992651.png' }} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077035.png' }} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile', { posts })}>
        <Image source={{ uri: profileImage }} style={styles.tabAvatar} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default BottomTab;
