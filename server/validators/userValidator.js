const Joi = require("@hapi/joi");

const JoiUserRegisterValidation = (userData) => {
  const JoiUserValidator = Joi.object({
    fullName: Joi.string().required().min(3),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(3),
    avatar: Joi.string(),
    accountType: Joi.array().valid("Moderator", "Member"),
  });
  return JoiUserValidator.validate(userData, { abortEarly: false });
};

const JoiUserLoginValidation = (userData) => {
  const JoiUserValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(3),
  });
  return JoiUserValidator.validate(userData, { abortEarly: false });
};

module.exports.JoiUserRegisterValidation = JoiUserRegisterValidation;
module.exports.JoiUserLoginValidation = JoiUserLoginValidation;
