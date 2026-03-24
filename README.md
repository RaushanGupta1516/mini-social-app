# Mini Social Post Application

A full-stack social feed app where users can post text/images, like and comment on posts.

## Tech Stack

- **Frontend:** React.js + Material UI
- **Backend:** Node.js + Express.js
- **Database:** MongoDB Atlas
- **Image Upload:** Cloudinary
- **Deployment:** Vercel (frontend) + Render (backend)

## Features

- User signup and login with JWT auth
- Create posts with text, image, or both
- Public feed showing all posts
- Like and comment on any post
- Instant UI updates on like/comment
- Pagination on feed
- Fully responsive design

## Project Structure

\`\`\`
mini-social-app/
├── backend/       → Node.js + Express API
└── frontend/      → React.js application
\`\`\`

## Local Setup

### Backend
\`\`\`bash
cd backend
npm install
npm run dev
\`\`\`

### Frontend
\`\`\`bash
cd frontend
npm install
npm start
\`\`\`

## Environment Variables

### Backend (.env)
\`\`\`
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
\`\`\`

### Frontend (.env)
\`\`\`
REACT_APP_API_URL=http://localhost:5000
\`\`\`