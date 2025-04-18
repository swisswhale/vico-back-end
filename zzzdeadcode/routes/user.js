/*
import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all users (limited fields) with pagination
router.get('/', verifyToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find({}, "username email")
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();

    res.json({
      users,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalUsers: total
    });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
});

// Get specific user
router.get('/:userId', verifyToken, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    if (req.user._id !== req.params.userId) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    const user = await User.findById(req.params.userId, "username email");

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching the user' });
  }
});

// Update user
router.put('/:userId', verifyToken, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    if (req.user._id !== req.params.userId) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    const { username, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { username, email },
      { new: true, runValidators: true, select: "username email" }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: updatedUser });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'An error occurred while updating the user' });
  }
});

// Delete user
router.delete('/:userId', verifyToken, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    if (req.user._id !== req.params.userId) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    const deletedUser = await User.findByIdAndDelete(req.params.userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User successfully deleted' });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while deleting the user' });
  }
});

export default router;
*/