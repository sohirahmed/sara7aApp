import nodemailer from 'nodemailer'
import { User } from '../../database/models/user.model.js'


const generateOTP =()=>{
    return Math.floor(100000 + Math.random()* 900000)
}
export const sendOTP = async(email)=>{
    const otp = generateOTP()

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

        await transporter.verify();
    console.log(" Gmail transporter verified successfully!");

    await User.findOneAndUpdate({email} , {otpCode:otp , otpExpire: Date.now() + 5 * 60 *1000 })
    await transporter.sendMail({
    from: `"Sara7aApp🤩" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP Code",
    html: `<h2>Your OTP is: <b style="color:red;">${otp}</b></h2>
            <p>This code will expire in <b>5 minutes</b>.</p>`,
    });
    console.log("OTP sent successfully to:", email);
    
}

