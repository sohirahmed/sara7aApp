import { Router } from "express";
import { signin, signup, verifyEmail, verifyOTP } from "./user.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";
import { validate } from "../../middleware/validate.js";
import { signInVal, signUpVal, verifyOTPVal } from "./user.validation.js";
const userRouter = Router()

userRouter.post ('/signup' ,validate(signUpVal), checkEmail ,signup)
userRouter.post('/signin' ,validate(signInVal), signin)
userRouter.get('/verify/:token', verifyEmail);
userRouter.post('/verifyOTP' ,validate(verifyOTPVal), verifyOTP)



export default userRouter