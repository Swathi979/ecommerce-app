import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "https://ecommerce-app-production-1ff5.up.railway.app";

const DEFAULT_PRODUCTS = [
  { _id: "1", name: "Shoes", price: 1200, description: "Comfortable everyday shoes", image: "https://images.pexels.com/photos/19090/pexels-photo.jpg" },
  { _id: "2", name: "Running Shoes", price: 1800, description: "High performance running shoes", image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg" },
  { _id: "3", name: "Casual Sneakers", price: 999, description: "Lightweight casual sneakers", image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg" },
  { _id: "4", name: "Backpack", price: 2500, description: "Durable travel backpack", image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg" },
  { _id: "5", name: "T-Shirt", price: 499, description: "Cotton casual t-shirt", image: "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg" },
  { _id: "6", name: "Watch", price: 3500, description: "Stylish analog watch", image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg" },
  { _id: "7", name: "Headphones", price: 2999, description: "Wireless bluetooth headphones", image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg" },
];

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const found = users.find((u) => u.email === email && u.password === password);
    if (found) {
      localStorage.setItem("user", JSON.stringify(found));
      setUser(found);
      setError("");
    } else {
      setError("❌ Invalid credentials. Please register first.");
    }
  };

  return (
    <div style={formCard}>
      <h2 style={{ marginBottom: 16, color: "#1a1a2e" }}>🔐 Login</h2>
      <input style={inputStyle} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input style={inputStyle} placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <p style={{ color: "red", fontSize: 13 }}>{error}</p>}
      <button style={btnGreen} onClick={handleLogin}>Login</button>
    </div>
  );
}

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleRegister = () => {
    if (!name || !email || !password) { setMsg("⚠️ All fields required"); return; }
    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    if (users.find((u) => u.email === email)) { setMsg("⚠️ Email already registered"); return; }
    const newUser = { name, email, password, isAdmin: email === "admin@store.com" };
    users.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(users));
    setMsg("✅ Registered! You can now login.");
    setName(""); setEmail(""); setPassword("");
  };

  return (
    <div style={{ ...formCard, marginTop: 20, background: "#f0f8ff" }}>
      <h2 style={{ marginBottom: 16, color: "#1a1a2e" }}>📝 Register</h2>
      <p style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>💡 Use <strong>admin@store.com</strong> to get Admin access</p>
      <input style={inputStyle} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input style={inputStyle} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input style={inputStyle} placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {msg && <p style={{ color: msg.includes("✅") ? "green" : "red", fontSize: 13 }}>{msg}</p>}
      <button style={btnBlue} onClick={handleRegister}>Register</button>
    </div>
  );
}

