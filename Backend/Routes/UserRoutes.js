import express from 'express'
import { loginUser, registerUser } from '../Controller/UserControllers/UserControllers.js';

const Route = express.Router()

// Register User
Route.post('/register', registerUser)

// Login User
Route.post('/login', loginUser)

export default Route;

