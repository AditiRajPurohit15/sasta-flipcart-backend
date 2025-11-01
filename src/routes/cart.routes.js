const express = require("express");
const router = express.Router();
const { getCart, addToCart, removeFromCart, clearCart } = require("../controllers/cart.controller");
const authMiddleware = require("../middlewares/auth.middlewares");

router.get("/", authMiddleware, getCart);
router.post("/add", authMiddleware, addToCart);
router.delete("/:productId", authMiddleware, removeFromCart);
router.delete("/", authMiddleware, clearCart);

module.exports = router;
