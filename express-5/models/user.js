const Joi = require("joi");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 64,
        trim: true
    },
    image: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 64,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        lowercase: true,
    }
});

const User = mongoose.model("users", UserSchema);

const UserValidator = Joi.object({
    fullname: Joi.string()
        .min(2)
        .max(32)
        .trim()
        .required(),

    year: Joi.number()
        .min(0)
        .max(100)
        .required(),


    image: Joi.string()
        .pattern(/\.(jpg|jpeg|png|gif|webp)$/i)
        .required()
        .messages({
            'string.pattern.base': 'Image URL must end with .jpg, .jpeg, .png, .gif, or .webp'
        }),

    email: Joi.string()
        .email()
        .min(5)
        .max(255)
        .required()
        .messages({
            'string.email': 'Email must be a valid email address'
        }),

    password: Joi.string()
        .min(6)
        .max(64)
        .required()
        .messages({
            'string.min': 'Password must be at least 6 characters long',
            'string.max': 'Password must be at most 64 characters long'
        })
});

module.exports = { User, UserValidator };