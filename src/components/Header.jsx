import React from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const logoutUser = async () => {
  const response = await axios.post(
    "https://mint-bunny-weekly.ngrok-free.app/v1/auth/logout"
  );
  return response.data;
};

const Header = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/auth");
  };

  const isAuth = true;

  const [open, setOpen] = React.useState(false);

  const mutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      toast.success("Successfully logged out");
      navigate("/auth");
    },
    onError: (error) => {
      toast.error("Logout failed: " + error.message);
    },
  });

  const handleLogout = () => {
    mutation.mutate();
  };

  return (
    <header>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 20px",
          borderBottom: "1px solid #ccc",
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography variant="h4" fontFamily="Mpoca">
            МудроГлас
          </Typography>
        </Link>
        {isAuth ? (
          <>
            <Box
              component={Link}
              to="/profile"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
                "&:hover": {
                  bgcolor: "rgba(0, 0, 0, 0.04)",
                },
                padding: "8px",
                borderRadius: "8px",
                transition: "background-color 0.3s",
              }}
            >
              <Avatar
                color="primary"
                sx={{ width: 40, height: 40, bgcolor: "darkorange" }}
              >
                D
              </Avatar>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="body1">Дмитрий</Typography>
                <Typography variant="body2">Админ</Typography>
              </Box>
            </Box>
          </>
        ) : (
          <Button variant="contained" onClick={handleLogin}>
            Войти
          </Button>
        )}
      </Box>
    </header>
  );
};

export default Header;
