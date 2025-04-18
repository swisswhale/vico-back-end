import dotenv from 'dotenv';
dotenv.config();

// Debugging
console.log('🎯 Artsy Client ID:', process.env.ARTSY_CLIENT_ID);
console.log('🎯 Artsy Client Secret:', process.env.ARTSY_CLIENT_SECRET);

import axios from "axios";

const clientID = process.env.ARTSY_CLIENT_ID;
const clientSecret = process.env.ARTSY_CLIENT_SECRET;
const baseURL = process.env.ARTSY_API_URL;

let cachedToken = null;
let tokenExpiry = null;

// Get access token using client credentials
async function getAccessToken() {
    if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
        return cachedToken;
    }

    const response = await axios.post('https://api.artsy.net/api/tokens/xapp_token', {
        client_id: clientID,
        client_secret: clientSecret
    });

    cachedToken = response.data.token;
    tokenExpiry = new Date(response.data.expires_at).getTime();

    return cachedToken;
}

// Search for artworks or artists
export async function searchArtsy(endpoint, query) {
    const token = await getAccessToken();

    const response = await axios.get(`${baseURL}/${endpoint}`, {
        headers: {
            'X-Xapp-Token': token
        },
        params: query
    });

    return response.data;
}