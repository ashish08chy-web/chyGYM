# 🏋️ chyGYM – Gym Tracker

**chyGYM** is a full-stack gym tracker web application designed to help users manage their workouts, explore exercises, and track their fitness activities.

The project is built using **React.js, Tailwind CSS, Node.js, Express.js, MongoDB Atlas, and JWT authentication**.

---

## 🚀 Features

### 🔐 Authentication

* User Signup
* User Login
* JWT-based authentication
* Protected routes
* Secure password hashing using bcrypt
* Logout functionality

### 🏋️ Workout Management

* Add workouts
* View personal workout history
* Track workout duration
* Track calories burned
* Track workout date
* Delete workouts
* Add exercises to workouts
* Track sets, reps, and weight

### 💪 Exercise Library

* Exercise database
* Search exercises
* Filter exercises by muscle group
* View exercise details
* Add exercises to workouts
* Favorite exercises

### 🎨 User Interface

* Responsive design
* Modern dashboard
* Tailwind CSS styling
* Sidebar navigation
* Mobile-friendly layout
* Loading and error states

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Tailwind CSS
* Lucide React
* JavaScript

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* CORS
* dotenv

### Database

* MongoDB Atlas

---

## 📂 Project Structure

```text
chyGYM/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   └── Footer.jsx
│   │
│   ├── layouts/
│   │   └── MainLayout.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Workout.jsx
│   │   ├── Exercises.jsx
│   │   ├── Progress.jsx
│   │   ├── Profile.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── ForgotPassword.jsx
│   │   └── NotFound.jsx
│   │
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── context/
│   ├── features/
│   ├── hooks/
│   ├── utils/
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Workout.js
│   │   └── Exercise.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── workoutRoutes.js
│   │   └── exerciseRoutes.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── controllers/
│   ├── seedExercises.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── public/
├── package.json
└── README.md
```

---

## 🔑 Authentication Flow

chyGYM uses JWT authentication for protected resources.

```text
User
 │
 ├── Signup
 │      ↓
 │   MongoDB
 │
 └── Login
        ↓
     JWT Token
        ↓
   localStorage
        ↓
 Protected Routes
```

Protected API requests send the token using:

```text
Authorization: Bearer <token>
```

---

## 🔄 Workout Flow

```text
Exercises Page
      ↓
Select Exercise
      ↓
Add to Workout
      ↓
Workout Details
      ↓
POST /api/workout
      ↓
MongoDB
      ↓
GET /api/workout
      ↓
Workout Page
```

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint            | Description           |
| ------ | ------------------- | --------------------- |
| POST   | `/api/auth/signup`  | Register a new user   |
| POST   | `/api/auth/login`   | Login user            |
| GET    | `/api/auth/profile` | Get protected profile |

### Workouts

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| POST   | `/api/workout`     | Add workout         |
| GET    | `/api/workout`     | Get user's workouts |
| DELETE | `/api/workout/:id` | Delete workout      |

### Exercises

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| GET    | `/api/exercises` | Get exercises |
| POST   | `/api/exercises` | Add exercise  |

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

```bash
cd chyGYM
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd backend
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend` folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> Never commit your `.env` file or database credentials to GitHub.

---

## ▶️ Run the Application

### Start Backend

From the `backend` folder:

```bash
node server.js
```

Backend will run on:

```text
http://localhost:5000
```

### Start Frontend

From the project root:

```bash
npm run dev
```

The frontend will run on the Vite development server.

---

## 🌱 Seed Exercise Data

The project includes a seed script for adding initial exercises to the database.

From the `backend` folder:

```bash
node seedExercises.js
```

This adds the initial exercise library to MongoDB.

---

## 📱 Main Pages

| Page            | Purpose                  |
| --------------- | ------------------------ |
| Home            | Landing page             |
| Login           | User authentication      |
| Signup          | Create account           |
| Dashboard       | User fitness overview    |
| Workout         | Manage workouts          |
| Exercises       | Browse and add exercises |
| Progress        | Track fitness progress   |
| Profile         | Manage user profile      |
| Forgot Password | Password recovery page   |

---

## 🧠 What I Learned From This Project

While building chyGYM, I worked with:

* React component architecture
* React Router
* Protected routes
* REST APIs
* Express.js
* MongoDB Atlas
* Mongoose models
* JWT authentication
* Password hashing
* Middleware
* CRUD operations
* API integration
* Tailwind CSS
* Frontend and backend communication
* Error handling
* Git and GitHub

---

## 🔮 Future Improvements

Planned improvements for chyGYM include:

* 📊 Advanced progress charts
* 📈 Workout analytics
* 🏆 Personal fitness goals
* 🔔 Workout reminders
* 👤 Improved profile management
* 🏋️ Multiple exercises per workout
* 📱 Better mobile experience
* ☁️ Production deployment
* 🔐 Improved password recovery system
* 📊 Advanced dashboard statistics

---

## 📸 Project Preview

Add screenshots of your application here:

```text
Dashboard
Workout Page
Exercises Page
Login Page
Profile Page
```

Example:

```markdown
![Dashboard](./screenshots/dashboard.png)
```

---

## 👨‍💻 Developer

**Ashish Choudhary**

BCA Student & Web Developer

Interested in:

* React.js
* Next.js
* Node.js
* Full-Stack Development
* Modern Web Development

---

## ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is created for learning, development, and portfolio purposes.
