import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import PostCard from '../components/PostCard';

const HeartScreen = () => {
  const [likedPosts, setLikedPosts] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchLikedPosts = async () => {
        const storedLikes = await AsyncStorage.getItem('likedPostObjects');
        if (storedLikes) {
          setLikedPosts(JSON.parse(storedLikes));
        }
      };
      fetchLikedPosts();
    }, [])
  );

  return (
    <ScreenWrapper style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Likes</Text>
      </View>
      <FlatList
        data={likedPosts}
        renderItem={({ item }) => <PostCard post={item} isLiked={true} />}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No liked posts yet.</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
  }
});

export default HeartScreen;
