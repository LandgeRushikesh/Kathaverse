import express from 'express'
import { loginUser, registerUser } from '../Controller/UserControllers/UserControllers.js';

const Route = express.Router()

Route.post('/register', registerUser)

Route.post('/login', loginUser)

export default Route;

