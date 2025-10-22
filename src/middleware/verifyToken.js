import jwt from 'jsonwebtoken'

export const verifyToken = async(req,res,next)=>{
    let [key , token] = req.headers.authorization.split(' ')
    if(key=="bearer"){
            jwt.verify(token, process.env.JWT_SECRET ,async(err,decoded)=>{
        if(err) return next (new AppError("Invalid token", 401))
            req.user = decoded
        next()
    })
    }


}