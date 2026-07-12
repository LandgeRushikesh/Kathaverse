import express from 'express'
import { protect } from '../middleware/AuthMiddleware.js'
import upload from '../middleware/Upload.js'
import { uploadImage } from '../Controller/UploadController/UploadController.js'

const Router = express.Router()

// Upload file
Router.post("/", protect, upload.single("coverImage"), uploadImage)

// Working -
// protect middleware will verify the token and attaches user object to req
// then upload.single("coverImage") is a middleware which will verify the image type using fileFilter logic we already written then it will store image in RAM temporarily then attach req.file here file is JS object like below
/*
req.file = {
    fieldname: "coverImage",
    originalname: "react.png",
    mimetype: "image/png",
    size: 234567,
    buffer: <Buffer ...> //---> this contains actual image
}
*/

// and then control goes to uploadImage controller and it will upload image to cloudinary

export default Router
