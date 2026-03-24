import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);


import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js"; 

import authRoutes from "./routes/auth.js"; 
import postRoutes from "./routes/posts.js";

dotenv.config();

// connect to database
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// basic route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});