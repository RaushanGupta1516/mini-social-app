import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, CircularProgress } from "@mui/material";
import { useAuth } from "../context/AuthContext.jsx";
import { loginUser } from "../services/api.js";
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser(formData);
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      background: "#f8faff",
      "& fieldset": { borderColor: "#e3f2fd" },
      "&:hover fieldset": { borderColor: "#1976d2" },
      "&.Mui-focused fieldset": { borderColor: "#1976d2" },
    },
    "& .MuiInputLabel-root.Mui-focused": { color: "#1976d2" },
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <h1>💬 SocialApp</h1>
          <p>Welcome back! Login to continue</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="auth-error">⚠️ {error}</div>}

          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            size="small"
            sx={inputSx}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            size="small"
            sx={inputSx}
          />

          <Button
            type="submit"
            fullWidth
            disabled={loading}
            sx={{
              py: 1.3,
              borderRadius: "12px",
              background: "linear-gradient(135deg, #1976d2, #42a5f5)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "15px",
              textTransform: "none",
              boxShadow: "0 4px 16px rgba(25,118,210,0.3)",
              "&:hover": {
                background: "linear-gradient(135deg, #1565c0, #1976d2)",
                boxShadow: "0 6px 20px rgba(25,118,210,0.4)",
              },
              "&:disabled": { opacity: 0.7 },
            }}
          >
            {loading ? (
              <CircularProgress size={22} sx={{ color: "#fff" }} />
            ) : (
              "Login"
            )}
          </Button>
        </form>

        <div className="auth-switch">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign up</span>
        </div>
      </div>
    </div>
  );
};

export default Login;