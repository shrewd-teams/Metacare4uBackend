const { required } = require("joi");

const Joi = require("joi").extend(require("@joi/date"));

/**
 * sendOtpSchema
 */
const sendOtpSchema = Joi.object({
    mobile_number: Joi.string()
        .trim()
        .regex(/^[6-9]\d{9}$/)
        .required()
        .messages({
            "string.base": "Mobile number should be a type of string",
            "string.empty": "Mobile number is not allowed to be empty",
            "string.pattern.base": "Mobile number must be 10 digit number",
            "any.required": "Mobile number is a required field",
        }),
    country_code: Joi.string().trim().max(3).required().messages({
        "string.base": "Country code should be a type of string",
        "string.empty": "Country code is not allowed to be empty",
        "any.required": "Country code is a required field",
        "string.max": "Country code should not exceed 3",
    }),
});

/**
 * verifyOtpSchema
 */
const verifyOtpSchema = Joi.object({
    mobile_number: Joi.string()
        .trim()
        .regex(/^[6-9]\d{9}$/)
        .required()
        .messages({
            "string.base": "Mobile number should be a type of string",
            "string.empty": "Mobile number is not allowed to be empty",
            "string.pattern.base": "Mobile number must be 10 digit number",
            "any.required": "Mobile number is a required field",
        }),
    otp: Joi.string()
        .trim()
        .regex(/^[0-9]{6}$/)
        .required()
        .messages({
            "string.base": "OTP should be a type of string",
            "string.empty": "OTP is not allowed to be empty",
            "string.pattern.base": "OTP must be 6 digit number",
            "any.required": "OTP is a required field",
        }),
});

const createProfileSchema = Joi.object({
    first_name: Joi.string().trim().max(25).required().messages({
        "string.base": "First name should be a type of string",
        "string.empty": "First name is not allowed to be empty",
        "string.max": "First name should be maximum 25 characters",
        "any.required": "First name is a required field",
    }),
    last_name: Joi.string().trim().max(25).required().messages({
        "string.base": "Last name should be a type of string",
        "string.empty": "Last name is not allowed to be empty",
        "string.max": "Last name should be maximum 25 characters",
        "any.required": "Last name is a required field",
    }),
    email: Joi.string().min(3).allow("").email().required().messages({
        "string.base": "Email should be a type of string",
        "string.min": "Email should be minimum 20 characters",
        "string.email": "Enter valid email",
        "any.required": "Email is a required field",
    }),
    dob: Joi.date().format("YYYY-MM-DD").required().messages({
        "date.base": "DOB should be a type of date",
        "date.format": "DOB must be in YYYY-MM-DD format",
        "any.required": "DOB is a required field",
    }),
    alternate_mobile_number: Joi.string()
        .regex(/^[6-9]\d{9}$/)
        .allow("")
        .required()
        .messages({
            "string.base": "Mobile number should be a type of string",
            "string.pattern.base": "Mobile number must be 10 digit number",
            "any.required": "Alternate mobile number is a required field",
        }),
    mobile_number: Joi.string()
        .trim()
        .regex(/^[6-9]\d{9}$/)
        .required()
        .messages({
            "string.base": "Mobile number should be a type of string",
            "string.empty": "Mobile number is not allowed to be empty",
            "string.pattern.base": "Mobile number must be 10 digit number",
            "any.required": "Mobile number is a required field",
        }),
    country_code: Joi.string().trim().max(3).required().messages({
        "string.base": "Country code should be a type of string",
        "string.empty": "Country code is not allowed to be empty",
        "any.required": "Country code is a required field",
        "string.max": "Country code should not exceed 3",
    }),
    refercode: Joi.string().regex(/^[1-9]\d{5}$/).allow("").required().messages({
        "string.base": "Refer code should be a type of string",
        "any.required": "Refer code is a required field",
        "string.pattern.base": "Refer code must be 6 digit number",
    }),
});


const verifyRefreshTokenSchema = Joi.object({
    refreshToken: Joi.string().trim().required().messages({
        "string.base": "Refresh token should be a type of string",
        "string.empty": "Refresh token is not allowed to be empty",
        "any.required": "Refresh token is a required field",
    })
});


//Specialist Validation

const VerifySpecialist = Joi.object({
    title: Joi.string().trim().required().messages({
        "string.base": "Title should be a type of string",
        "string.empty": "Title is not allowed to be empty",
        "any.required": "Title is a required field",
    })
});


module.exports = {
    sendOtpSchema,
    verifyOtpSchema,
    createProfileSchema,
    verifyRefreshTokenSchema,
    VerifySpecialist
};
