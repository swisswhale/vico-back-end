import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const HARVARD_API_KEY = process.env.HARVARD_API_KEY;
const BASE_URL = 'https://api.harvardartmuseums.org';

export const searchHarvardArtworks = async (query, size = 10) => {
  try {
    const response = await axios.get(`${BASE_URL}/object`, {
      params: {
        apikey: HARVARD_API_KEY,
        q: query,
        size: size,
        fields: 'id,title,primaryimageurl,people,dated,medium,culture',
      }
    });

    console.log('Successfulyy connected to Harvard API for search. Response:', response.data);

    return response.data.records;
  } catch (error) {
    console.error('Error searching Harvard artworks:', error);
    throw error;
  }
};

export const getHarvardArtworkById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/object/${id}`, {
      params: {
        apikey: HARVARD_API_KEY,
      }
    });

    console.log(`Successfully fetched Harvard artwork with id ${id}. Response:`, response.data);

    return response.data;
  } catch (error) {
    console.error(`Error fetching Harvard artwork with id ${id}:`, error);
    throw error;
  }
};