import axios from 'axios';

const HARVARD_API_KEY = process.env.HARVARD_API_KEY;
const BASE_URL = 'https://api.harvardartmuseums.org';

export const searchHarvardArtworks = async (query, size = 10) => {
  const response = await axios.get(`${BASE_URL}/object`, {
    params: {
      apikey: HARVARD_API_KEY,
      q: query,
      size
    }
  });

  return response.data.records;
};