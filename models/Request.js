const { Schema, model } = require('mongoose');

const requestSchema = new Schema(
    {
        userMessage: String,
        imageUrl: String,
        sender: { type: Schema.Types.ObjectId, ref: 'User' },
        address: {
            street: String,
            city: String,
            zipCode: String,
        },
        appointment: Date,
    },
    {
        timestamps: true,
    }
);
const Request = model('Contact', requestSchema);

module.exports = Request;
