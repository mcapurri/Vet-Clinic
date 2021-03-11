const { Schema, model } = require('mongoose');

const contactSchema = new Schema(
    {
        description: String,
        imgName: String,
        imgPath: String,
        publicId: String,

        owner: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    {
        timestamps: true,
    }
);
const Contact = model('Contact', contactSchema);

module.exports = Contact;
