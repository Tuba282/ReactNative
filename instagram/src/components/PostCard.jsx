import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const { width } = Dimensions.get('window');

const PostCard = ({ post, isLiked, onLikeToggle }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(scrollPosition / width);
    setCurrentImageIndex(currentIndex);
  };

  const renderImage = ({ item }) => (
    <Image source={{ uri: item }} style={styles.postImage} />
  );

  return (
    <View style={styles.container}>
      {/* Post Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={{ uri: post.userAvatar }} style={styles.avatar} />
          <Text style={styles.username}>{post.userName}</Text>
          {post.isVerified && (
            <Image
              source={{
                uri: 'https://www.svgrepo.com/show/124304/three-dots.svg',
              }}
              style={[styles.smallIcon, styles.verifiedBadge]}
            />
          )}
        </View>
        <TouchableOpacity>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/2311/2311152.png',
            }}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Image Slider */}
      <View>
        <FlatList
          data={post.images}
          renderItem={renderImage}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
        />
        {post.images.length > 1 && (
          <View style={styles.counterBadge}>
            <Text style={styles.counterText}>
              {currentImageIndex + 1}/{post.images.length}
            </Text>
          </View>
        )}
      </View>

      {/* Action Bar */}
      <View style={styles.actionBar}>
        <View style={styles.actionLeft}>
          <TouchableOpacity style={styles.actionIcon} onPress={() => onLikeToggle && onLikeToggle(post.id)}>
            <Image
              source={{
                uri: isLiked ? 'https://cdn-icons-png.flaticon.com/512/833/833472.png' : 'https://cdn-icons-png.flaticon.com/512/1077/1077035.png',
              }}
              style={[styles.icon, isLiked && { tintColor: '#ed4956' }]}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionIcon}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/3114/3114868.png',
              }}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionIcon}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/3024/3024593.png',
              }}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        {/* Pagination Dots */}
        {post.images.length > 1 && (
          <View style={styles.paginationContainer}>
            {post.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  currentImageIndex === index
                    ? styles.paginationDotActive
                    : styles.paginationDotInactive,
                ]}
              />
            ))}
          </View>
        )}

        <TouchableOpacity style={styles.actionRight}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/5662/5662990.png',
            }}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Post Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.likesText}>{post.likes} likes</Text>
        <View style={styles.captionContainer}>
          <Text style={styles.captionUsername}>{post.userName}</Text>
          <Text style={styles.captionText}> {post.caption}</Text>
        </View>
        <Text style={styles.timeText}>{post.postTime}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  username: {
    fontWeight: '600',
    fontSize: 14,
    color: '#000',
  },
  verifiedBadge: {
    marginLeft: 4,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#000',
  },
  smallIcon: {
    width: 14,
    height: 14,
  },
  postImage: {
    width: width,
    height: width, // Square image
  },
  counterBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  counterText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100, // To balance the pagination centering
  },
  actionIcon: {
    marginRight: 15,
  },
  actionRight: {
    width: 100, // To balance the pagination centering
    alignItems: 'flex-end',
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  paginationDotActive: {
    backgroundColor: '#3897f0',
  },
  paginationDotInactive: {
    backgroundColor: '#c7c7c7',
  },
  detailsContainer: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  likesText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
  },
  captionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  captionUsername: {
    fontWeight: '600',
    fontSize: 14,
    color: '#000',
  },
  captionText: {
    fontSize: 14,
    color: '#000',
  },
  timeText: {
    fontSize: 12,
    color: '#8e8e8e',
    marginTop: 2,
  },
});

export default PostCard;
