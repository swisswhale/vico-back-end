import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';

const saltRounds = 12;

router.post('/sign-up', async (req, res) => {
  try {
    const userInDatabase = await (User.findOne({ username: req.body.username }) || User.findOne({ email: req.body.email }));
    
    if (userInDatabase) {
      return res.status(409).json({err: 'Username already taken, OR Email already in use.'});
    }
    
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      hashedPassword: bcrypt.hashSync(req.body.password, saltRounds)
    });

    const payload = { username: user.username, _id: user._id };

    const token = jwt.sign({ payload }, process.env.JWT_SECRET);

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.post('/sign-in', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ err: 'Invalid credentials.' });
    }

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password, user.hashedPassword
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ err: 'Invalid credentials.' });
    }

    const payload = { username: user.username, _id: user._id };

    const token = jwt.sign({ payload }, process.env.JWT_SECRET);

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

export default router;