import axios from 'axios';

// IMPORTANT: Replace this with your actual OpenWeatherMap API Key
const API_KEY = '3c1a713cc28655d7fafa80502786ab54';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherByCity = async (city, unit = 'metric') => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: { q: city, appid: API_KEY, units: unit },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchWeatherByLocation = async (lat, lon, unit = 'metric') => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: { lat, lon, appid: API_KEY, units: unit },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchForecast = async (query, isCoordinates = false, unit = 'metric') => {
  try {
    const params = { appid: API_KEY, units: unit };
    if (isCoordinates) {
      params.lat = query.lat;
      params.lon = query.lon;
    } else {
      params.q = query;
    }
    
    const response = await axios.get(`${BASE_URL}/forecast`, { params });
    // Filter to get roughly one forecast per day (API returns 3-hour intervals)
    const dailyData = response.data.list.filter(item => item.dt_txt.includes('12:00:00'));
    return dailyData;
  } catch (error) {
    throw error;
  }
};
