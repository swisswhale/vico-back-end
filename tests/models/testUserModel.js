console.log('Script started')
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../../models/User.js';

dotenv.config();

(async function () {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Clean up previous test user
    await User.deleteOne({ email: 'test@example.com' });

    // Create new user
    const newUser = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: 'SecurePass123!'
    });

    await newUser.save();

    console.log('User saved:', newUser);

    // Check password hashing
    console.log('Stored password:', newUser.password); // should NOT match plain text

    // Test comparePassword
    const isMatch = await newUser.comparePassword('SecurePass123!');
    const isWrong = await newUser.comparePassword('WrongPassword');

    console.log('Correct password match:', isMatch);     // true
    console.log('Wrong password match:', isWrong);       // false

    await mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err);
    await mongoose.disconnect();
  }
})();