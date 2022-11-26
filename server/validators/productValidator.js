const Joi = require("@hapi/joi");

const JoiProductRegisterValidation = (productData) => {
  const JoiProductValidator = Joi.object({
    name: Joi.string().required().min(3),
    veg: Joi.boolean(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    quantity: Joi.number(),
    img: Joi.string().min(3).required(),
  });
  return JoiProductValidator.validate(productData, { abortEarly: false });
};

module.exports.JoiProductRegisterValidation = JoiProductRegisterValidation;
