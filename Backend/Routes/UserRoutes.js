import express from 'express'
import { loginUser, registerUser } from '../Controller/UserControllers/UserControllers.js';
import { protect } from '../middleware/AuthMiddleware.js';
import { toggleFollowing } from '../Controller/FollowController/FollowController.js';

const Router = express.Router()

// Register User
Router.post('/register', registerUser)

// Login User
Router.post('/login', loginUser)

// Toggle Following
Router.post("/:id/follow", protect, toggleFollowing)

export default Router;

