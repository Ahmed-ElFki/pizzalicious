const Joi = require("@hapi/joi");

const JoiCommentValidation = (commentData) => {
  const commentValidator = Joi.object({
    userId: Joi.string().required().min(3),
    productId: Joi.string().required().min(3),
    comment: Joi.string().required().min(3),
    rating: Joi.number(),
  });
  return commentValidator.validate(commentData, { abortEarly: false });
};

module.exports.JoiCommentValidation = JoiCommentValidation;
