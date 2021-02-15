const { Schema, model } = require('mongoose');

const petSchema = new Schema(
    {
        name: String,
        type: {
            type: String,
            enum: ['dog', 'cat', 'bird', 'reptile', 'other'],
        },
        age: String,
        diagnosis: String,
        treatment: [
            {
                type: String,
            },
        ],
        owner: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    {
        timestamps: true,
    }
);
const Pet = model('Pet', petSchema);

module.exports = Pet;
