import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    story: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story",
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true })

export const Comment = mongoose.model("Comment", commentSchema)