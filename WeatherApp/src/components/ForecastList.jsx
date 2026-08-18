import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import { format } from 'date-fns';

const ForecastList = ({ forecastData }) => {
  if (!forecastData || forecastData.length === 0) return null;

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>5-Day Forecast</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {forecastData.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.dayText}>{format(new Date(item.dt_txt), 'EEE')}</Text>
            <Icon 
              name={getWeatherIcon(item.weather[0].main)} 
              size={35} 
              color="#FFD700" 
              style={styles.icon} 
            />
            <Text style={styles.tempText}>{Math.round(item.main.temp)}°</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ForecastList;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 15,
    marginLeft: 10,
    letterSpacing: 1,
  },
  scroll: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 8,
    width: 90,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  dayText: {
    fontSize: 16,
    color: '#A0A0B0',
    marginBottom: 10,
  },
  icon: {
    marginVertical: 10,
  },
  tempText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
