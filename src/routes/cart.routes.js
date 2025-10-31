const express = require("express");
const router = express.Router();
const { addToCart, getCart, removeFromCart } = require("../controllers/cart.controller");
const authMiddleware = require("../middlewares/auth.middlewares");

router.post("/add", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
router.delete("/:productId", authMiddleware, removeFromCart);

module.exports = router;
