const router = require('express').Router();
const { loginCheck } = require('../middlewares/middlewares');
const { uploader, cloudinary } = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Contact = require('../models/Contact');

// @desc      Send request form
// @route     POST /contact/request
// @access    Private
router.post(
    '/contact/request',
    loginCheck(),

    (req, res, next) => {
        const { description, imageUrl } = req.body;
        // const imgPath = req.file.path;
        // const imgName = req.file.originalname;
        // const publicId = req.file.filename;

        console.log('from /contact', imageUrl, description);

        Contact.create({
            owner: req.user._id,
            description,
            imageUrl,
        })
            .then((message) => {
                console.log('contact form sent', message);
                res.status(201).json({ message: 'message sent' });
            })
            .catch((err) => {
                next(err);
            });
    }
);

// // @desc      Send request form
// // @route     DELETE /contact/img
// // @access    Private
// router.delete('/contact/img', (req, res, next) => {
//     Movie.findByIdAndDelete(req.params.id)
//         .then((image) => {
//             // check if the deleted movie had an image
//             if (image.imgPath) {
//                 // we want to delete the image on cloudinary
//                 cloudinary.uploader.destroy(image.publicId);
//             }
//             res.status(200).json({ message: 'Image deleted' });
//         })
//         .catch((err) => {
//             next(err);
//         });
// });

router.post('/upload', uploader.single('imageUrl'), (req, res, next) => {
    console.log('file is: ', req.file);

    if (!req.file) {
        next(new Error('No file uploaded!'));
        return;
    }
    // get secure_url from the file object and save it in the
    // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend

    res.json({ secure_url: req.file.path });
});

module.exports = router;
module.exports = router;