function Admin({ products, setProducts, darkMode }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");

  const cardBg = darkMode ? "#1e1e2e" : "#fff";
  const textColor = darkMode ? "#e0e0e0" : "#333";

  const handleAddProduct = async () => {
    if (!name || !price) { setMsg("⚠️ Name & Price required"); return; }
    try {
      await axios.post(`${BASE_URL}/products`, {
        name, price: parseFloat(price),
        image: image || "https://via.placeholder.com/200x150?text=Product",
        description: description || "No description",
      });
      setMsg("✅ Product added!");
      setName(""); setPrice(""); setImage(""); setDescription("");
      const res = await axios.get(`${BASE_URL}/products`);
      setProducts(res.data);
    } catch (err) {
      setMsg("❌ Backend error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/products/${id}`);
      const res = await axios.get(`${BASE_URL}/products`);
      setProducts(res.data);
    } catch (err) {
      alert("❌ Delete failed");
    }
  };

  return (
    <div>
      <h2 style={{ color: darkMode ? "#fff" : "#1a1a2e" }}>🛠 Admin Panel</h2>
      <div style={{ ...formCard, background: cardBg, color: textColor, marginBottom: 24 }}>
        <h3 style={{ marginBottom: 12 }}>➕ Add New Product</h3>
        <input style={{ ...inputStyle, background: darkMode ? "#2a2a3e" : "#fff", color: textColor }} placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input style={{ ...inputStyle, background: darkMode ? "#2a2a3e" : "#fff", color: textColor }} placeholder="Price (₹)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input style={{ ...inputStyle, background: darkMode ? "#2a2a3e" : "#fff", color: textColor }} placeholder="Image URL (optional)" value={image} onChange={(e) => setImage(e.target.value)} />
        <input style={{ ...inputStyle, background: darkMode ? "#2a2a3e" : "#fff", color: textColor }} placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} />
        {msg && <p style={{ color: msg.includes("✅") ? "green" : "red", fontSize: 13 }}>{msg}</p>}
        <button style={btnGreen} onClick={handleAddProduct}>Add Product</button>
      </div>
      <h3 style={{ color: darkMode ? "#fff" : "#1a1a2e" }}>📋 All Products ({products.length})</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 12 }}>
        {products.map((p) => (
          <div key={p._id} style={{ ...productCard, background: cardBg, color: textColor, width: 180 }}>
            <img src={p.image} alt={p.name} style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8 }} />
            <h4 style={{ margin: "8px 0 4px" }}>{p.name}</h4>
            <p style={{ margin: "0 0 8px", color: "#4caf50", fontWeight: "bold" }}>₹{p.price}</p>
            <button onClick={() => handleDelete(p._id)} style={{ ...btnRed, width: "100%", padding: "6px" }}>🗑 Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function RazorpayModal({ total, onSuccess, onClose }) {
  const [cardNum, setCardNum] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [paying, setPaying] = useState(false);
  const [method, setMethod] = useState("card");

  const handlePay = () => {
    if (method === "card" && (!cardNum || !expiry || !cvv)) { alert("⚠️ Fill all card details"); return; }
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      onSuccess("pay_" + Math.random().toString(36).substr(2, 9).toUpperCase());
    }, 2000);
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={{ background: "#3399cc", padding: "14px 20px", borderRadius: "12px 12px 0 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>💳 Razorpay Checkout</span>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#fff", fontSize: 20, cursor: "pointer" }}>✕</button>
        </div>
        <div style={{ padding: "20px" }}>
          <p style={{ margin: "0 0 4px", fontSize: 13, color: "#666" }}>Paying to <strong>My E-Commerce Store</strong></p>
          <h2 style={{ margin: "0 0 16px", color: "#1a1a2e" }}>₹{total}</h2>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            {["card", "upi", "netbanking"].map((m) => (
              <button key={m} onClick={() => setMethod(m)} style={{ padding: "6px 14px", borderRadius: 20, border: "2px solid", borderColor: method === m ? "#3399cc" : "#ddd", background: method === m ? "#e6f2f7" : "#fff", cursor: "pointer" }}>
                {m === "card" ? "💳 Card" : m === "upi" ? "📱 UPI" : "🏦 NetBanking"}
              </button>
            ))}
          </div>
          {method === "card" && (
            <>
              <input style={{ ...inputStyle, marginBottom: 10 }} placeholder="Card Number (16 digits)" maxLength={16} value={cardNum} onChange={(e) => setCardNum(e.target.value.replace(/\D/g, ""))} />
              <div style={{ display: "flex", gap: 10 }}>
                <input style={{ ...inputStyle, flex: 1 }} placeholder="MM/YY" maxLength={5} value={expiry} onChange={(e) => setExpiry(e.target.value)} />
                <input style={{ ...inputStyle, flex: 1 }} placeholder="CVV" maxLength={3} type="password" value={cvv} onChange={(e) => setCvv(e.target.value)} />
              </div>
            </>
          )}
          {method === "upi" && <input style={inputStyle} placeholder="Enter UPI ID (e.g. name@upi)" />}
          {method === "netbanking" && (
            <select style={inputStyle}>
              <option>Select Bank</option>
              <option>State Bank of India</option>
              <option>HDFC Bank</option>
              <option>ICICI Bank</option>
              <option>Axis Bank</option>
            </select>
          )}
          <button onClick={handlePay} disabled={paying} style={{ ...btnBlue, width: "100%", padding: "12px", marginTop: 16, fontSize: 16, opacity: paying ? 0.7 : 1 }}>
            {paying ? "⏳ Processing..." : `Pay ₹${total}`}
          </button>
          <p style={{ textAlign: "center", fontSize: 11, color: "#999", marginTop: 10 }}>🔒 Secured by Razorpay · This is a demo payment</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState("products");
  const [search, setSearch] = useState("");
  const [showRazorpay, setShowRazorpay] = useState(false);
  const [authTab, setAuthTab] = useState("login");
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/products`);
      if (res.data && res.data.length > 0) {
        setProducts(res.data);
      } else {
        setProducts(DEFAULT_PRODUCTS);
      }
    } catch (err) {
      console.log("Backend error:", err);
      setProducts(DEFAULT_PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
    const savedDark = localStorage.getItem("darkMode");
    if (savedDark) setDarkMode(JSON.parse(savedDark));
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    fetchProducts();
  }, []);

  useEffect(() => { localStorage.setItem("cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("wishlist", JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem("orders", JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem("darkMode", JSON.stringify(darkMode)); }, [darkMode]);

  const theme = {
    bg: darkMode ? "#0f0f1a" : "#f4f6fb",
    card: darkMode ? "#1a1a2e" : "#ffffff",
    text: darkMode ? "#e8e8f0" : "#1a1a2e",
    subtext: darkMode ? "#9999bb" : "#666680",
    border: darkMode ? "#2a2a40" : "#e0e4ef",
    input: darkMode ? "#1e1e32" : "#fff",
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (product) => {
    const existing = cart.find((item) => item._id === product._id);
    if (existing) {
      setCart(cart.map((item) => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setPage("cart");
  };

  const addToWishlist = (product) => {
    if (!wishlist.find((item) => item._id === product._id)) {
      setWishlist([...wishlist, product]);
      alert("Added to Wishlist ❤️");
    } else {
      alert("Already in Wishlist!");
    }
  };

  const removeWishlist = (id) => setWishlist(wishlist.filter((item) => item._id !== id));
  const handleIncrement = (id) => setCart(cart.map((item) => item._id === id ? { ...item, quantity: item.quantity + 1 } : item));
  const handleDecrement = (id) => setCart(cart.map((item) => item._id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
  const handleRemove = (id) => setCart(cart.filter((item) => item._id !== id));

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleBuyNow = async (paymentId = null) => {
    const newOrder = {
      userId: user._id || user.email,
      items: [...cart], total,
      date: new Date().toLocaleString(),
      paymentId: paymentId || "COD",
    };
    try {
      await axios.post(`${BASE_URL}/order`, newOrder);
    } catch (err) {
      console.log("Order save error:", err);
    }
    setOrders([...orders, { ...newOrder, id: Date.now() }]);
    setCart([]);
    setShowRazorpay(false);
    setPage("orders");
    alert("🎉 Order placed successfully!" + (paymentId ? `\nPayment ID: ${paymentId}` : ""));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null); setCart([]); setWishlist([]); setOrders([]);
    setPage("products");
  };

  const NavItem = ({ icon, label, count, target }) => (
    <span onClick={() => setPage(target)} style={{ cursor: "pointer", padding: "8px 14px", borderRadius: 20, background: page === target ? "#3399cc" : "transparent", color: page === target ? "#fff" : "inherit", fontWeight: page === target ? "bold" : "normal" }}>
      {icon} {label} {count !== undefined ? `(${count})` : ""}
    </span>
  );

  return (
    <div style={{ background: theme.bg, color: theme.text, minHeight: "100vh", padding: "20px", fontFamily: "'Segoe UI', sans-serif", transition: "0.3s" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 10 }}>
        <h1 style={{ margin: 0, fontSize: 26 }}>🛒 My E-Commerce Store</h1>
        <button onClick={() => setDarkMode(!darkMode)} style={{ ...btnOutline, borderColor: theme.border, color: theme.text, background: theme.card }}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {!user ? (
        <div style={{ maxWidth: 420, margin: "0 auto" }}>
          <div style={{ display: "flex", marginBottom: 20, borderRadius: 12, overflow: "hidden", border: `2px solid ${theme.border}` }}>
            <button onClick={() => setAuthTab("login")} style={{ flex: 1, padding: "12px", border: "none", background: authTab === "login" ? "#3399cc" : theme.card, color: authTab === "login" ? "#fff" : theme.text, fontWeight: "bold" }}>Login</button>
            <button onClick={() => setAuthTab("register")} style={{ flex: 1, padding: "12px", border: "none", background: authTab === "register" ? "#3399cc" : theme.card, color: authTab === "register" ? "#fff" : theme.text, fontWeight: "bold" }}>Register</button>
          </div>
          {authTab === "login" ? <Login setUser={setUser} /> : <Register />}
        </div>
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12, background: theme.card, padding: "14px 20px", borderRadius: 12, border: `1px solid ${theme.border}` }}>
            <div>
              <span style={{ fontWeight: "bold", fontSize: 16 }}>👋 Welcome, {user.name}!</span>
              {user.isAdmin && <span style={{ marginLeft: 10, background: "#ff6b35", color: "#fff", padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: "bold" }}>ADMIN</span>}
            </div>
            <button onClick={handleLogout} style={{ ...btnRed, padding: "8px 16px" }}>Logout</button>
          </div>

          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 24, background: theme.card, padding: "10px 16px", borderRadius: 14, border: `1px solid ${theme.border}` }}>
            <NavItem icon="🏠" label="Home" target="products" />
            <NavItem icon="🛒" label="Cart" count={cartCount} target="cart" />
            <NavItem icon="❤️" label="Wishlist" count={wishlist.length} target="wishlist" />
            <NavItem icon="📦" label="Orders" count={orders.length} target="orders" />
            {user.isAdmin && <NavItem icon="🛠" label="Admin" target="admin" />}
          </div>

          {page === "products" && (
            <>
              <h2 style={{ marginBottom: 16 }}>🛍️ Products</h2>
              <input type="text" placeholder="🔍 Search products..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ ...inputStyle, width: 260, marginBottom: 20, background: theme.input, color: theme.text }} />
              {loading ? (
                <p style={{ color: theme.subtext }}>⏳ Loading products...</p>
              ) : filteredProducts.length === 0 ? (
                <div style={{ textAlign: "center", padding: 40, color: theme.subtext }}>
                  <p style={{ fontSize: 40 }}>🛍️</p>
                  <p>No products found.</p>
                </div>
              ) : (
                <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                  {filteredProducts.map((product) => (
                    <div key={product._id} style={{ ...productCard, background: theme.card, color: theme.text, border: `1px solid ${theme.border}` }}>
                      <img src={product.image} alt={product.name} style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 10, marginBottom: 10 }} />
                      <h3 style={{ margin: "0 0 4px" }}>{product.name}</h3>
                      <p style={{ margin: "0 0 4px", fontSize: 12, color: theme.subtext }}>{product.description}</p>
                      <p style={{ fontWeight: "bold", color: "#4caf50", fontSize: 18, margin: "8px 0" }}>₹{product.price}</p>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => addToCart(product)} style={{ ...btnGreen, flex: 1, fontSize: 13 }}>🛒 Add</button>
                        <button onClick={() => addToWishlist(product)} style={{ background: "#fff0f3", color: "#e91e63", border: "1px solid #f8bbd0", padding: "8px 10px", borderRadius: 8, cursor: "pointer" }}>❤️</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {page === "cart" && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                <h2 style={{ margin: 0 }}>🛒 Cart</h2>
                <button onClick={() => setPage("products")} style={btnOutline}>⬅️ Back</button>
              </div>
              {cart.length === 0 ? (
                <div style={{ textAlign: "center", padding: 60, color: theme.subtext }}>
                  <p style={{ fontSize: 48 }}>🛒</p>
                  <p>Your cart is empty</p>
                  <button onClick={() => setPage("products")} style={btnGreen}>Browse Products</button>
                </div>
              ) : (
                <>
                  {cart.map((item) => (
                    <div key={item._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: theme.card, border: `1px solid ${theme.border}`, padding: 16, marginBottom: 12, borderRadius: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <img src={item.image} alt={item.name} style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 10 }} />
                        <div>
                          <h3 style={{ margin: "0 0 4px" }}>{item.name}</h3>
                          <p style={{ margin: 0, color: "#4caf50", fontWeight: "bold" }}>₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}</p>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                            <button onClick={() => handleDecrement(item._id)} style={qtyBtn}>−</button>
                            <span style={{ fontWeight: "bold", minWidth: 24, textAlign: "center" }}>{item.quantity}</span>
                            <button onClick={() => handleIncrement(item._id)} style={qtyBtn}>+</button>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => handleRemove(item._id)} style={{ ...btnRed, padding: "8px 14px" }}>🗑 Remove</button>
                    </div>
                  ))}
                  <div style={{ background: theme.card, border: `1px solid ${theme.border}`, padding: 20, borderRadius: 12, marginTop: 16 }}>
                    <h2 style={{ margin: "0 0 16px" }}>Total: ₹{total}</h2>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                      <button onClick={() => handleBuyNow()} style={{ ...btnBlue, padding: "12px 24px" }}>📦 Cash on Delivery</button>
                      <button onClick={() => setShowRazorpay(true)} style={{ background: "#3399cc", color: "#fff", border: "none", padding: "12px 24px", borderRadius: 10, cursor: "pointer", fontWeight: "bold" }}>💳 Pay with Razorpay</button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {page === "wishlist" && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                <h2 style={{ margin: 0 }}>❤️ Wishlist</h2>
                <button onClick={() => setPage("products")} style={btnOutline}>⬅️ Back</button>
              </div>
              {wishlist.length === 0 ? (
                <div style={{ textAlign: "center", padding: 60, color: theme.subtext }}>
                  <p style={{ fontSize: 48 }}>❤️</p>
                  <p>Your wishlist is empty</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                  {wishlist.map((item) => (
                    <div key={item._id} style={{ ...productCard, background: theme.card, color: theme.text, border: `1px solid ${theme.border}` }}>
                      <img src={item.image} alt={item.name} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 10, marginBottom: 10 }} />
                      <h3 style={{ margin: "0 0 4px" }}>{item.name}</h3>
                      <p style={{ fontWeight: "bold", color: "#4caf50", margin: "6px 0 12px" }}>₹{item.price}</p>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => addToCart(item)} style={{ ...btnGreen, flex: 1 }}>🛒 Add to Cart</button>
                        <button onClick={() => removeWishlist(item._id)} style={{ ...btnRed, padding: "8px 10px" }}>🗑</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {page === "orders" && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                <h2 style={{ margin: 0 }}>📦 My Orders</h2>
                <button onClick={() => setPage("products")} style={btnOutline}>⬅️ Back</button>
              </div>
              {orders.length === 0 ? (
                <div style={{ textAlign: "center", padding: 60, color: theme.subtext }}>
                  <p style={{ fontSize: 48 }}>📦</p>
                  <p>No orders yet</p>
                </div>
              ) : (
                [...orders].reverse().map((order, index) => (
                  <div key={order.id || index} style={{ background: theme.card, border: `1px solid ${theme.border}`, padding: 20, marginBottom: 16, borderRadius: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                      <div>
                        <p style={{ margin: 0, fontWeight: "bold", fontSize: 15 }}>📅 {order.date}</p>
                        <p style={{ margin: "4px 0 0", fontSize: 12, color: theme.subtext }}>Payment: {order.paymentId === "COD" ? "💵 Cash on Delivery" : `✅ ${order.paymentId}`}</p>
                      </div>
                      <span style={{ background: "#e8f5e9", color: "#2e7d32", padding: "4px 14px", borderRadius: 20, fontWeight: "bold", fontSize: 13 }}>✅ Delivered</span>
                    </div>
                    {order.items.map((item, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${theme.border}` }}>
                        <span>{item.name} × {item.quantity}</span>
                        <span style={{ fontWeight: "bold" }}>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontWeight: "bold", fontSize: 18 }}>
                      <span>Total</span>
                      <span style={{ color: "#4caf50" }}>₹{order.total}</span>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {page === "admin" && user.isAdmin && <Admin products={products} setProducts={setProducts} darkMode={darkMode} />}
          {page === "admin" && !user.isAdmin && (
            <div style={{ textAlign: "center", padding: 60, color: "red" }}>
              <p style={{ fontSize: 48 }}>🚫</p>
              <p>Access Denied. Admin only.</p>
            </div>
          )}
        </>
      )}

      {showRazorpay && (
        <RazorpayModal total={total} onSuccess={(paymentId) => handleBuyNow(paymentId)} onClose={() => setShowRazorpay(false)} />
      )}
    </div>
  );
}

