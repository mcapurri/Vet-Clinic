const { Schema, model } = require('mongoose');

const petSchema = new Schema(
    {
        name: String,
        specie: {
            type: String,
            enum: ['dog', 'cat', 'bird', 'reptile', 'other'],
        },
        breed: String,
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
