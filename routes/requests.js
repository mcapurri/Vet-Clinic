const router = require('express').Router();
const { loginCheck } = require('../middlewares/loginCheck');
const { uploader, cloudinary } = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Contact = require('../models/Contact');
const User = require('../models/User');

// @desc      Get all requests
// @route     GET /requests
// @access    Private
router.get(
    '/requests',
    // loginCheck(),
    (req, res, next) => {
        Contact.find()
            .populate('sender')
            .then((requests) => {
                console.log('requests', requests);

                res.status(200).json(requests);
            })
            .catch((err) => {
                console.log(err);
                next(err);
            });
    }
);

// @desc      Send req form
// @route     POST /requests/new
// @access    Private
router.post(
    '/requests/new',
    // loginCheck(),

    (req, res, next) => {
        const {
            userMessage,
            imageUrl,
            sender,
            // appointment,
            // homeService,
            coords,
        } = req.body;

        console.log(
            'from /requests',
            userMessage,
            sender,
            imageUrl,
            // appointment,
            // homeService,
            coords
        );

        Contact.create({
            userMessage,
            imageUrl,
            sender,
            // appointment,
            // homeService,
            coords,
        })
            .then((message) => {
                console.log('request form sent', message);
                res.status(201).json({ message: 'message sent' });
            })
            .catch((err) => {
                res.status(400).json({ message: 'message not sent' });
                next(err);
            });
    }
);

// // @desc      Upload image
// // @route     POST /upload
// // @access    Private
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

module.exports = router;
