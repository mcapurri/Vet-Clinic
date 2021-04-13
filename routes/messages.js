const router = require('express').Router();
const { loginCheck } = require('../middlewares/loginCheck');
const { uploader, cloudinary } = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Message = require('../models/Message');
const User = require('../models/User');

// @desc      Get all messages
// @route     GET /messages
// @access    Private
router.get(
    '/messages',
    // loginCheck(),
    (req, res, next) => {
        Message.find()
            .populate('sender')
            .then((messages) => {
                console.log('messages', messages);

                res.status(200).json(messages);
            })
            .catch((err) => {
                console.log(err);
                next(err);
            });
    }
);

// @desc      Get single message
// @route     GET /messages/:id
// @access    Private
router.get(
    '/messages/:id',
    // loginCheck(),
    (req, res, next) => {
        const { id } = req.params;
        console.log('id', id);

        Message.find({ _id: id })
            .populate('sender')
            .then((message) => {
                console.log('message', message);

                res.status(200).json(message);
            })
            .catch((err) => {
                console.log(err);
                next(err);
            });
    }
);

// @desc      Send req form
// @route     POST /messages/new
// @access    Private
router.post(
    '/messages/new',
    // loginCheck(),

    (req, res, next) => {
        const {
            userMessage,
            imageUrl,
            id,
            appointment,
            homeService,
            address,
        } = req.body;

        console.log(
            'from /messages',
            userMessage,
            id,
            imageUrl,
            appointment,
            homeService,
            address
        );
        homeService
            ? Message.create({
                  userMessage: userMessage,
                  imageUrl: imageUrl,
                  sender: id,
                  address: {
                      street: address.street,
                      city: address.city,
                      zipCode: address.zipCode,
                  },
                  homeService,
              })
                  .then((message) => {
                      console.log('message form sent', message);
                      res.status(201).json({ message: 'message sent' });
                  })
                  .catch((err) => {
                      res.status(400).json({ message: 'message not sent' });
                      next(err);
                  })
            : Message.create({
                  imageUrl: imageUrl,
                  sender: id,
                  appointment: appointment,
                  userMessage: userMessage,
                  homeService,
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

// // @desc      Send message form
// // @route     DELETE /Message/img
// // @access    Private
router.delete('/messages/delete/:id', (req, res, next) => {
    Message.findByIdAndDelete(req.params.id)
        .then((avatar) => {
            // check if the deleted movie had an image
            if (avatar.imgPath) {
                // we want to delete the image on cloudinary
                cloudinary.uploader.destroy(avatar.publicId);
            }
            res.status(200).json({ message: 'Image deleted' });
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;
