// HomeScreen.jsx (NEW)
// HOME screen — login/OTP ke baad ye dikhegi

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ============ HEADER ============ */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome to</Text>
            <Text style={styles.appName}>Chemsavy</Text>
          </View>
          <Text style={{ fontSize: 30 }}>
            <Image
              source={require('../../assets/plant.png')}
              style={{ width: 30, height: 30 }}
            />
          </Text>
          <Text style={{ fontSize: 30 }}>
            <Image
              source={require('../../assets/bell.png')}
              style={{ width: 30, height: 30 }}
            />
          </Text>
        </View>

        {/* ============ SEARCH BAR ============ */}
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>
            <Image
              source={require('../../assets/star.png')}
              style={{ width: 30, height: 30 }}
            />
          </Text>
          <Text style={styles.searchText}>
            Describe your crop issue (e.g., fungus on barley)
          </Text>
        </View>

        {/* ============ ADVICE CARD ============ */}
        <View style={styles.adviceCard}>
          <View style={styles.adviceTextContainer}>
            <Text style={styles.adviceTitle}>Need Personal Advice?</Text>
            <Text style={styles.adviceSubtitle}>
              Message a certified agri-chemical{'\n'}expert directly.
            </Text>
            <TouchableOpacity style={styles.upgradeButton}>
              <Image
                  source={require('../../assets/white-lock-icon.png')}
                  style={{ width: 20, height: 20 }}
                /> 
              <Text style={styles.upgradeText}>
                
                
                Upgrade to Unlock</Text>
            </TouchableOpacity>
          </View>
          
          <Image
            source={require('../../assets/Doc.png')} 
            style={styles.expertImage}
          />
        </View>

        {/* ============ RECENT RESULTS ============ */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Recent AI Results</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Result Items */}
        <View style={styles.resultItem}>
          <Text style={styles.resultIcon}>
            <Image
              source={require('../../assets/search.png')}
              style={{ width: 30, height: 30 }}
            />
          </Text>
          <Text style={styles.resultText}>Fungicide suggestion for wheat</Text>
          <Text style={styles.resultArrow}>›</Text>
        </View>

        <View style={styles.resultItem}>
          <Text style={styles.resultIcon}>
            <Image
              source={require('../../assets/search.png')}
              style={{ width: 30, height: 30 }}
            />
          </Text>
          <Text style={styles.resultText}>Fungicide suggestion for wheat</Text>
          <Text style={styles.resultArrow}>›</Text>

        </View>

        {/* ============ CROP GUIDE ============ */}
        <View style={styles.guideCard}>
          <View style={styles.guideIconContainer}>
            <Image
              source={require('../../assets/book.png')}
              style={styles.guideIcon}
            />
          </View>
          <View style={styles.guideTextContainer}>
            <Text style={styles.guideTitle}>Crop Guide</Text>
            <Text style={styles.guideSubtitle}>
              Explore the full PDF guide with easy search and navigation.
            </Text>
            <TouchableOpacity>
              <Text style={styles.guideLink}>View Guide</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    // paddingHorizontal: 5,
    paddingTop: 30,
    paddingBottom: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 20,
  },
  welcomeText: {
    fontSize: 32,
    color: '#666',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginBottom: 20,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  searchText: {
    fontSize: 16,
    color: '#999',
    flex: 1,
  },
  adviceCard: {
    marginHorizontal: 24,
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    flexDirection: 'row',
    overflow: 'hidden', // Image ko card ke bahar nikalne se rokne ke liye
  },
  adviceTextContainer: {
    width: '65%',
    zIndex: 2,
  },
  expertImage: {
    position: 'absolute',
    right: -20,
    bottom: -10,
    width: 150,
    height: 180,
    resizeMode: 'contain',
    zIndex: 1,
  },
  adviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 6,
  },
  adviceSubtitle: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 14,
  },
  upgradeButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start', 
    display: 'flex',
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  upgradeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
   
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B1B1B',
  },
  viewAll: {
    fontSize: 13,
    color: '#2E7D32',
    fontWeight: '500',
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  resultIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  resultText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  resultArrow: {
    fontSize: 40,
    color: '#4CAF50'
  },
  guideCard: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: 20,
    padding: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8F5E9',
    alignItems: 'center',
  },
  guideIconContainer: {
    marginRight: 16,
  },
  guideIcon: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  guideTextContainer: {
    flex: 1,
  },
  guideTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 4,
  },
  guideSubtitle: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 8,
  },
  guideLink: {
    color: '#4CAF50',
    fontSize: 13,
    fontWeight: '500',
  },
});

export default HomeScreen;
