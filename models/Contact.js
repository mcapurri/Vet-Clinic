const { Schema, model } = require('mongoose');

const contactSchema = new Schema(
    {
        userMessage: String,
        imageUrl: String,
        sender: { type: Schema.Types.ObjectId, ref: 'User' },
        appointment: Date,
        homeService: Boolean,
    },
    {
        timestamps: true,
    }
);
const Contact = model('Contact', contactSchema);

module.exports = Contact;
