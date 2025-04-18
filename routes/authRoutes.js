import express from 'express';
import { signup, signin } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { get } from 'mongoose';
import { getProfile } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);

export default router;

