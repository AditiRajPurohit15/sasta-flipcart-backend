const express = require('express')
const {
    createProductController,
    getAllProductsController,
    updateProductController,
    deleteProductController,
    getProductByIdController,
    getMyProductsController,
}= require('../controllers/product.controller')
const uploads = require('../config/multer')
const authMiddleware = require('../middlewares/auth.middlewares')
const roleMiddleware = require("../middlewares/role.middleware")

const router = express.Router()

router.get('/view-product/:id', getProductByIdController)
router.get("/view-product",getAllProductsController)

router.post('/create' , authMiddleware,roleMiddleware(["seller"]), uploads.array("images",5),createProductController)
router.put('/update/:product_id', authMiddleware,roleMiddleware(["seller"]),uploads.array('images', 5),updateProductController)
router.delete('/delete/:product_id', authMiddleware,roleMiddleware(["seller"]), deleteProductController)
router.get("/my-products", authMiddleware, roleMiddleware(["seller"]), getMyProductsController);
router.get('/:id', getProductByIdController),



module.exports = router