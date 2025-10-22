import Joi from "joi"

export const signUpVal = Joi.object({
    username: Joi.string().min(2).max(20).required(),
    email: Joi.string().pattern(/^[a-zA-Z0-9_.]{3,200}@(gmail|yahoo)\.com$/).required(),
    password: Joi.string().pattern(/^[A-Z][A-Za-z0-9]{8,40}$/).message("password must be matched").required(),
    rePassword: Joi.valid(Joi.ref('password')).required(),
})

export const signInVal = Joi.object({
    email: Joi.string().pattern(/^[a-zA-Z0-9_.]{3,200}@(gmail|yahoo)\.com$/).required(),
    password: Joi.string().pattern(/^[A-Z][A-Za-z0-9]{8,40}$/).message("password must be matched").required(),
})

export const verifyOTPVal = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().pattern(/^[0-9]{6}$/).message("OTP must be 6 digits").required(),
});