import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    profilePicture: {
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
}, { timestamps: true })

// mongoose built in hook
userSchema.pre("save", async function () {

    if (!this.isModified("password")) {//this is to check that is password is already hashed or not means when we will update userProfile we should not rehash the password which can break login logic
        return
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

export const User = mongoose.model("user", userSchema) 