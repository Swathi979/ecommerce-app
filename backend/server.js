require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  isAdmin: Boolean,
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
  paymentId: String,
});

const User = mongoose.model("User", UserSchema);
const Product = mongoose.model("Product", ProductSchema);
const Order = mongoose.model("Order", OrderSchema);

app.get("/", (req, res) => res.json({ message: "Backend running!" }));

app.post("/register", async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });
    const user = new User({ name, email, password, isAdmin: isAdmin || false });
    await user.save();
    res.json({ message: "Registered successfully!" });
  } catch (err) {
    console.log("Register error:", err);
    res.status(500).json({ message: "Register failed" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email, password: req.body.password });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

app.post("/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json({ message: "Product added!" });
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted!" });
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

app.post("/order", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.json({ message: "Order placed!" });
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

app.get("/orders/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("🚀 Server running on port", PORT));

