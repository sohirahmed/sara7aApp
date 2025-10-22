import { User } from "../../../database/models/user.model.js"
import { sendOTP } from "../../email/sendOTP.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/appError.js"


export const signup = catchError(async(req,res,next)=>{
    let user = await User.create(req.body)
    user.password = undefined
    await sendOTP(req.body.email)
    res.status(201).json({message:"User created successfully", user})
})

export const signin = catchError(async(req,res,next)=>{
    let user = await User.findOne({email:req.body.email})
    if(!user || !bcrypt.compareSync(req.body.password , user.password)){
        return next(new AppError('Invalid email or password' , 400))
    }else{
        jwt.sign({userId:user._id , name:user.username },
            process.env.JWT_SECRET,(err , token)=>{
                res.status(200).json({message:"User logged in successfully" , token})
            }
        )
    }
})

export const verifyEmail = catchError(async (req, res, next) => {
    const { token } = req.params;
    jwt.verify(token, process.env.EMAIL_TOKEN_SECRET, async (err, payload) => {
        if(err) return next(new AppError("Invalid or expired token", 400))
        await User.findOneAndUpdate(
            { email: payload.email },
            { confirmEmail: true }
        );
        return res.status(200).json({ message: "Email verified successfully", email: payload.email });
    });
})

export const verifyOTP = catchError(async(req,res,next)=>{
    const {email , otp} = req.body
    const user = await User.findOne({email})
    if(!user) return next (new AppError("User not found", 404))
    if(user.otpCode !== otp) return next (new AppError("Invalid OTP", 401))
    if (user.otpExpire < Date.now()) return next (new AppError("OTP expired", 400))
    user.confirmEmail = true;
    user.otpCode = null;
    user.otpExpire = null;
    await user.save();
    
    res.status(200).json({ message: "Email verified successfully" });

})