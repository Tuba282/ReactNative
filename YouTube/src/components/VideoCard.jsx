import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../constants/colors';
import { formatDate } from '../utils/formatDate';
import { formatViews } from '../utils/formatViews';

const VideoCard = ({ video }) => {
  const navigation = useNavigation();
  const { snippet } = video;
  const videoId = typeof video.id === 'object' ? video.id.videoId : video.id;

  // YouTube Data API 'snippet' part doesn't return view count or channel avatar by default.
  // We use placeholder/random values to mimic the UI.
  const randomViews = Math.floor(Math.random() * 10000000);

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => navigation.navigate('ViewScreen', { video, videoId })}
    >
      <Image
        source={{
          uri:
            snippet?.thumbnails?.high?.url || snippet?.thumbnails?.medium?.url,
        }}
        style={styles.thumbnail}
      />

      <View style={styles.detailsContainer}>
        {/* Placeholder for Channel Avatar */}
        <Image
          source={{
            uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(
              snippet?.channelTitle,
            )}&background=random`,
          }}
          style={styles.avatar}
        />

        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {snippet?.title}
          </Text>
          <Text style={styles.subtitle}>
            {snippet?.channelTitle} • {formatViews(randomViews)} •{' '}
            {formatDate(snippet?.publishedAt)}
          </Text>
        </View>

        <TouchableOpacity style={styles.moreIcon}>
          <Ionicons name="ellipsis-vertical" size={16} color={colors.text} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  detailsContainer: {
    flexDirection: 'row',
    padding: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 4,
    lineHeight: 20,
  },
  subtitle: {
    fontSize: 13,
    color: colors.grayText,
  },
  moreIcon: {
    padding: 4,
  },
});

export default VideoCard;
