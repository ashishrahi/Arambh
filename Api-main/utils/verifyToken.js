const jwt = require('jsonwebtoken')
const createError = require('../utils/error')

const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401,"You are not authenticated!"))
    }
    
    jwt.verify(token,"sdfsdf",(err,user)=>{
        if(err){
            return next(createError(401,"Token is not valid!"))
            req.user = user;
        }
        req.user = user;
        next();
    })
}

module.exports = verifyToken;