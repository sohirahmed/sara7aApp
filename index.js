process.on('uncaughtException', (err)=>{
    console.log('error in code ', err);
})

import express from "express";
import { dbConnection } from "./database/dbConnections.js";
import { globalError } from "./src/middleware/globalError.js";
import { AppError } from "./src/utils/appError.js";
import dotenv from "dotenv";
import userRouter from "./src/modules/user/user.routes.js";
import messageRouter from "./src/modules/message/message.routes.js";
dotenv.config({ quiet: true });

const app = express()
const port = 3000
dbConnection()

app.use(express.json())

app.use('/auth' , userRouter)
app.use('/message' , messageRouter)


app.use((req,res,next)=>{
    next(new AppError(`route not found ${req.originalUrl}`, 404))
})

app.use(globalError)

process.on('unhandledRejection', (err)=>{
    console.log('error', err);
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})