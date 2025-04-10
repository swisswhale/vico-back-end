// server.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './config/db.js';

connectDB();

const app = express();
// rest of your server...