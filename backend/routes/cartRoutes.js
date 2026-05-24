const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const auth = require("../middleware/auth"); // ✅ JWT middleware

// ================= GET CART =================
router.get("/", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId });
    res.json(cart || { items: [], total: 0 });
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart", error: err });
  }
});

// ================= ADD TO CART =================
router.post("/add", auth, async (req, res) => {
  try {
    const { product } = req.body;
    let cart = await Cart.findOne({ userId: req.userId });

    if (!cart) {
      cart = new Cart({
        userId: req.userId,
        items: [{ ...product, quantity: 1 }],
        total: product.price,
      });
    } else {
      const index = cart.items.findIndex((i) => i.productId === product.productId);
      if (index > -1) {
        cart.items[index].quantity += 1;
      } else {
        cart.items.push({ ...product, quantity: 1 });
      }
    }

    cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error adding to cart", error: err });
  }
});

// ================= UPDATE QUANTITY =================
router.put("/update", auth, async (req, res) => {
  try {
    const { productId, action } = req.body;
    const cart = await Cart.findOne({ userId: req.userId });

    const item = cart.items.find((i) => i.productId === productId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (action === "inc") item.quantity += 1;
    if (action === "dec" && item.quantity > 1) item.quantity -= 1;

    cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error updating cart", error: err });
  }
});

// ================= REMOVE ITEM =================
router.post("/remove", auth, async (req, res) => {
  try {
    const { productId } = req.body;
    const cart = await Cart.findOne({ userId: req.userId });

    cart.items = cart.items.filter((i) => i.productId !== productId);
    cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error removing item", error: err });
  }
});

module.exports = router;
