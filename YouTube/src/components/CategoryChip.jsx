import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../constants/colors';

const categories = ['All', 'React Native', 'Gaming', 'Music', 'Live', 'News', 'Podcasts', 'Mixes', 'Sports'];

const CategoryChip = ({ activeCategory, onSelectCategory }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.chip, activeCategory === item && styles.activeChip]}
            onPress={() => onSelectCategory(item)}
          >
            <Text style={[styles.text, activeCategory === item && styles.activeText]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  chip: {
    backgroundColor: colors.lightGray,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  activeChip: {
    backgroundColor: colors.text,
  },
  text: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '500',
  },
  activeText: {
    color: colors.background,
  },
});

export default CategoryChip;
