const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection (UPDATED FORMAT)
mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerce")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// ================= SCHEMAS =================
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
});

const OrderSchema = new mongoose.Schema({
  userId: String,
  items: Array,
  total: Number,
  date: String,
});

// ================= MODELS =================
const User = mongoose.model("User", UserSchema);
const Product = mongoose.model("Product", ProductSchema);
const Order = mongoose.model("Order", OrderSchema);

// ================= AUTH ROUTES =================

// REGISTER
app.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ================= PRODUCT ROUTES =================

// GET PRODUCTS
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ⭐ ADD PRODUCT (IMPORTANT FOR ADMIN PANEL)
app.post("/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json({ message: "Product added successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ================= ORDER ROUTES =================

// PLACE ORDER
app.post("/order", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.json({ message: "Order placed successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ORDERS BY USER
app.get("/orders/:userId", async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId });
  res.json(orders);
});

// ================= SERVER =================
app.listen(5000, () =>
  console.log("🚀 Server running on http://localhost:5000")
);
