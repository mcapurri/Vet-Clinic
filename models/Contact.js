const { Schema, model } = require('mongoose');

const contactSchema = new Schema(
    {
        userMessage: String,
        // imgName: String,
        // imgPath: String,
        // publicId: String,
        imageUrl: String,

        sender: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    {
        timestamps: true,
    }
);
const Contact = model('Contact', contactSchema);

module.exports = Contact;
