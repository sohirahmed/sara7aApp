import Joi from "joi";

export const sendMessageVal = Joi.object({
    content: Joi.string().min(2).max(500).required(),
    receiverId: Joi.string().hex().length(24).required(),
});