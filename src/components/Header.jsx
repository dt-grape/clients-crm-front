import React from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import ListAltIcon from "@mui/icons-material/ListAlt";
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

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <>
      <Box
        sx={{
          width: 350,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
        role="presentation"
        onClick={toggleDrawer(false)}
      >
        <List>
          <ListItem>
            <ListItemButton onClick={() => navigate("/")}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Главная" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => navigate("/tasks")}>
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary="Задачи" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Box>
      <Box
        sx={{
          justifySelf: "flex-end",
          p: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Avatar />
        <Box>
          <Typography>JohnDoe@gmail.com</Typography>
          <Typography>John Doe</Typography>
        </Box>
        <Button variant="outlined" onClick={handleLogout}>
          Выйти
        </Button>
      </Box>
    </>
  );

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
          <Typography variant="h6" fontFamily="JetBrains Mono">
            StudentReach CRM
          </Typography>
        </Link>
        {isAuth ? (
          <>
            <Button variant="contained" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </Button>
            <Drawer anchor={"right"} open={open} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
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
