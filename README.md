# 🛒 Full Stack MERN E-Commerce App

A modern, fully functional e-commerce web application built with React.js, Node.js, Express.js, and MongoDB.

---

## 🌐 Live Demo

| Platform | Link |
|----------|------|
| **Frontend (Netlify)** | [https://whimsical-marshmallow-17c47c.netlify.app](https://whimsical-marshmallow-17c47c.netlify.app) |
| **Backend (Railway)** | [https://ecommerce-app-production-1ff5.up.railway.app](https://ecommerce-app-production-1ff5.up.railway.app) |
| **GitHub Repository** | [https://github.com/Swathi979/ecommerce-app](https://github.com/Swathi979/ecommerce-app) |

---

## ✨ Features

### 👤 User Features
- ✅ **User Registration** - Create account with email & password
- ✅ **User Login** - Secure login with localStorage persistence
- ✅ **Browse Products** - View 7 default products with images & descriptions
- ✅ **Shopping Cart** - Add/remove products, update quantities
- ✅ **Wishlist** - Save favorite products for later
- ✅ **Order Management** - Place orders & view order history
- ✅ **Payment Integration** - Dummy Razorpay payment gateway
- ✅ **Dark Mode** - Toggle between light and dark themes

### 🛠 Admin Features
- ✅ **Add Products** - Add new products with image, price, description
- ✅ **Delete Products** - Remove products from database
- ✅ **Product Management** - View all products in admin panel
- ✅ **Database Integration** - All changes reflected in MongoDB

---

## 🛠 Tech Stack

### Frontend
```
✓ React.js - UI Framework
✓ Axios - HTTP Client for API calls
✓ localStorage - Client-side data persistence
✓ CSS - Inline Styling
```

### Backend
```
✓ Node.js - JavaScript Runtime
✓ Express.js - Web Framework
✓ MongoDB - NoSQL Database
✓ Mongoose - MongoDB ODM
```

### Deployment
```
✓ Netlify - Frontend hosting
✓ Railway - Backend hosting
✓ MongoDB Atlas - Cloud database
```

---

## 📂 Project Structure

```
ecommerce-app/
│
├── frontend/                          # React Application
│   ├── src/
│   │   ├── App.js                    # Main component (all logic)
│   │   ├── index.js                  # Entry point
│   │   └── index.css                 # Global styles
│   ├── public/                       # Static files
│   ├── package.json                  # Dependencies
│   └── node_modules/                 # Installed packages
│
├── backend/                           # Node.js Server
│   ├── server.js                     # Main server file
│   ├── .env                          # Environment variables
│   ├── package.json                  # Dependencies
│   └── node_modules/                 # Installed packages
│
├── .git/                             # Version control
├── .gitignore                        # Files to ignore
└── README.md                         # Documentation

```

---

## 🚀 Installation Guide

### Prerequisites
- Node.js installed ([Download](https://nodejs.org/))
- Git installed ([Download](https://git-scm.com/))
- MongoDB Atlas account ([Sign up](https://www.mongodb.com/cloud/atlas))

### Step 1: Clone Repository

```bash
git clone https://github.com/Swathi979/ecommerce-app.git
cd ecommerce-app
```

### Step 2: Install Frontend Dependencies

```bash
cd frontend
npm install
```

This downloads all React packages (React, Axios, etc.)

### Step 3: Install Backend Dependencies

```bash
cd ../backend
npm install
```

This downloads all server packages (Express, Mongoose, etc.)

### Step 4: Setup MongoDB Connection

**Create `.env` file in `backend/` folder:**

```env
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ecommerce?appName=Cluster0
PORT=5000
```

**How to get MONGO_URI:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create a cluster
4. Click "Connect" → "Connect your application"
5. Copy connection string and replace `username:password`

---

## ▶ How to Run

### Start Backend Server

```bash
cd backend
node server.js
```

**Expected Output:**
```
🚀 Server running on port 5000
✅ MongoDB Connected
```

### Start Frontend Application

**Open new terminal and run:**

```bash
cd frontend
npm start
```

**Expected Output:**
```
Compiled successfully!
You can now view frontend in the browser.
Local: http://localhost:3000
```

App automatically opens at `http://localhost:3000` ✅

---

## 📖 How It Works

### User Registration & Login Flow

```
1. User clicks "Register" tab
2. Enters: Name, Email, Password
3. Data stored in browser (localStorage)
4. User logs in with Email & Password
5. Data retrieved from localStorage
6. ✅ Access granted to app
```

**Why localStorage?**

- Fast (no server call needed)
- Data persists after page refresh
- Perfect for demo applications
- Simple to implement

---

## 🔐 User Credentials for Testing

### Regular User
```
Email: test@example.com
Password: 123456
```

### Admin User
```
Email: admin@store.com
Password: 123456
(Register with this email to get admin access)
```

---

## 🌍 Deployment Guide

**Frontend Deployment: (Netlify)** ⬆️  
- Needed build run/deploy both.
```markdown

1. via Push ↦
2. Expected Push completes [LIVE READY]  

```

---

Perfect Result ends - Execute _push .... Execute 
 
