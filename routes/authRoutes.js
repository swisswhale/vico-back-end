import express from 'express';
import * as authCtrl from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/signup', authCtrl.signup);
router.post('/signin', authCtrl.signin);

// Protected routes
router.use(verifyToken); 

router.post('/signout', authCtrl.signout);
router.get('/profile', authCtrl.getProfile);
router.put('/profile', authCtrl.updateProfile);
router.put('/change-password', authCtrl.changePassword);
router.get('/check-session', authCtrl.checkSession);

export default router;