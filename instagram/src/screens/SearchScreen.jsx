import React, { useState } from 'react';
import { View, StyleSheet, TextInput, FlatList, Image, Text } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';

const DUMMY_IMAGES = [
  { id: '1', name: 'Nature', uri: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&q=80' },
  { id: '2', name: 'City', uri: 'https://images.unsplash.com/photo-1512412046876-f386342eddb3?w=500&q=80' },
  { id: '3', name: 'Coffee', uri: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=500&q=80' },
  { id: '4', name: 'Mountains', uri: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=500&q=80' },
  { id: '5', name: 'Ocean', uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80' },
  { id: '6', name: 'Architecture', uri: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&q=80' },
];

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  
  const filteredImages = DUMMY_IMAGES.filter(img => 
    img.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ScreenWrapper style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search images by name..."
          value={query}
          onChangeText={setQuery}
        />
      </View>
      <FlatList
        data={filteredImages}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.imageCard}>
            <Image source={{ uri: item.uri }} style={styles.image} />
            <Text style={styles.imageName}>{item.name}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No images found</Text>}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  searchContainer: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#dbdbdb' },
  searchInput: { backgroundColor: '#efefef', borderRadius: 8, padding: 10, fontSize: 16 },
  listContent: { padding: 8 },
  imageCard: { flex: 1, margin: 8, borderRadius: 8, overflow: 'hidden', backgroundColor: '#f0f0f0' },
  image: { width: '100%', aspectRatio: 1 },
  imageName: { padding: 8, textAlign: 'center', fontWeight: '500' },
  emptyText: { textAlign: 'center', marginTop: 20, color: '#666' }
});

export default SearchScreen;
