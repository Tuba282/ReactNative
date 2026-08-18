import axios from 'axios';
import { API_URL, API_KEY } from '../../constants/apiConfig';

export const getShorts = async (pageToken = '') => {
  const response = await axios.get(`${API_URL}/search`, {
    params: {
      part: 'snippet',
      q: '#shorts',
      type: 'video',
      order: 'date',
      videoDuration: 'short',
      maxResults: 20,
      pageToken,
      key: API_KEY,
    },
  });

  return response.data;
};
