import express from 'express'
import UserRoute from './Routes/UserRoutes.js'
import StoryRoute from "./Routes/StoryRoutes.js"
import ConnectDB from './DB/Config.js';
import { ErrorHandler } from './middleware/ErrorHandler.js';

const app = express()

ConnectDB()

const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// User Routes
app.use('/api/users', UserRoute)

// Story Routes
app.use('/api/stories', StoryRoute)

// Error Handler Middleware
app.use(ErrorHandler)

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})

