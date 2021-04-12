const { Schema, model } = require('mongoose');

const messageSchema = new Schema(
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
const Message = model('Contact', messageSchema);

module.exports = Message;
