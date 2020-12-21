import * as mongoose from "mongoose";

interface User {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    createdAt: number;
    lastLogin: number;
    role: "user" | "admin";
}
interface UserDocument extends User, mongoose.Document {
    _id: string;
}

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
    role: {
        type: String,
        default: 'user',
    },
});

const UserModel = mongoose.model<UserDocument>('User', UserSchema);

export { UserModel, User }
