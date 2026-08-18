import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors } from '../constants/colors';

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Ionicons name="logo-youtube" size={28} color={colors.primary} />
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg' }}
          style={styles.logoText}
          resizeMode="contain"
        />
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.icon}>
          <Ionicons name="cast-outline" size={24} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Ionicons name="notifications-outline" size={24} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Ionicons name="search-outline" size={24} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileIcon}>
          <Ionicons name="person-circle" size={28} color={colors.grayText} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: colors.background,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    width: 80,
    height: 20,
    marginLeft: 5,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 20,
  },
  profileIcon: {
    marginLeft: 20,
  },
});

export default Header;
