const Joi = require("joi");

const youtubeEmbedRegex =
  /^https?:\/\/(www\.)?youtube\.com\/embed\/[a-zA-Z0-9_-]+(\?.*)?$/;

const createContentSchema = Joi.object({
  title: Joi.string().min(3).required().messages({
    "string.empty": `"Title" cannot be an empty field`,
    "string.min": `"Title" should have a minimum length of 3 characters`,
    "any.required": `"Title" is a required field`,
  }),
  youtubeUrl: Joi.string()
    .uri()
    .pattern(youtubeEmbedRegex)
    .required()
    .messages({
      "string.empty": `"YouTube URL" cannot be an empty field`,
      "string.uri": `"YouTube URL" must be a valid URL`,
      "string.pattern.base":
        "Invalid YouTube embed URL. It should be in the format: https://www.youtube.com/embed/{VIDEO_ID}",
      "any.required": `"YouTube URL" is a required field`,
    }),
  publiclyViewable: Joi.boolean().optional(),
});

const updateContentSchema = Joi.object({
  title: Joi.string().min(3).optional().messages({
    "string.empty": `"Title" cannot be an empty field`,
    "string.min": `"Title" should have a minimum length of 3 characters`,
  }),
  youtubeUrl: Joi.string()
    .uri()
    .pattern(youtubeEmbedRegex)
    .optional()
    .messages({
      "string.empty": `"YouTube URL" cannot be an empty field`,
      "string.uri": `"YouTube URL" must be a valid URL`,
      "string.pattern.base":
        "Invalid YouTube embed URL. It should be in the format: https://www.youtube.com/embed/{VIDEO_ID}",
    }),
  publiclyViewable: Joi.boolean().optional(),
});

module.exports = { createContentSchema, updateContentSchema };
