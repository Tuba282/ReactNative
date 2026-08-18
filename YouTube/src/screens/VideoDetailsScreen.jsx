import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image, TouchableOpacity, Dimensions } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors } from '../constants/colors';
import { fetchVideoDetails, searchVideos } from '../services/home/homeApi';
import { formatViews } from '../utils/formatViews';
import { formatDate } from '../utils/formatDate';
import VideoCard from '../components/VideoCard';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const VideoDetailsScreen = ({ route, navigation }) => {
  const { videoId, video: initialVideo } = route.params;
  const snippet = initialVideo?.snippet || {};
  
  const [playing, setPlaying] = useState(true);
  const [videoDetails, setVideoDetails] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loadingRecommended, setLoadingRecommended] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  useEffect(() => {
    loadVideoDetails();
    loadRecommended();
  }, [videoId]);

  useFocusEffect(
    useCallback(() => {
      setPlaying(true);
      return () => setPlaying(false);
    }, [])
  );

  const loadVideoDetails = async () => {
    try {
      const data = await fetchVideoDetails(videoId);
      if (data.items && data.items.length > 0) {
        setVideoDetails(data.items[0]);
      }
    } catch (err) {
      console.error('Error fetching details:', err);
    }
  };

  const loadRecommended = async (pageToken = '') => {
    if (loadingRecommended) return;
    try {
      setLoadingRecommended(true);
      // Query based on current video's title to find related
      const query = snippet.title ? snippet.title.substring(0, 50) : 'recommended';
      const data = await searchVideos(query, pageToken);
      
      const newVids = (data.items || []).filter(item => item?.id?.kind === 'youtube#video' && item?.id?.videoId !== videoId);
      
      if (pageToken) {
        setRecommended(prev => [...prev, ...newVids]);
      } else {
        setRecommended(newVids);
      }
      setNextPageToken(data.nextPageToken);
    } catch (err) {
      console.error('Error fetching recommended:', err);
    } finally {
      setLoadingRecommended(false);
    }
  };

  const handleLoadMore = () => {
    if (nextPageToken) {
      loadRecommended(nextPageToken);
    }
  };

  const renderHeader = () => {
    const activeSnippet = videoDetails?.snippet || snippet;
    const statistics = videoDetails?.statistics;
    
    return (
      <View style={styles.headerContainer}>
        {/* Player Section */}
        <View style={styles.playerWrapper}>
          <YoutubeIframe
            height={(width * 9) / 16}
            width={width}
            play={playing}
            videoId={videoId}
            initialPlayerParams={{
              modestbranding: 1,
              rel: 0,
            }}
          />
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.title}>{activeSnippet.title}</Text>
          
          <Text style={styles.statsText}>
            {statistics ? `${formatViews(statistics.viewCount)} views` : ''} • {formatDate(activeSnippet.publishedAt)}
          </Text>

          {/* Action Buttons */}
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="thumbs-up-outline" size={22} color={colors.text} />
              <Text style={styles.actionText}>{statistics ? formatViews(statistics.likeCount) : 'Like'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="thumbs-down-outline" size={22} color={colors.text} />
              <Text style={styles.actionText}>Dislike</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="share-social-outline" size={22} color={colors.text} />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="bookmark-outline" size={22} color={colors.text} />
              <Text style={styles.actionText}>Save</Text>
            </TouchableOpacity>
          </View>

          {/* Channel Info */}
          <View style={styles.channelRow}>
            <View style={styles.channelInfo}>
              <Image 
                source={{ uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(activeSnippet.channelTitle)}&background=random` }} 
                style={styles.avatar} 
              />
              <Text style={styles.channelName}>{activeSnippet.channelTitle}</Text>
            </View>
            <TouchableOpacity style={styles.subscribeButton}>
              <Text style={styles.subscribeText}>Subscribe</Text>
            </TouchableOpacity>
          </View>

          {/* Description */}
          <TouchableOpacity 
            style={styles.descriptionBox} 
            onPress={() => setShowFullDesc(!showFullDesc)}
          >
            <Text style={styles.descriptionText} numberOfLines={showFullDesc ? undefined : 3}>
              {activeSnippet.description}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={recommended}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => <VideoCard video={item} />}
        keyExtractor={(item, index) => item?.id?.videoId ? item.id.videoId + index.toString() : index.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loadingRecommended ? <ActivityIndicator size="small" color={colors.primary} style={{ margin: 20 }} /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  playerWrapper: {
    backgroundColor: '#000',
  },
  detailsSection: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  statsText: {
    fontSize: 13,
    color: colors.grayText,
    marginBottom: 15,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    color: colors.text,
    fontSize: 12,
    marginTop: 4,
  },
  channelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#333',
    paddingVertical: 10,
  },
  channelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  channelName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  subscribeButton: {
    backgroundColor: colors.text,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  subscribeText: {
    color: colors.background,
    fontWeight: 'bold',
  },
  descriptionBox: {
    backgroundColor: '#222',
    padding: 12,
    borderRadius: 8,
  },
  descriptionText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default VideoDetailsScreen;
