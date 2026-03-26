<div align="center">

<img src="https://ui-avatars.com/api/?name=Social+App&background=1976d2&color=fff&size=120&rounded=true&bold=true" alt="SocialApp Logo" width="100" height="100" />

<h1>💬 SocialApp</h1>

<p><strong>A modern full-stack social media platform where users can connect, share moments, and engage with each other through posts, likes, and comments.</strong></p>

[![Netlify Status](https://img.shields.io/badge/Frontend-Live%20on%20Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://mini-social-app-3w.netlify.app)
[![Render Status](https://img.shields.io/badge/Backend-Live%20on%20Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://mini-social-app-backend-alk2.onrender.com)


<br />

[🌐 Live Demo](https://mini-social-app-3w.netlify.app) &nbsp;•&nbsp;
[🔗 API Base URL](https://mini-social-app-backend-alk2.onrender.com) &nbsp;•&nbsp;
[🐛 Report Bug](https://github.com/RaushanGupta1516/mini-social-app/issues) &nbsp;•&nbsp;
[✨ Request Feature](https://github.com/RaushanGupta1516/mini-social-app/issues)

</div>

---

## 📸 Screenshots

<div align="center">

### 🔐 Auth Pages
> Clean, modern login and signup experience

| Login | Signup |
|---|---|
| ![Login](https://github.com/user-attachments/assets/8061e263-7923-43e7-b2d7-6aaba678469e) | ![Signup](https://github.com/user-attachments/assets/697e49ca-9d12-4f3b-a924-36fdcbb18e77) |

### 📰 Social Feed
> Public feed with real-time likes and comments

![Feed](https://github.com/user-attachments/assets/5ca0622d-9926-4635-9947-1d6190fe9e18)

</div>

---

## ✨ Features

### 🔐 Authentication
- ✅ User **Signup** with username, email & password
- ✅ Secure **Login** with JWT token-based authentication
- ✅ Passwords hashed using **bcryptjs**
- ✅ Auth state persisted via **localStorage**
- ✅ Protected routes — unauthenticated users redirected to login

### 📝 Posts
- ✅ Create posts with **text**, **image**, or **both**
- ✅ Neither text nor image is mandatory alone
- ✅ Image uploads powered by **Cloudinary**
- ✅ Posts appear instantly in the feed after creation

### 📰 Public Feed
- ✅ All posts from all users visible in a **chronological feed**
- ✅ Displays **username**, **avatar**, **timestamp**, **post content**
- ✅ **Efficient pagination** — 10 posts per page
- ✅ Smooth scroll-to-top on page change

### ❤️ Likes
- ✅ Like or unlike any post with a **single click**
- ✅ **Optimistic UI update** — feels instant
- ✅ Like count updates in real time
- ✅ Usernames of all people who liked are saved

### 💬 Comments
- ✅ Comment on any post
- ✅ Comments appear **instantly** after submission
- ✅ Shows commenter **username** and **timestamp**
- ✅ Comment count updates live on the post card

### 🎨 UI/UX
- ✅ **Inspired by TaskPlanet** social feed design
- ✅ Clean white cards with subtle shadows
- ✅ Blue gradient accents and follow buttons
- ✅ Fully **responsive** — works on mobile, tablet, desktop
- ✅ Hover animations on post cards
- ✅ Loading spinners on all async operations
- ✅ Error messages with friendly UI feedback

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React.js** (Vite) | UI framework |
| **Material UI (MUI)** | Component library |
| **React Router DOM** | Client-side routing |
| **Axios** | HTTP requests |
| **Inter Font** | Typography |
| **CSS** | Custom styling |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **MongoDB + Mongoose** | Database + ODM |
| **JWT** | Authentication tokens |
| **bcryptjs** | Password hashing |
| **Multer** | File upload handling |
| **Cloudinary** | Image storage & CDN |
| **CORS** | Cross-origin requests |

### DevOps & Deployment
| Platform | Usage |
|---|---|
| **Netlify** | Frontend hosting |
| **Render** | Backend hosting |
| **MongoDB Atlas** | Cloud database |
| **GitHub** | Version control |
| **Cloudinary** | Media storage |

---

## 🗄️ Database Design

> Only **2 MongoDB collections** as required — clean and efficient.

### 👤 Users Collection
```json
{
  "_id": "ObjectId",
  "username": "string (unique)",
  "email": "string (unique)",
  "password": "string (hashed with bcrypt)",
  "avatar": "string (optional)",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### 📄 Posts Collection
```json
{
  "_id": "ObjectId",
  "authorId": "ObjectId (ref: User)",
  "authorUsername": "string",
  "textContent": "string (optional)",
  "imageUrl": "string (optional, Cloudinary URL)",
  "likes": ["username1", "username2"],
  "comments": [
    {
      "_id": "ObjectId",
      "username": "string",
      "text": "string",
      "createdAt": "timestamp"
    }
  ],
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

---

## 🔌 API Endpoints

### 🔐 Auth Routes
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/auth/signup` | Register new user | ❌ |
| `POST` | `/api/auth/login` | Login user, returns JWT | ❌ |

### 📄 Post Routes
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/posts?page=1&limit=10` | Get paginated feed | ❌ |
| `POST` | `/api/posts` | Create new post | ✅ |
| `POST` | `/api/posts/:id/like` | Toggle like on post | ✅ |
| `POST` | `/api/posts/:id/comment` | Add comment to post | ✅ |
| `GET` | `/api/posts/:id/comments` | Get all comments | ❌ |

### 📦 Example Request — Create Post
```bash
POST /api/posts
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "textContent": "Hello World!",
  "image": <file>
}
```

### 📦 Example Response — Get Feed
```json
{
  "posts": [...],
  "currentPage": 1,
  "totalPages": 3,
  "totalPosts": 28
}
```

---

## 🚀 Getting Started

### ✅ Prerequisites
- Node.js v18+
- npm v9+
- MongoDB Atlas account
- Cloudinary account

---

### 📥 Clone the Repository

```bash
git clone https://github.com/RaushanGupta1516/mini-social-app.git
cd mini-social-app
```

---

### ⚙️ Backend Setup

```bash
# go to backend folder
cd backend

# install dependencies
npm install

# create .env file
touch .env
```

Add the following to `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

```bash
# start development server
npm run dev
```

Backend runs on → `http://localhost:5000`

---

### 🎨 Frontend Setup

```bash
# go to frontend folder
cd ../frontend

# install dependencies
npm install

# create .env file
touch .env
```

Add the following to `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
```

```bash
# start development server
npm run dev
```

Frontend runs on → `http://localhost:5173`

---

## 🗂️ Project Structure

```
mini-social-app/
│
├── 📁 backend/
│   ├── 📁 config/
│   │   ├── db.js              # MongoDB connection
│   │   └── cloudinary.js      # Cloudinary + Multer config
│   │
│   ├── 📁 controllers/
│   │   ├── authController.js  # Signup & Login logic
│   │   └── postController.js  # CRUD + Like + Comment logic
│   │
│   ├── 📁 middleware/
│   │   └── authMiddleware.js  # JWT verification
│   │
│   ├── 📁 models/
│   │   ├── User.js            # User schema
│   │   └── Post.js            # Post schema with embedded comments
│   │
│   ├── 📁 routes/
│   │   ├── auth.js            # Auth routes
│   │   └── posts.js           # Post routes
│   │
│   ├── server.js              # Express app entry point
│   └── package.json
│
└── 📁 frontend/
    ├── 📁 src/
    │   ├── 📁 components/
    │   │   ├── Navbar.jsx         # Top navigation bar
    │   │   ├── ProtectedRoute.jsx # Auth guard
    │   │   ├── PostCard.jsx       # Individual post card
    │   │   ├── CreatePost.jsx     # Post creation form
    │   │   ├── CommentSection.jsx # Comments UI
    │   │   └── Pagination.jsx     # Page controls
    │   │
    │   ├── 📁 context/
    │   │   └── AuthContext.jsx    # Global auth state
    │   │
    │   ├── 📁 pages/
    │   │   ├── Login.jsx          # Login page
    │   │   ├── Signup.jsx         # Signup page
    │   │   ├── Feed.jsx           # Main feed page
    │   │   ├── Auth.css           # Auth page styles
    │   │   └── Feed.css           # Feed page styles
    │   │
    │   ├── 📁 services/
    │   │   └── api.js             # Axios instance + API calls
    │   │
    │   ├── App.jsx                # Routes setup
    │   ├── main.jsx               # React entry point
    │   ├── theme.js               # MUI theme config
    │   └── index.css              # Global styles
    │
    └── package.json
```

---

## 🌍 Deployment

### Frontend — Netlify

```bash
cd frontend
npm run build
# deploy dist/ folder to Netlify
```

| Setting | Value |
|---|---|
| Base directory | `frontend` |
| Build command | `npm run build` |
| Publish directory | `frontend/dist` |
| Environment variable | `VITE_API_URL=your_render_url` |

---

### Backend — Render

| Setting | Value |
|---|---|
| Root directory | `backend` |
| Build command | `npm install` |
| Start command | `npm start` |
| Environment variables | All from `.env` file |

---

## 🔐 Security Features

- ✅ Passwords hashed with **bcrypt** (salt rounds: 10)
- ✅ JWT tokens expire after **7 days**
- ✅ Auth token sent via **Authorization header** (Bearer)
- ✅ Protected API routes with middleware
- ✅ `.env` file excluded from git via `.gitignore`
- ✅ Input validation on all API endpoints

---

## 📱 Responsive Design

| Screen Size | Experience |
|---|---|
| 📱 Mobile (< 480px) | Optimized touch-friendly layout |
| 📟 Tablet (480px–768px) | Adaptive card sizing |
| 🖥️ Desktop (> 768px) | Full experience with max-width container |

---

## 🏆 Bonus Features Implemented

| Bonus | Status |
|---|---|
| Clean and modern UI | ✅ Implemented |
| Responsive design | ✅ Implemented |
| Efficient pagination | ✅ Implemented |
| Well-structured code | ✅ Implemented |
| Reusable components | ✅ Implemented |
| Code comments | ✅ Implemented |
| Optimistic UI updates | ✅ Implemented |
| Loading states | ✅ Implemented |
| Error handling | ✅ Implemented |

---

## 🗺️ Future Roadmap

- [ ] User profile pages
- [ ] Edit and delete posts
- [ ] Follow / unfollow users
- [ ] Notifications system
- [ ] Direct messaging
- [ ] Dark mode toggle
- [ ] Post sharing
- [ ] React Native mobile app

---

## 👨‍💻 Author

<div align="center">

**Raushan Gupta**

[![GitHub](https://img.shields.io/badge/GitHub-RaushanGupta1516-181717?style=for-the-badge&logo=github)](https://github.com/RaushanGupta1516)

</div>

---

<div align="center">

**Built with ❤️ using React.js + Node.js + MongoDB**

</div>
