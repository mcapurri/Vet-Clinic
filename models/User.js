const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        name: String,
        lastName: String,
        email: String,
        password: String,
        address: {
            street: String,
            zipCode: String,
            city: String,
            state: String,
        },
        phoneNumber: String,
        role: {
            type: String,
            enum: ['client', 'employee'],
            default: 'client',
        },
        position: String,
        pets: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Pet',
            },
        ],
    },
    {
        timestamps: true,
    }
);
const User = model('User', userSchema);

module.exports = User;
