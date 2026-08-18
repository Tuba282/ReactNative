import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import { useWeatherContext } from '../context/WeatherContext';

const WeatherCard = ({ weatherData }) => {
  const { unit } = useWeatherContext();
  
  if (!weatherData) return null;

  const getWeatherIcon = (main) => {
    switch (main.toLowerCase()) {
      case 'clear': return 'sunny';
      case 'clouds': return 'cloudy';
      case 'rain': return 'rainy';
      case 'snow': return 'snow';
      case 'thunderstorm': return 'thunderstorm';
      default: return 'partly-sunny';
    }
  };

  const tempUnit = unit === 'metric' ? '°C' : '°F';
  const speedUnit = unit === 'metric' ? 'm/s' : 'mph';

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{weatherData.name}, {weatherData.sys.country}</Text>
      
      <View style={styles.tempContainer}>
        <Icon name={getWeatherIcon(weatherData.weather[0].main)} size={90} color="#FFD700" style={styles.weatherIcon} />
        <Text style={styles.temp}>{Math.round(weatherData.main.temp)}{tempUnit}</Text>
      </View>
      
      <Text style={styles.subtitle}>{weatherData.weather[0].main} - {weatherData.weather[0].description}</Text>
      
      <View style={styles.row}>
        <View style={styles.detailBox}>
          <Icon name="water-outline" size={24} color="#00BFFF" />
          <Text style={styles.detailValue}>{weatherData.main.humidity}%</Text>
          <Text style={styles.detailLabel}>Humidity</Text>
        </View>
        <View style={styles.detailBox}>
          <Icon name="navigate-outline" size={24} color="#FF4500" />
          <Text style={styles.detailValue}>{weatherData.wind.speed} {speedUnit}</Text>
          <Text style={styles.detailLabel}>Wind</Text>
        </View>
      </View>
    </View>
  );
};

export default WeatherCard;

const styles = StyleSheet.create({
  card: {
    padding: 30,
    marginTop: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  tempContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  weatherIcon: {
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
  },
  temp: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 20,
  },
  subtitle: {
    fontSize: 20,
    color: '#A0A0B0',
    textTransform: 'capitalize',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  detailBox: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    minWidth: 120,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 5,
  },
  detailLabel: {
    fontSize: 14,
    color: '#A0A0B0',
    marginTop: 2,
  }
});
