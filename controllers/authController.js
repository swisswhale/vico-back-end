import User from '../models/User.js';
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User ({ username, password });
        await user.save();
        const token = jwt.sign(
            { payload: { username: user.username, _id: user._id } },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        res.status(201).json({ toekn, user: { id: user._id, username: user.name } });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' })
    }
};

export const signin = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign(
        { payload: { username: user.username, _id: user._id } },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      res.json({ token, user: { id: user._id, username: user.username } });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };