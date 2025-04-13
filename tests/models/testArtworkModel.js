import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

import Artwork from '../../models/Artwork.js';
import { searchArtsy } from '../../services/artsyService.js';

const getAccessToken = async () => {
  const { data } = await axios.post('https://api.artsy.net/api/tokens/xapp_token', {
    client_id: process.env.ARTSY_CLIENT_ID,
    client_secret: process.env.ARTSY_CLIENT_SECRET
  });
  return data.token;
};

const test = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const search = await searchArtsy('search', { q: 'violin', size: 10 });
    const artworks = search._embedded.results.filter(r => r.type === 'artwork');

    const token = await getAccessToken();
    let fullArtwork = null;
    let usedMock = false;

    for (const match of artworks) {
      const href = match._links?.self?.href;
      if (!href) continue;

      try {
        const { data } = await axios.get(href, {
          headers: { 'X-Xapp-Token': token }
        });
        fullArtwork = data;
        console.log(`✅ Valid artwork found: ${data.title}`);
        break;
      } catch (err) {
        if (err.response?.status === 429) {
          console.error('🚫 Rate limit hit. Try again later.');
          break;
        }
        console.warn(`⏭️ Skipping invalid artwork link: ${href}`);
      }
    }

    // Fallback to known good ID
    if (!fullArtwork) {
      console.warn('⚠️ No valid artwork from search, falling back to known ID...');
      try {
        const fallbackHref = 'https://api.artsy.net/api/artworks/516dfb9ab31e2b2270000c45';
        const { data } = await axios.get(fallbackHref, {
          headers: { 'X-Xapp-Token': token }
        });
        fullArtwork = data;
      } catch (err) {
        if (err.response?.status === 429) {
          console.error('🚫 Rate limit hit during fallback. Will try mock.');
        } else {
          console.error('❌ Fallback by ID failed:', err.message);
        }
      }
    }

    // Fallback to mock if needed
    if (!fullArtwork) {
      console.warn('🧪 Using local mock artwork fallback...');
      const mockPath = path.resolve('tests/json/mockArtwork.json');
      const mockData = fs.readFileSync(mockPath, 'utf-8');
      fullArtwork = JSON.parse(mockData);
      usedMock = true;
    }

    const simplified = {
      artsyId: fullArtwork.id || fullArtwork.artsyId,
      title: fullArtwork.title,
      slug: fullArtwork.slug,
      medium: fullArtwork.medium,
      category: fullArtwork.category,
      date: fullArtwork.date,
      dimensions: fullArtwork.dimensions?.in?.text || fullArtwork.dimensions,
      collectingInstitution: fullArtwork.collecting_institution,
      imageUrl: fullArtwork._links?.thumbnail?.href || fullArtwork.imageUrl,
      permalink: fullArtwork._links?.permalink?.href || fullArtwork.permalink,
      isMock: usedMock
    };

    const saved = await Artwork.create(simplified);
    console.log(`✅ Saved ${usedMock ? 'mock' : 'real'} artwork to MongoDB:`, saved.title);
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

test();