import axios from 'axios';
import { API_URL, API_KEY } from '../../constants/apiConfig';

export const searchVideos = async query => {
  const response = await axios.get(`${API_URL}/search`, {
    params: {
      part: 'snippet',
      q: query,
      type: 'video',
      maxResults: 10,
      key: API_KEY,
    },
  });

  return response.data;
};
