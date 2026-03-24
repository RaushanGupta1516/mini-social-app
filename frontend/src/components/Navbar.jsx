import { useState } from "react";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate("/login");
  };

  const avatarUrl = `https://ui-avatars.com/api/?name=${user?.username}&background=1976d2&color=fff&rounded=true&bold=true`;

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>

        {/* left — logo */}
        <div style={styles.logo} onClick={() => navigate("/")}>
          <div style={styles.logoBox}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
          </div>
          <span style={styles.logoText}>SocialApp</span>
        </div>

        {/* right — user info + avatar */}
        {user && (
          <div style={styles.right}>
            <div style={styles.userMeta}>
              <span style={styles.displayName}>{user.username}</span>
              <span style={styles.handle}>@{user.username}</span>
            </div>

            <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
              <Avatar
                src={avatarUrl}
                alt={user.username}
                sx={{
                  width: 36,
                  height: 36,
                  border: "2px solid #e3f2fd",
                }}
              />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              PaperProps={{
                sx: {
                  mt: 1,
                  borderRadius: "12px",
                  minWidth: 170,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                  border: "1px solid #e8eaed",
                },
              }}
            >
              <MenuItem
                disabled
                sx={{ fontSize: "12px", color: "#9e9e9e", py: 0.8 }}
              >
                Signed in as @{user.username}
              </MenuItem>
              <MenuItem
                onClick={handleLogout}
                sx={{
                  fontSize: "14px",
                  color: "#d32f2f",
                  fontWeight: 600,
                  py: 0.8,
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "#fff",
    borderBottom: "1px solid #e8eaed",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  inner: {
    maxWidth: "700px",
    margin: "0 auto",
    padding: "0 16px",
    height: "58px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    cursor: "pointer",
  },
  logoBox: {
    width: "32px",
    height: "32px",
    borderRadius: "9px",
    background: "linear-gradient(135deg, #1976d2, #42a5f5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: "17px",
    fontWeight: 800,
    color: "#1976d2",
    letterSpacing: "-0.3px",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  userMeta: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "1px",
  },
  displayName: {
    fontSize: "13px",
    fontWeight: 700,
    color: "#1c1e21",
    lineHeight: 1,
  },
  handle: {
    fontSize: "11px",
    color: "#9e9e9e",
    lineHeight: 1,
  },
};

export default Navbar;