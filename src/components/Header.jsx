import React from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";

import logo from "../assets/logo.png";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Header = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Вы вышли из системы");
    navigate("/login");
  };

  const formatName = (name) => {
    if (!name) return "Пользователь";
    const parts = name.split(" ");
    if (parts.length === 1) return parts[0];
    return `${parts[0]} ${parts[1].charAt(0).toUpperCase()}.`;
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 20px",
          borderBottom: "1px solid #ccc",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <img src={logo} alt="logo" width={75} height={75} />
          <Typography
            variant="h4"
            fontFamily=""
            sx={{ fontSize: { xs: 16, md: 24 } }}
          >
            AlmazOne
          </Typography>
        </Link>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1,
            }}
          >
            {new Date().toLocaleDateString("ru-RU", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
          <Avatar alt={user?.name} sx={{ width: 40, height: 40 }}>
            {user?.name ? user?.name.charAt(0).toUpperCase() : "П"}
          </Avatar>
          <Typography
            variant="body1"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {formatName(user?.name) || "Пользователь"}
          </Typography>
          <Button
            variant="outlined"
            onClick={handleLogout}
            sx={{ display: { md: "inline-flex" } }}
          >
            Выйти
          </Button>
        </Box>
      </Box>
    </header>
  );
};

export default Header;
