import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';
import Header from '../components/Header';
import CategoryChip from '../components/CategoryChip';
import VideoCard from '../components/VideoCard';
import { searchVideos } from '../services/home/homeApi';
import { colors } from '../constants/colors';

const HomeScreen = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const query = activeCategory === 'All' ? 'latest videos' : activeCategory;
    fetchVideos(query);
  }, [activeCategory]);

  const fetchVideos = async query => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchVideos(query);
      // Filter out non-video results if any
      const videoItems = data.items.filter(
        item => item.id.kind === 'youtube#video',
      );
      setVideos(videoItems);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch videos.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <CategoryChip
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />
      <FlatList
        data={videos}
        renderItem={({ item }) => <VideoCard video={item} />}
        keyExtractor={item => item.id.videoId}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  errorText: {
    color: colors.primary,
    fontSize: 16,
  },
});

export default HomeScreen;
