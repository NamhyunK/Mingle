const Joi = require("joi");
const createError = require("http-errors");
const userCreateValidation = (req, res, next) => {
	const schema = Joi.object({
		userEmail: Joi.string().email(),
		userPassword: Joi.string(), 
		userNickname: Joi.string().required(), 
		userPreference: Joi.array().items(Joi.string()), 
		userDescription: Joi.string(), 
		userImage: Joi.string(), 
		userFollow: Joi.array().items(Joi.string()),
	});
	
	const { error } = schema.validate(req.body);
	if (error) {

		throw createError(400, error.details[0].message);
	}
	next();
};

const userUpdateValidation = (req, res, next) => {
	const schema = Joi.object({
		userPassword: Joi.string(), 
		userNickname: Joi.string(), 
		userPreference: Joi.array().items(Joi.string()), 
		userDescription: Joi.string(), 
		userImage: Joi.string(), 
		userFollow: Joi.array().items(Joi.string()),
	});

	const { error } = schema.validate(req.body);
	if (error) {
		throw createError(400, error.details[0].message);
	}
	next();
};

module.exports = { userCreateValidation, userUpdateValidation };
