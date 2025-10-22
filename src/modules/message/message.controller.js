import { User } from "../../../database/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";
import { Message } from "../../../database/models/message.model.js";



export const sendMessage = catchError(async(req,res,next)=>{
    const {content , receiverId} = req.body
    const receiver = await User.findById(receiverId)
    if(!receiver) return next(new AppError("Receiver not found", 404))
    const message = await Message.create({content , receiverId})
    res.status(201).json({message:"Message sent successfully" , message})
})

export const getMessages = catchError(async(req,res,next)=>{
    const messages = await Message.find({receiverId: req.user.userId})
    res.status(200).json({message:"Your messages" , messages})
})

export const deleteMessage = catchError(async (req, res, next) => {
    const message = await Message.findById(req.params.id);
    if (!message) return next(new AppError("Message not found", 404));

    if (message.receiverId.toString() !== req.user.userId)
        return next(new AppError("Not authorized to delete this message", 403));

    await Message.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Message deleted successfully" });
});
