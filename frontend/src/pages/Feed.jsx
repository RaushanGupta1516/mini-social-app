import { useState, useEffect } from "react";
import { CircularProgress, Box } from "@mui/material";
import Navbar from "../components/Navbar.jsx";
import PostCard from "../components/PostCard.jsx";
import CreatePost from "../components/CreatePost.jsx";
import Pagination from "../components/Pagination.jsx";
import { getFeed } from "../services/api.js";
import "./Feed.css";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");

  const loadFeed = async (page = 1) => {
    setLoading(true);
    setError("");
    try {
      const res = await getFeed(page);
      setPosts(res.data.posts);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      setError("Failed to load posts. Please try again.");
      console.error("Feed error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeed(1);
  }, []);

  const handlePageChange = (page) => {
    loadFeed(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePostCreated = () => {
    loadFeed(1);
    setCurrentPage(1);
  };

  return (
    <div className="feed-wrapper">
      <Navbar />
      <div className="feed-container">
        <CreatePost onPostCreated={handlePostCreated} />

        <div className="feed-header">
          <h2>Recent Posts</h2>
        </div>

        {loading && (
          <Box display="flex" justifyContent="center" py={6}>
            <CircularProgress sx={{ color: "#1976d2" }} />
          </Box>
        )}

        {error && (
          <div style={{
            textAlign: "center",
            color: "#d32f2f",
            padding: "20px",
            background: "#fff5f5",
            borderRadius: "12px",
            border: "1px solid #ffcdd2",
          }}>
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {posts.length === 0 ? (
              <div className="no-posts">
                <p>🌟 No posts yet. Be the first to post!</p>
              </div>
            ) : (
              <div className="posts-list">
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Feed;