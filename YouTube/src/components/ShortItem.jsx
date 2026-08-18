import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors } from '../constants/colors';

const { height, width } = Dimensions.get('window');

const ShortItem = ({ item, itemHeight, isActive }) => {
  const snippet = item?.snippet || {};
  const videoId = typeof item?.id === 'object' ? item?.id?.videoId : item?.id;

  // Force the iframe to be 16:9 but with the height of the screen.
  // This causes 16:9 videos (with pillarboxes) to overflow the sides and fill the screen vertically, acting like a true portrait video.
  const iframeHeight = itemHeight;
  const iframeWidth = itemHeight * (16 / 9);

  return (
    <View style={[styles.container, { height: itemHeight }]}>
      {isActive && (
        <View style={styles.videoContainer}>
          <YoutubeIframe
            height={iframeHeight}
            width={iframeWidth}
            play={isActive}
            videoId={videoId}
            initialPlayerParams={{
              loop: 1,
              controls: 0,
              modestbranding: 1,
              rel: 0,
              fs: 0,
            }}
          />
        </View>
      )}

      <View style={styles.overlay} pointerEvents="box-none">
        {/* Right Actions */}
        <View style={styles.rightActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="thumbs-up" size={28} color={colors.background} />
            <Text style={styles.actionText}>Like</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="thumbs-down" size={28} color={colors.background} />
            <Text style={styles.actionText}>Dislike</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble" size={28} color={colors.background} />
            <Text style={styles.actionText}>Comment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="arrow-redo" size={28} color={colors.background} />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Info */}
        <View style={styles.bottomInfo}>
          <View style={styles.channelContainer}>
            <Image
              source={{
                uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  snippet?.channelTitle || 'Channel'
                )}&background=random`,
              }}
              style={styles.avatar}
            />
            <Text style={styles.channelName}>@{snippet?.channelTitle}</Text>
          </View>
          <Text style={styles.title} numberOfLines={2}>
            {snippet?.title}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    justifyContent: 'flex-end',
    backgroundColor: '#000',
  },
  videoContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'flex-end',
    paddingBottom: 20,
    zIndex: 10,
  },
  rightActions: {
    position: 'absolute',
    right: 15,
    bottom: 80,
    alignItems: 'center',
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  actionText: {
    color: colors.background,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
  },
  bottomInfo: {
    paddingHorizontal: 15,
    width: '80%',
    paddingBottom: 10,
  },
  channelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.background,
    marginRight: 10,
  },
  channelName: {
    color: colors.background,
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: {
    color: colors.background,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default ShortItem;
