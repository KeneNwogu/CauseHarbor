import multer from "multer";


// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {  
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Create the multer instance
const upload = multer({ limits: { fileSize: 5000000 } });

export default upload;