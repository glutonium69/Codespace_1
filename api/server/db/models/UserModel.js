import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        immutable: true
    },
    password: {
        type: String,
        required: true
    },
    time: {
        type: String,
        default: Date.now(),
        immutable: true
    }
});

export const UserModel = mongoose.model("user", userSchema);