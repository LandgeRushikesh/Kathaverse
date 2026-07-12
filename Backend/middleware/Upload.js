import multer from "multer";

// memoryStorage():
// ----------------
// Stores uploaded files temporarily in RAM instead of saving them
// to the server's disk. This is suitable because we immediately
// upload the image to Cloudinary and don't need a local copy.
const storage = multer.memoryStorage()//memory storage stores image in a RAM before we upload it to cloudinary it also has diskStorage() which helps us to store image/files/video to disk but we need to manually delete them after upload
// Stores uploaded files temporarily in RAM.
// Useful when files are immediately uploaded to Cloudinary,
// so we don't need to save them on the server's disk.

const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp"
]

const fileFilter = (req, file, cb) => {// this is used to filter files as now we are just taking images and file someone upload anyother file like video's or some viruses then it will filter them out
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error("Only image files are allowed."));
    }
}

const upload = multer({
    storage,
    fileFilter
})

export default upload;