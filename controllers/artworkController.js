// Test
import { searchArtsy } from '../services/artsyService.js';

export const searchExternalArtworks = async (req, res) => {
    try {
        const data = await searchArtsy('search', {
            q: req.query.q,
            size: 10
        });

        res.json(data);
    } catch (err) {
        console.error('Artsy API error:', err.response?.data || err.message || err);
        res.status(500).json({ error: 'Failed to fetch from Artsy' });
    }
};