const Joi = require('joi');

const signupSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
});

const loginSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(5).required(),
});

module.exports = { signupSchema, loginSchema };
