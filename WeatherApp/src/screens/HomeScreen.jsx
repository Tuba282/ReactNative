import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Animated,
} from 'react-native';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import SearchInput from '../components/SearchInput';
import WeatherCard from '../components/WeatherCard';
import EmptyState from '../components/EmptyState';
import ForecastList from '../components/ForecastList';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  fetchWeatherByCity,
  fetchWeatherByLocation,
  fetchForecast,
} from '../utils/weatherApi';
import Geolocation from 'react-native-geolocation-service';
import Icon from '@react-native-vector-icons/ionicons';
import { useWeatherContext } from '../context/WeatherContext';

const HomeScreen = () => {
  const { unit, toggleUnit } = useWeatherContext();
  const [city, setCity] = useState('');
  const [lastQuery, setLastQuery] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (lastQuery) {
      if (lastQuery.type === 'city') {
        fetchDataByCity(lastQuery.value, false);
      } else {
        fetchDataByLocation(lastQuery.value.lat, lastQuery.value.lon, false);
      }
    }
  }, [unit]);

  const triggerAnimation = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const handleCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      setError(
        'Location permission denied. Please enable GPS and Permissions.',
      );
      return;
    }

    setLoading(true);
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        fetchDataByLocation(latitude, longitude, false);
      },
      error => {
        setError('Failed to get current location. Ensure GPS is on.');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const fetchDataByLocation = async (lat, lon, isRefresh = false) => {
    setLastQuery({ type: 'location', value: { lat, lon } });
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError('');

    try {
      const weather = await fetchWeatherByLocation(lat, lon, unit);
      const forecast = await fetchForecast({ lat, lon }, true, unit);
      setWeatherData(weather);
      setForecastData(forecast);
      setCity(weather.name);
      triggerAnimation();
    } catch (err) {
      setError('Error fetching location data.');
      setWeatherData(null);
      setForecastData([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchDataByCity = async (searchCity, isRefresh = false) => {
    if (!searchCity.trim()) return;
    setLastQuery({ type: 'city', value: searchCity });

    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError('');

    try {
      const weather = await fetchWeatherByCity(searchCity, unit);
      const forecast = await fetchForecast(searchCity, false, unit);
      setWeatherData(weather);
      setForecastData(forecast);
      triggerAnimation();
    } catch (err) {
      setError('City not found or API error.');
      setWeatherData(null);
      setForecastData([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    if (lastQuery) {
      if (lastQuery.type === 'city') {
        fetchDataByCity(lastQuery.value, true);
      } else {
        fetchDataByLocation(lastQuery.value.lat, lastQuery.value.lon, true);
      }
    } else {
      setRefreshing(false);
    }
  }, [lastQuery, unit]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Weather</Text>
        <TouchableOpacity style={styles.unitToggle} onPress={toggleUnit}>
          <Text style={styles.unitText}>{unit === 'metric' ? '°C' : '°F'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchInputContainer}>
          <SearchInput
            value={city}
            onChangeText={setCity}
            onSubmit={() => fetchDataByCity(city)}
          />
        </View>
        <TouchableOpacity
          style={styles.locationBtn}
          onPress={handleCurrentLocation}
        >
          <Icon name="location" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FFF"
            colors={['#007AFF']}
          />
        }
      >
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#FFD700"
            style={{ marginTop: 50 }}
          />
        ) : error ? (
          <View style={styles.errorContainer}>
            <Icon name="alert-circle-outline" size={40} color="#FF6B6B" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : weatherData ? (
          <Animated.View style={{ opacity: fadeAnim }}>
            <WeatherCard weatherData={weatherData} />
            <ForecastList forecastData={forecastData} />
          </Animated.View>
        ) : (
          <EmptyState />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    letterSpacing: 1,
  },
  unitToggle: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  unitText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  searchInputContainer: {
    flex: 1,
  },
  locationBtn: {
    backgroundColor: 'rgba(0, 122, 255, 0.8)',
    width: 55,
    height: 55,
    borderRadius: 15,
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  errorContainer: {
    alignItems: 'center',
    marginTop: 50,
    paddingHorizontal: 20,
  },
  errorText: {
    color: '#FF6B6B',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 16,
    lineHeight: 24,
  },
});
