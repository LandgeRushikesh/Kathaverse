import express from 'express'
import UserRoute from './Routes/UserRoutes.js'
import StoryRoute from "./Routes/StoryRoutes.js"
import CommentRoute from "./Routes/CommentRoutes.js"
import uploadRoute from "./Routes/UploadRoutes.js"
import ConnectDB from './DB/Config.js';
import cors from "cors"
import { ErrorHandler } from './middleware/ErrorHandler.js';

const app = express()

ConnectDB()

const PORT = process.env.PORT || 8000

app.use(express.json())// this is a global middleware it parse each request whose content-type is application/json
// it converts json string sent from frontend into JSON Object (axios automatically converts req.body(JSON object) to JSON string).
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// User Routes
app.use('/api/users', UserRoute)

// Story Routes
app.use('/api/stories', StoryRoute)

// Comment Routes
app.use('/api/comments', CommentRoute)

// Upload Routes
app.use('/api/upload', uploadRoute)

// Error Handler Middleware
app.use(ErrorHandler)

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})

