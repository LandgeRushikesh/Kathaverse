import { User } from "../../Models/UserModel.js"
import asyncHandler from 'express-async-handler'
import generateJWT from "../../utils/generateJWT.js"
import bcrypt from "bcryptjs"

// POST
// @desc Register User
// @route /api/users/register
// @access Public

export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please add all fields")
    }

    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(409)
        throw new Error("User Already Exists")
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (!user) {
        res.status(400)
        throw new Error("Invalid User Data")
    }

    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateJWT(user._id)
    })
})

// POST
// @desc Login User
// @route /api/users/login
// @access Public

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400)
        throw new Error("All fields are required")
    }

    const user = await User.findOne({ email }).select("+password")

    if (!user) {
        res.status(401)
        throw new Error("Invalid credentials")
    }
    const isMatch = await bcrypt.compare(password, user.password)//first plain password then hashed password

    if (!isMatch) {
        res.status(401)
        throw new Error("Invalid credentials")
    }

    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateJWT(user._id)
    })
})