const mongoose = require("mongoose");
const Joi  = require("joi");

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 32,
        trim: true
    },
    image: {
        type: String,
        required: true
    }
});

const Category = mongoose.model("category", CategorySchema)

const CategroyValidator = Joi.object({
    name: Joi.string()
        .min(3)
        .max(32)
        .trim()
        .required(),

    image: Joi.string()
        .uri({ scheme: ['http', 'https'] })
        .required()

})

module.exports = { Category, CategroyValidator }