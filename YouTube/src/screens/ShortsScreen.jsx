import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { getShorts } from '../services/shorts/shortsApi';
import ShortItem from '../components/ShortItem';
import { colors } from '../constants/colors';

const ShortsScreen = () => {
  const [shorts, setShorts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState(null);
  
  const [listHeight, setListHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 70,
  }).current;

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }, []);

  useEffect(() => {
    loadShorts();
  }, []);

  const loadShorts = async (pageToken = '') => {
    if (loading) return;
    
    try {
      setLoading(true);
      const data = await getShorts(pageToken);
      
      const newShorts = (data.items || []).filter(item => item?.id?.kind === 'youtube#video');
      
      setShorts(prev => [...prev, ...newShorts]);
      setNextPageToken(data.nextPageToken);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (nextPageToken) {
      loadShorts(nextPageToken);
    }
  };

  return (
    <View 
      style={styles.container}
      onLayout={(e) => setListHeight(e.nativeEvent.layout.height)}
    >
      {listHeight > 0 && (
        <FlatList
          data={shorts}
          renderItem={({ item, index }) => (
            <ShortItem 
              item={item} 
              itemHeight={listHeight} 
              isActive={index === activeIndex}
            />
          )}
          keyExtractor={(item, index) => item?.id?.videoId ? item.id.videoId + index.toString() : index.toString()}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          snapToInterval={listHeight}
          snapToAlignment="start"
          decelerationRate="fast"
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />
      )}
      {loading && shorts.length === 0 && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.background} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ShortsScreen;
