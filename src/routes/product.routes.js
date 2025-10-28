const express = require('express')
const {
    createProductController,
    getAllProductsController,
    updateProductController,
    deleteProductController,
}= require('../controllers/product.controller')
const uploads = require('../config/multer')
const authMiddleware = require('../middlewares/auth.middlewares')

const router = express.Router()

router.post('/create' , authMiddleware, uploads.array("images",5),createProductController)
router.get("/view-product",getAllProductsController)
router.put('/update/:product_id', authMiddleware,uploads.array('images', 5),updateProductController)
router.delete('/delete/:product_id', authMiddleware, deleteProductController)

module.exports = router