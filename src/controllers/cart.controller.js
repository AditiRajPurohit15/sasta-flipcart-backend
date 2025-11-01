const Cart = require("../models/cart.model");

// 🧠 Get cart for logged-in user
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate("items.product");

    if (!cart) {
      return res.json({ items: [] });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching cart",
      error,
    });
  }
};

// ➕ Add item to user's cart
const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });

    // If user has no cart, create one
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if product already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItemIndex >= 0) {
      // Increment quantity if already added
      cart.items[existingItemIndex].quantity += 1;
    } else {
      // Add new product
      cart.items.push({ product: productId });
    }

    await cart.save();
    res.json({ message: "Item added to cart", cart });
  } catch (error) {
    res.status(500).json({
      message: "Error adding to cart",
      error,
    });
  }
};

// ❌ Remove a specific item from cart
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    res.json({ message: "Item removed", cart });
  } catch (error) {
    res.status(500).json({
      message: "Error removing item",
      error,
    });
  }
};

// 🧹 Optional — clear cart
const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user._id });
    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({
      message: "Error clearing cart",
      error,
    });
  }
};

module.exports = { getCart, addToCart, removeFromCart, clearCart };
