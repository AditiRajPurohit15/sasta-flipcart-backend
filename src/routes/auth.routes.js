const express = require('express')
const {
    registerController,
    loginController,
    logoutController,
    forgotPasswordController,
    updatePasswordController,
    resetPasswordContoller
}= require("../controllers/auth.controllers")
const authMiddleware = require('../middlewares/auth.middlewares')

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/me',authMiddleware, (req,res)=>{
    try {
        if(!req.user){
        return res.status(404).json({ message: "User not found" });
    }
    const {_id,fullname,email,role}= req.user
    return res.status(200).json({ 
        message: "User authenticated",
        user: { _id, fullname, email, role },
    })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
})
router.post('/logout', logoutController);
router.post('/forgot-password', forgotPasswordController);
router.get('/reset-password/:token',resetPasswordContoller);
router.post('/update-password/:id', updatePasswordController)


module.exports = router