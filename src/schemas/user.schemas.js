const Joi = require("joi");

const userUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional().messages({
    "string.empty": `"Name" cannot be an empty field`,
    "string.min": `"Name" should have a minimum length of 3 characters`,
  }),
  email: Joi.string().email().optional().messages({
    "string.empty": `"Email" cannot be an empty field`,
    "string.email": `"Email" must be a valid email`,
  }),
  bio: Joi.string().optional(),
});

module.exports = { userUpdateSchema };
