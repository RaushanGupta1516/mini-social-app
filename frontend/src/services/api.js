import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// attach token to every request if it exists in localStorage
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }
  return req;
});

// --- auth ---
export const signupUser = (data) => API.post("/api/auth/signup", data);
export const loginUser = (data) => API.post("/api/auth/login", data);

// --- posts ---
export const getFeed = (page = 1) => API.get(`/api/posts?page=${page}&limit=10`);
export const createPost = (data) =>
  API.post("/api/posts", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// --- likes ---
export const likePost = (postId) => API.post(`/api/posts/${postId}/like`);

// --- comments ---
export const commentOnPost = (postId, text) =>
  API.post(`/api/posts/${postId}/comment`, { text });
export const getComments = (postId) => API.get(`/api/posts/${postId}/comments`);