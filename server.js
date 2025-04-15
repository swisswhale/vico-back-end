// server.js
import dotenv from 'dotenv';
dotenv.config();

console.log('🧪 Loaded from .env in server.js:', process.env.ARTSY_CLIENT_ID);

import express from 'express';
import mongoose from 'mongoose';

import authRouter from './routes/authRoutes.js';


import userSignedController from './routes/userRoutes.js'


import artworkRoutes from './routes/artworkRoutes.js';
import collectionRoutes from './routes/collectionRoutes.js'


// Artwork test
import devRoutes from './routes/devs.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// DB Connection
mongoose.connect(process.env.MONGODB_URI, {
//    useNewUrlParser: true,
//    useUnifiedTopology: true,
//    before you go shooting the messenger, terminal seems to not like either of these.
})
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));


    // Controllers






    // Routes
app.use('/auth', authRouter);


// app.use('/artwork', artworkRoutes);
// I realized this would be better used/called from within the collections routes so we 
// can render artworks' info cleanly from there instead. 
//                                                                        ~Metroid-X
app.use('/collection', collectionRoutes);
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