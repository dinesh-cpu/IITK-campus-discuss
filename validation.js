const Joi = require('@hapi/joi')
//register validation
const signupValidation = (data) => {
    const schema = {
        name: Joi.string().max(20).required(),
        mobileno: Joi.string().length(10).required(),
        password: Joi.string().max(20).required(),
        email: Joi.string().min(11).required().email().lowercase(),
        rollno: Joi.number().min(6).required()
    }
    return schema.validate(data);
}
const loginValidation = (data) => {
    const schema = {

        password: Joi.string().max(20).required(),
        email: Joi.string().min(11).required().email().lowercase()
    }
    return schema.validate(data);
}
module.exports.signupValidation = signupValidation;
module.exports.loginValidation = loginValidation;
