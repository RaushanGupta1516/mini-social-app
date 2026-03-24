import { useState, useEffect } from "react";
import { Avatar, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { getComments, commentOnPost } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

const CommentSection = ({ postId, onCommentAdded }) => {
  const { user } = useAuth();

  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getComments(postId);
        setComments(res.data.comments);
      } catch (err) {
        console.error("Failed to load comments:", err.message);
      } finally {
        setFetching(false);
      }
    };
    load();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || !user) return;
    setLoading(true);
    setError("");
    try {
      const res = await commentOnPost(postId, text.trim());
      setComments(res.data.comments);
      setText("");
      onCommentAdded();
    } catch (err) {
      setError("Could not post comment. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const avatarUrl = (name) =>
    `https://ui-avatars.com/api/?name=${name}&background=1976d2&color=fff&rounded=true&bold=true`;

  const timeAgo = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div style={s.wrapper}>

      {/* comment input */}
      {user && (
        <form style={s.form} onSubmit={handleSubmit}>
          <Avatar
            src={avatarUrl(user.username)}
            sx={{ width: 28, height: 28, flexShrink: 0 }}
          />
          <input
            style={s.input}
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => { setText(e.target.value); setError(""); }}
            maxLength={500}
          />
          <button
            type="submit"
            style={{
              ...s.sendBtn,
              opacity: !text.trim() || loading ? 0.45 : 1,
            }}
            disabled={!text.trim() || loading}
          >
            {loading
              ? <CircularProgress size={13} sx={{ color: "#fff" }} />
              : <SendIcon sx={{ fontSize: 14 }} />
            }
          </button>
        </form>
      )}

      {error && <p style={s.errMsg}>{error}</p>}

      {/* comments list */}
      <div style={s.list}>
        {fetching ? (
          <div style={{ textAlign: "center", padding: "12px" }}>
            <CircularProgress size={18} sx={{ color: "#1976d2" }} />
          </div>
        ) : comments.length === 0 ? (
          <p style={s.empty}>No comments yet.</p>
        ) : (
          comments.map((c) => (
            <div key={c._id} style={s.commentRow}>
              <Avatar
                src={avatarUrl(c.username)}
                sx={{ width: 26, height: 26, flexShrink: 0, mt: "2px" }}
              />
              <div style={s.commentBubble}>
                <div style={s.commentMeta}>
                  <span style={s.commentUser}>@{c.username}</span>
                  <span style={s.commentTime}>{timeAgo(c.createdAt)}</span>
                </div>
                <p style={s.commentText}>{c.text}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const s = {
  wrapper: {
    marginTop: "12px",
    paddingTop: "12px",
    borderTop: "1px solid #f0f2f5",
  },
  form: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "12px",
  },
  input: {
    flex: 1,
    border: "1px solid #e4e6ea",
    borderRadius: "18px",
    padding: "8px 14px",
    fontSize: "13px",
    outline: "none",
    background: "#f0f2f5",
    color: "#1c1e21",
  },
  sendBtn: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    border: "none",
    background: "linear-gradient(135deg, #1976d2, #42a5f5)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  },
  errMsg: {
    fontSize: "12px",
    color: "#d32f2f",
    marginBottom: "8px",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  empty: {
    fontSize: "13px",
    color: "#b0b3b8",
    textAlign: "center",
    padding: "6px 0",
  },
  commentRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "7px",
  },
  commentBubble: {
    background: "#f0f2f5",
    borderRadius: "12px",
    padding: "7px 12px",
    flex: 1,
  },
  commentMeta: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: "2px",
  },
  commentUser: {
    fontSize: "12px",
    fontWeight: 700,
    color: "#1976d2",
  },
  commentTime: {
    fontSize: "11px",
    color: "#b0b3b8",
  },
  commentText: {
    fontSize: "13px",
    color: "#1c1e21",
    lineHeight: 1.45,
    margin: 0,
  },
};

export default CommentSection;