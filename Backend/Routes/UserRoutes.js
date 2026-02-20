import express from 'express'
import { getMe, loginUser, registerUser } from '../Controller/UserControllers/UserControllers.js';
import { protect } from '../middleware/AuthMiddleware.js';

const Route = express.Router()

// Register User
Route.post('/register', registerUser)

// Login User
Route.post('/login', loginUser)

Route.get("/me", protect, getMe)

export default Route;

