// server.js
import dotenv from 'dotenv';
dotenv.config();

console.log('🧪 Loaded from .env in server.js:', process.env.ARTSY_CLIENT_ID);

import express from 'express';
import mongoose from 'mongoose';
import artworkRoutes from './routes/artworkRoutes.js';

// Artwork test
import devRoutes from './routes/devs.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// DB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/artwork', artworkRoutes);
app.use('/api/dev', devRoutes); // testing artworks in db
//app.use('/routes/artworkRoutes.js', artworkRoutes);

// Health Check
app.get('/', (req, res) => {
    res.send('🎨 Art Collector API is live.');
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});

/*import express from 'express';
import connectDB from './config/db.js';

connectDB();


app.get('/', (req, res) => {
    res.send('✅ Backend is running!');
  });

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});*/