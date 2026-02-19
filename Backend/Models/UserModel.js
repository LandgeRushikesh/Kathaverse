import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        requried: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    profilPicture: {
        type: String,
        default: null
    },
    bio: {
        type: String,
        default: ""
    },
    followerCount: {
        type: Number,
        default: 0
    },
    followingCount: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, { timeStamps: true })

export const User = mongoose.model("user", userSchema) 