const Joi = require("joi");

const createContentSchema = Joi.object({
  title: Joi.string().min(3).required().messages({
    "string.empty": `"Title" cannot be an empty field`,
    "string.min": `"Title" should have a minimum length of 3 characters`,
    "any.required": `"Title" is a required field`,
  }),
  youtubeUrl: Joi.string().uri().required().messages({
    "string.empty": `"YouTube URL" cannot be an empty field`,
    "string.uri": `"YouTube URL" must be a valid URL`,
    "any.required": `"YouTube URL" is a required field`,
  }),
  publiclyViewable: Joi.boolean().optional(),
});

const updateContentSchema = Joi.object({
  title: Joi.string().min(3).optional().messages({
    "string.empty": `"Title" cannot be an empty field`,
    "string.min": `"Title" should have a minimum length of 3 characters`,
  }),
  youtubeUrl: Joi.string().uri().optional().messages({
    "string.empty": `"YouTube URL" cannot be an empty field`,
    "string.uri": `"YouTube URL" must be a valid URL`,
  }),
  publiclyViewable: Joi.boolean().optional(),
});

module.exports = { createContentSchema, updateContentSchema };
