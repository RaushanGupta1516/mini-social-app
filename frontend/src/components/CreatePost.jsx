import { useState, useRef } from "react";
import { Avatar, CircularProgress } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../context/AuthContext.jsx";
import { createPost } from "../services/api.js";

const CreatePost = ({ onPostCreated }) => {
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(false);

  const avatarUrl = `https://ui-avatars.com/api/?name=${user?.username}&background=1976d2&color=fff&rounded=true&bold=true`;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5MB");
      return;
    }
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setError("");
  };

  const removeImage = () => {
    setImage(null);
    setPreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    if (!text.trim() && !image) {
      setError("Write something or add an image");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      if (text.trim()) formData.append("textContent", text.trim());
      if (image) formData.append("image", image);
      await createPost(formData);
      setText("");
      setImage(null);
      setPreview("");
      setFocused(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
      onPostCreated();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.card}>

      {/* card top bar */}
      <div style={styles.topBar}>
        <span style={styles.topBarTitle}>Create Post</span>
        <div style={styles.tabs}>
          <span style={styles.tabActive}>All Posts</span>
          <span style={styles.tabInactive}>Promotions</span>
        </div>
      </div>

      {/* text input area */}
      <div style={styles.inputArea}>
        <Avatar
          src={avatarUrl}
          alt={user?.username}
          sx={{ width: 40, height: 40, flexShrink: 0 }}
        />
        <textarea
          style={{
            ...styles.textarea,
            minHeight: focused ? "72px" : "40px",
          }}
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => { setText(e.target.value); setError(""); }}
          onFocus={() => setFocused(true)}
          onBlur={() => { if (!text) setFocused(false); }}
        />
      </div>

      {/* image preview */}
      {preview && (
        <div style={styles.previewBox}>
          <img src={preview} alt="preview" style={styles.previewImg} />
          <button style={styles.removeBtn} onClick={removeImage}>
            <CloseIcon sx={{ fontSize: 14 }} />
          </button>
        </div>
      )}

      {/* error message */}
      {error && <p style={styles.errorMsg}>⚠️ {error}</p>}

      {/* bottom action bar */}
      <div style={styles.actionBar}>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <button
          style={styles.photoBtn}
          onClick={() => fileInputRef.current.click()}
        >
          <ImageIcon sx={{ fontSize: 19, color: "#1976d2" }} />
          <span>Photo</span>
        </button>

        <button
          style={{ ...styles.postBtn, opacity: loading ? 0.75 : 1 }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={15} sx={{ color: "#fff" }} />
          ) : (
            <><SendIcon sx={{ fontSize: 15 }} /><span>Post</span></>
          )}
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: "#fff",
    borderRadius: "14px",
    border: "1px solid #e4e6ea",
    boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
    marginBottom: "18px",
    overflow: "hidden",
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 18px",
    borderBottom: "1px solid #f0f2f5",
  },
  topBarTitle: {
    fontSize: "15px",
    fontWeight: 700,
    color: "#1c1e21",
  },
  tabs: {
    display: "flex",
    gap: "6px",
  },
  tabActive: {
    background: "#1976d2",
    color: "#fff",
    padding: "4px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 600,
    cursor: "pointer",
  },
  tabInactive: {
    background: "#f0f2f5",
    color: "#65676b",
    padding: "4px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 600,
    cursor: "pointer",
  },
  inputArea: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    padding: "14px 18px 10px",
  },
  textarea: {
    flex: 1,
    border: "none",
    outline: "none",
    resize: "none",
    fontSize: "14px",
    color: "#1c1e21",
    background: "transparent",
    lineHeight: 1.55,
    transition: "min-height 0.2s ease",
    paddingTop: "8px",
  },
  previewBox: {
    position: "relative",
    margin: "0 18px 12px",
  },
  previewImg: {
    width: "100%",
    maxHeight: "240px",
    objectFit: "cover",
    borderRadius: "10px",
    border: "1px solid #e4e6ea",
  },
  removeBtn: {
    position: "absolute",
    top: "7px",
    right: "7px",
    background: "rgba(0,0,0,0.5)",
    border: "none",
    borderRadius: "50%",
    width: "26px",
    height: "26px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#fff",
  },
  errorMsg: {
    color: "#d32f2f",
    fontSize: "12px",
    margin: "0 18px 10px",
    padding: "7px 12px",
    background: "#fff5f5",
    borderRadius: "8px",
    border: "1px solid #ffcdd2",
  },
  actionBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 18px",
    borderTop: "1px solid #f0f2f5",
    background: "#fafbfc",
  },
  photoBtn: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    background: "#e7f3ff",
    border: "none",
    padding: "6px 14px",
    borderRadius: "20px",
    color: "#1976d2",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
  },
  postBtn: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    background: "linear-gradient(135deg, #1976d2, #42a5f5)",
    color: "#fff",
    border: "none",
    padding: "7px 20px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(25,118,210,0.28)",
  },
};

export default CreatePost;