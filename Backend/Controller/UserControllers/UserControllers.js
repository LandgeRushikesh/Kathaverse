import { User } from "../../Models/UserModel.js"
import bcrypt from 'bcryptjs'

import asyncHandler from 'express-async-handler'

// POST
// @desc Register User
// @route /api/users/register
// @access Public

export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body || {}

    if (!name || !email || !password) {
        res.status(404)
        throw new Error("Add all the fileds")
    }

    const userExits = await User.findOne({ email })

    if (userExits) {
        res.status(409)
        throw new Error("User Already Exits")
    }

    const salt = await bcrypt.genSalt(10)

    const hashPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
        })
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