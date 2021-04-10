const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_Name,
    api_key: process.env.CLOUDINARY_Key,
    api_secret: process.env.CLOUDINARY_Secret,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'patients-images',
        allowed_formats: 'jpg, png',
    },
});

const uploader = multer({ storage });

module.exports = { uploader, cloudinary };
