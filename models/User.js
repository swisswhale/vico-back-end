import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    password: {
        type: String,
        required: true,
        minlength: 8,
        validate: {
            validator: function (value) {
                return (
                    /[a-z]/.test(value) && 
                    /[A-Z]/.test(value) && 
                    /\d/.test(value) && 
                    /[^A-Za-z0-9]/.test(value) && 
                    /^\S+$/.test(value) 
                );
            },
            message:
                'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.'
        }
    },
    collections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Collection' }]
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.hashedPassword;
    }
});

export default mongoose.model('User', userSchema);

