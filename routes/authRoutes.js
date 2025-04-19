import express from 'express';
import * as authCtrl from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Sign up route
router.post('/signup', authCtrl.signup);

// Sign in route
router.post('/signin', authCtrl.signin);

// Protected route to get user profile
router.get('/profile', verifyToken, authCtrl.getProfile);

export default router;