const Joi = require("joi");
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "category",
        required: true,
    },
    count: {
        type: Number,
        default: 0,
        min: 0
    }
});

const Product = mongoose.model("product", ProductSchema)

const ProductValidator = Joi.object({
    title: Joi.string()
        .min(2)
        .max(100)
        .required(),

    image: Joi.string()
        .pattern(/\.(jpg|jpeg|png|gif|webp)$/i)
        .required()
        .messages({
            'string.pattern.base': 'Image URL must end with .jpg, .jpeg, .png, .gif, or .webp'
        }),

    price: Joi.number()
        .min(0)
        .required(),

    category: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),

    count: Joi.number()
        .integer()
        .min(0)
        .default(0)
})

module.exports = { Product, ProductValidator }