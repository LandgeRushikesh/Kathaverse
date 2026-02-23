import mongoose from "mongoose";

const followSchema = mongoose.Schema({
    follower: {//the person who follows
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    following: {//the person who's beging followed
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true })

// Compound indexing which helps to maintain uniqueness means person can follow other person only once. here 1 repersents ascending order of sorting 
followSchema.index({ follower: 1, following: 1 }, { unique: true })


export const Follow = mongoose.model("Follow", followSchema)