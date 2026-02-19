import { User } from "../../Models/UserModel.js"
import asyncHandler from 'express-async-handler'
import generateJWT from "../../utils/generateJWT.js"

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

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateJWT(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error("Invalid User Data")
    }
})

// POST
// @desc Login User
// @route /api/users/login
// @access Public

export const loginUser = (req, res) => {
    try {
        res.status(200).json({ message: "User Logged in Successfully!" })
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}