const Joi = require("joi");

module.exports.foodSchema = Joi.object({
  food: Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required().min(0),
    rating: Joi.number().required().min(0),
    category: Joi.string().required(),
    type: Joi.string().required(),
  }).required(),
  deleteImages: Joi.array(),
});
