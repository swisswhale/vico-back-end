import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    try {
        console.log('Signup attempt with data:', req.body);
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({ username, password });
        await user.save();

        const token = jwt.sign(
            { payload: { username: user.username, _id: user._id } },
            process.env.JWT_SECRET,
            { expiresIn: '60s' }
          

        );

        res.status(201).json({ token, user: { id: user._id, username: user.username } });
    } catch (err) {
        console.error('Error in signup:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

export const signin = async (req, res) => {
    try {
        console.log('Signin attempt with data:', req.body);
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

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
            { expiresIn: '60s' }
        );

        res.json({ token, user: { id: user._id, username: user.username } });
    } catch (err) {
        console.error('Error in signin:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};