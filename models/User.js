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
            // state: String,
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

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Generate and hash password token
userSchema.methods.getResetPasswordToken = async function (user) {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // Set expire
    resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    this.resetPasswordToken = resetPasswordToken;
    this.resetPasswordExpire = resetPasswordExpire;
    await user.save();

    return resetPasswordToken;
};

userSchema.methods.sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    // send mail with defined transport object
    const message = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    const info = await transporter.sendMail(message);

    console.log('Message sent: %s', info.messageId);
};

// Get token from model, create cookie and send response
userSchema.methods.sendTokenResponse = (user) => {
    console.log('sendtokenResponse running');

    // Create token
    const token = user.getSignedJwtToken(user);

    return token;
};

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function (user) {
    let temp = user || this;
    console.log('getSignedToken running');
    return jwt.sign(
        { email: temp.email, _id: temp._id, role: temp.role },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE,
        }
    );
};

const User = model('User', userSchema);

module.exports = User;