const inputStyle = { display: "block", width: "100%", padding: "10px 14px", marginBottom: 12, borderRadius: 8, border: "1px solid #ccd0e0", fontSize: 14, boxSizing: "border-box", outline: "none" };
const formCard = { background: "#fff", padding: 24, borderRadius: 14, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" };
const productCard = { padding: 16, borderRadius: 14, width: 210, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "0.2s" };
const btnGreen = { background: "#4caf50", color: "#fff", border: "none", padding: "9px 16px", borderRadius: 8, cursor: "pointer", fontWeight: "bold", fontSize: 14 };
const btnBlue = { background: "#1976d2", color: "#fff", border: "none", padding: "9px 16px", borderRadius: 8, cursor: "pointer", fontWeight: "bold", fontSize: 14 };
const btnRed = { background: "#e53935", color: "#fff", border: "none", padding: "9px 16px", borderRadius: 8, cursor: "pointer", fontWeight: "bold", fontSize: 14 };
const btnOutline = { background: "transparent", border: "1px solid #ccd0e0", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontSize: 14 };
const qtyBtn = { background: "#e8eaf6", border: "none", width: 30, height: 30, borderRadius: 6, cursor: "pointer", fontSize: 18, fontWeight: "bold" };
const overlayStyle = { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 };
const modalStyle = { background: "#fff", borderRadius: 14, width: 400, maxWidth: "95vw", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", overflow: "hidden" };
