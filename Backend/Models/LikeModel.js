import mongoose from "mongoose";

const LikeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    story: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story",
        required: true
    }
}, { timestamps: true })

LikeSchema.index({ user: 1, story: 1 }, { unique: true })

export const Like = mongoose.model("Like", LikeSchema)