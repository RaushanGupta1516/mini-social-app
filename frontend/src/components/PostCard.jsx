import { useState } from "react";
import { Avatar } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { likePost } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import CommentSection from "./CommentSection.jsx";

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return (
    d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    }) +
    " • " +
    d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
};

const PostCard = ({ post }) => {
  const { user } = useAuth();

  const [likes, setLikes] = useState(post.likes || []);
  const [showComments, setShowComments] = useState(false);
  const [commentCount, setCommentCount] = useState(post.comments?.length || 0);
  const [likeLoading, setLikeLoading] = useState(false);

  const isLiked = user ? likes.includes(user.username) : false;

  const avatarUrl = `https://ui-avatars.com/api/?name=${post.authorUsername}&background=1976d2&color=fff&rounded=true&bold=true`;

  const handleLike = async () => {
    if (!user || likeLoading) return;
    setLikeLoading(true);

    // optimistic update — feels instant
    if (isLiked) {
      setLikes(likes.filter((u) => u !== user.username));
    } else {
      setLikes([...likes, user.username]);
    }

    try {
      await likePost(post._id);
    } catch (err) {
      // revert on failure
      setLikes(likes);
      console.error("Like failed:", err.message);
    } finally {
      setLikeLoading(false);
    }
  };

  return (
    <div className="post-card">

      {/* header row */}
      <div className="post-card-header">
        <div className="post-card-user">
          <Avatar
            src={avatarUrl}
            alt={post.authorUsername}
            sx={{ width: 44, height: 44 }}
          />
          <div>
            <div className="post-card-name">{post.authorUsername}</div>
            <div className="post-card-username">
              @{post.authorUsername}
              &nbsp;&bull;&nbsp;
              <span className="post-card-time">
                {formatDate(post.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* follow button — only show on other people's posts */}
        {user && user.username !== post.authorUsername && (
          <button className="follow-btn">Follow</button>
        )}
      </div>

      {/* post text */}
      {post.textContent && (
        <p className="post-card-text">{post.textContent}</p>
      )}

      {/* post image */}
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt="post content"
          className="post-card-image"
        />
      )}

      {/* like + comment buttons */}
      <div className="post-card-footer">
        <button
          className={`post-action-btn ${isLiked ? "liked" : ""}`}
          onClick={handleLike}
        >
          {isLiked ? (
            <FavoriteIcon sx={{ fontSize: 16 }} />
          ) : (
            <FavoriteBorderIcon sx={{ fontSize: 16 }} />
          )}
          <span>{likes.length}</span>
        </button>

        <button
          className="post-action-btn"
          onClick={() => setShowComments(!showComments)}
        >
          <ChatBubbleOutlineIcon sx={{ fontSize: 16 }} />
          <span>{commentCount}</span>
        </button>
      </div>

      {/* expandable comment section */}
      {showComments && (
        <CommentSection
          postId={post._id}
          onCommentAdded={() => setCommentCount((prev) => prev + 1)}
        />
      )}
    </div>
  );
};

export default PostCard;