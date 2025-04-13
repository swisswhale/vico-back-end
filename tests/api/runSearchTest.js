
import fetch from 'node-fetch';

const testSearch = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/artwork/search?q=warhol');
        const data = await response.json();

        console.log('🎯 Search Results:', data);
    } catch (err) {
        console.error('❌ Test failed:', err.message);
    }
};

testSearch();