const express = require("express")
const authMiddleware  = require("../middlewares/auth.middlewares")
const adminMiddleware = require("../middlewares/admin.middleware")
const {getAllUsersController, getAllProductsController, deleteProductController} = require("../controllers/admin.controllers");

const router = express.Router()

router.get("/users",adminMiddleware,getAllUsersController)
router.get("/products",adminMiddleware,getAllProductsController )
router.delete("/delete-product/:product_id",adminMiddleware,deleteProductController)

module.exports = router;