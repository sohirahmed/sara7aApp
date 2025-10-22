import { User } from "../../database/models/user.model.js"
import { AppError } from "../utils/appError.js"
import bcrypt from "bcrypt"



export const checkEmail = async(req,res,next)=>{
    let userExists =await User.findOne({email:req.body.email})
    if(userExists){
        return next(new AppError('Email already exists', 400))
    }
    let hash = await bcrypt.hash(req.body.password , 10)
    req.body.password = hash
    next()
}