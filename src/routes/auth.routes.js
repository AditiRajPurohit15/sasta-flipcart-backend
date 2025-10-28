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
    if(!req.user){
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({user: req.user})
})
router.post('/logout', logoutController);
router.post('/forgot-password', forgotPasswordController);
router.get('/reset-password/:token',resetPasswordContoller);
router.post('/update-password/:id', updatePasswordController)


module.exports = router