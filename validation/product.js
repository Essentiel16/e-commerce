const Joi = require('joi');

const productDetailsSchema = Joi.object({
  productName: Joi.string().min(3).required(),
  description: Joi.string().min(10).required(),
  category: Joi.string().required(),
  size: Joi.string(),
});

const ratingValueSchema = Joi.object({
  rating: Joi.number().integer().less(11).required(),
});

module.exports = { productDetailsSchema, ratingValueSchema };
