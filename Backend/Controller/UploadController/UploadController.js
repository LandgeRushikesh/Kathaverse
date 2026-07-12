import asyncHandler from 'express-async-handler'
import cloudinary from '../../DB/Cloudinary.js'

export const uploadImage = asyncHandler(async (req, res) => {

    // Multer attaches the uploaded file to req.file.
    // If no file is received, return an error.
    if (!req.file) {
        res.status(400)
        throw new Error("File is required")
    }
    // Upload the file received from Multer to Cloudinary.
    // uploadImageToCloudinary() returns a Promise,
    // so we can await its result.
    const result = await uploadImageToCloudinary(req.file)

    // Return only the URL required by the frontend.
    // The frontend will store this URL in storyData.coverImage
    // and later send it while creating the story.
    res.status(200).json({
        success: true,
        imageUrl: result.secure_url
    })
})

const uploadImageToCloudinary = (file) => {

    // upload_stream() is callback-based.
    // We wrap it inside a Promise so that we can use async/await.
    return new Promise((resolve, reject) => {

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                // Cloudinary automatically creates this folder
                // if it doesn't already exist.
                folder: "KathaVerse",

                // Explicitly specify that only images are uploaded.
                resource_type: "image"
            },

            // This callback executes after Cloudinary finishes uploading.
            (error, result) => {

                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            }
        )

        // Multer (memoryStorage) stores the uploaded image in RAM.
        // The actual image bytes are available in file.buffer.
        // end() sends those bytes to Cloudinary and closes the stream.
        uploadStream.end(file.buffer)
    })
}

// Request Flow:
//
// Client
//   ↓
// protect()                 --> Verifies JWT and attaches req.user
//   ↓
// upload.single("coverImage") --> Parses multipart/form-data,
//                                 validates image type,
//                                 stores image temporarily in RAM,
//                                 attaches req.file
//   ↓
// uploadImage()             --> Uploads image to Cloudinary
//                                 and returns image URL