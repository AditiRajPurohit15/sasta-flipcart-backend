const cacheInstance = require('../services/cache.service')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

const adminMiddleware = async (req, res, next)=>{
    try {
        let token = req.cookies.token
        if(!token){
            return res.status(401).json({message:'token not found'})
        }
        let isblacklisted = cacheInstance.get(token)
        if(!isblacklisted){
            return res.status(401).json({message: 'token blacklisted'})
        }
        let decode = jwt.verify(token, process.env.JWT_SECRET)
        let user = await userModel.findById(decode.id)
        if(!user){
            return res.status(404).json({message: 'user not found'})
        }
        if (!user.isAdmin)
        return res.status(404).json({ message: "Admins only!" });
        req.user = user
        next()
    } catch (error) {
        console.log("Error in adminMiddleware", error.message);
        return res.status(500).json({ message: "Internal server error - Invalid or expired token" });
  
    }
}

module.exports = adminMiddleware