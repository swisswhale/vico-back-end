//const mongoose = require('mongoose');
//const bcrypt = require('bcryptjs');

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: {
        type: String,
        required: true,
        minlength: 8,
        validate: {
            validator: function (value) {
                return (
                    /[a-z]/.test(value) && // lowercase
                    /[A-Z]/.test(value) && // uppercase
                    /\d/.test(value) && // number
                    /[^A-Za-z0-9]/.test(value) && // special character
                    /^\S+$/.test(value) // no spaces
                );
            },
            message:
                'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.'
        }
    }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.comparePassword = (candidatePassword) => {
    return bcrypt.compare(candidatePassword, this.password); // ✅ fixed typo: "candiatePassword"
};

// userSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//         delete returnedObject.hashedPassword;
//     }
// });

// I'm not sure, but we may need to switch to using this maybe? ~Metroid-x

//module.exports = mongoose.model('User', userSchema);

// ES module export for testing
const User = mongoose.model('User', userSchema);
export default User;