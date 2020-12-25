import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        min: 6,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    firstName: {
        type: String,
        required: true,
        min: 1,
        max: 255,
    },
    lastName: {
        type: String,
        required: true,
        min: 1,
        max: 255,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lastLogin: {
        type: Date,
        default: 0,
    },
    roles: {
        type: [String],
        default: ['user'],
    },
});

const User = mongoose.model("User", UserSchema);

export default User;
