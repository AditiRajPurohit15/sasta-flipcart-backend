

const roleMiddleware = (allowedRoles = [])=>{
    return (req,res,next)=>{
        try {
            if(!req.user) return res.status(401).json({message: "unauthorized ! no user found"})
            if(!allowedRoles.includes(req.user.role)){
                return res.status(403).json({message: "Access Denied: insufficient permissions"})
            }
            next()
        } catch (error) {
            return res.status(500).json({message: "Internal server error",error: error.message })
        }
    }
}

module.exports = roleMiddleware;