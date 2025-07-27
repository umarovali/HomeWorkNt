const Joi = require("joi");
const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 32,
        trim: true
    },
    image: {
        type: String,
        required: true
    }
})

const Category = mongoose.model("category", CategorySchema);

const CategroyValidator = Joi.object({
    name: Joi.string()
        .min(2)
        .max(32)
        .trim()
        .required(),

    image: Joi.string()
        .pattern(/\.(jpg|jpeg|png|gif|webp)$/i)
        .required()
        .messages({
            'string.pattern.base': 'Image URL must end with .jpg, .jpeg, .png, .gif, or .webp'
        })
})

module.exports = { Category, CategroyValidator }