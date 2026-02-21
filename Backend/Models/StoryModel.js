import mongoose from "mongoose";
import { User } from "./UserModel.js"

const StorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    overview: {
        type: String,
        required: true,
        trim: true
    },
    coverImage: {
        type: String,
        default: null
    },
    category: {
        type: String,
        default: "General",
        trim: true
    },
    likeCount: {
        type: Number,
        default: 0
    },
    commentCount: {
        type: Number,
        default: 0
    },

}, { timestamps: true })

export const Story = mongoose.model("Story", StorySchema)