# 🚀 Task Manager App

A Full Stack Task Manager Application built using Node.js, Express.js, MongoDB, HTML, CSS, and JavaScript.

---

## ✨ Features

- 👤 User Registration and Login
- 🔐 JWT Authentication
- ➕ Add Tasks
- ✏️ Edit Tasks
- 🗑️ Delete Tasks
- ✅ Mark Tasks as Completed / Pending
- 🗄️ MongoDB Database Integration
- 📱 Responsive Frontend UI

---

## 🛠 Tech Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas

---

## 🌐 Live Demo

- 🌍 Frontend (Website):  
  https://legendary-gecko-5e5a31.netlify.app

- ⚙️ Backend API:  
  https://task-manager-app-l9ls.onrender.com

---

## 📂 Project Setup

### Step 1: Clone Repository

```bash
git clone https://github.com/Swathi979/task-manager-app.git
cd task-manager-app
```

---

### Step 2: Install Dependencies

```bash
npm install
```

---

### Step 3: Setup Environment Variables

Create `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

### Step 4: Run Project

```bash
node server.js
```

Server runs at:
```
http://localhost:5000
```

---

## 📌 Project Structure

```bash
task-manager-app/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── backend/
│   ├── server.js
│   ├── models/
│   ├── routes/
│   └── config/
│
├── .env
├── package.json
└── README.md
```

---

## 🚀 API Endpoints

- POST `/api/auth/register` → Register user
- POST `/api/auth/login` → Login user
- GET `/api/tasks` → Get tasks
- POST `/api/tasks` → Create task
- PUT `/api/tasks/:id` → Update task
- DELETE `/api/tasks/:id` → Delete task

---

## 📌 Future Improvements

- Refresh Token System
- Role-based Access (Admin/User)
- Task Due Dates
- Email Notifications
- Drag & Drop UI

---

## 👩‍💻 Author

**A T Swathi**

GitHub: https://github.com/Swathi979
