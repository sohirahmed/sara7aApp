import mongoose, { model, Schema } from "mongoose";


export const messageSchema = new Schema({
    content:{
        type:String,
        required: true
    },
    receiverId:{
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: true
    }
},{ timestamps: true, versionKey: false })

export const Message = model('Message' , messageSchema) 