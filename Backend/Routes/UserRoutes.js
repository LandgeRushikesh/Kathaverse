import express from 'express'
import { loginUser, registerUser } from '../Controller/UserControllers/UserControllers.js';
import { protect } from '../middleware/AuthMiddleware.js';
import { toggleFollowing } from '../Controller/FollowController/FollowController.js';
import optionalAuth from '../middleware/OptionalAuth.js';
import { getProfile } from '../Controller/ProfileController/ProfileController.js';

const Router = express.Router()

// Register User
Router.post('/register', registerUser)

// Login User
Router.post('/login', loginUser)

// Toggle Following
Router.post("/:id/follow", protect, toggleFollowing)

// Get Profile
Router.get("/:id", optionalAuth, getProfile)

export default Router;

