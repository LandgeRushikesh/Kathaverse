import express from 'express'
import Route from './Routes/UserRoutes.js'
import ConnectDB from './DB/Config.js';
import { ErrorHandler } from './middleware/ErrorHandler.js';

const app = express()

ConnectDB()

const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/users', Route)
app.use(ErrorHandler)

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})

