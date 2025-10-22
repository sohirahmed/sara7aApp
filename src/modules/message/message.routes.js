import { Router } from "express";
import { sendMessage } from "./message.controller.js";
import { sendMessageVal } from "./message.validation.js";
import { validate } from "../../middleware/validate.js";
import { getMessages } from "./message.controller.js";
import { deleteMessage } from "./message.controller.js";
import { verifyToken } from "../../middleware/verifyToken.js";

const messageRouter = Router()

messageRouter.post("/send", validate(sendMessageVal), sendMessage);
messageRouter.get("/", verifyToken, getMessages);
messageRouter.delete("/:id", verifyToken, deleteMessage); 


export default messageRouter