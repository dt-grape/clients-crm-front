import {
  Box,
  List,
  ListItem,
  ListItemText,
  Drawer,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import HistoryIcon from "@mui/icons-material/History";

const AsideNav = ({ isOpen, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navContent = (
    <Box
      component="nav"
      sx={{
        padding: 2,
      }}
    >
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          width: "100%",
        }}
      >
        <ListItem
          sx={{
            "&:hover": {
              bgcolor: "rgba(0, 0, 0, 0.04)",
            },
            padding: "8px",
            borderRadius: "8px",
            transition: "background-color 0.3s",
          }}
        >
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : undefined)}
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <DashboardIcon sx={{ mr: 2 }} />
            <ListItemText primary="Дашборд" />
          </NavLink>
        </ListItem>
        <ListItem
          sx={{
            "&:hover": {
              bgcolor: "rgba(0, 0, 0, 0.04)",
            },
            padding: "8px",
            borderRadius: "8px",
            transition: "background-color 0.3s",
          }}
        >
          <NavLink
            to="/history"
            className={({ isActive }) => (isActive ? "active" : undefined)}
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <HistoryIcon sx={{ mr: 2 }} />
            <ListItemText primary="История взаимодействий" />
          </NavLink>
        </ListItem>
        <ListItem
          sx={{
            "&:hover": {
              bgcolor: "rgba(0, 0, 0, 0.04)",
            },
            padding: "8px",
            borderRadius: "8px",
            transition: "background-color 0.3s",
          }}
        >
          <NavLink
            to="/statistics"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <BarChartIcon sx={{ mr: 2 }} />
            <ListItemText primary="Статистика" />
          </NavLink>
        </ListItem>
        <ListItem
          sx={{
            "&:hover": {
              bgcolor: "rgba(0, 0, 0, 0.04)",
            },
            padding: "8px",
            borderRadius: "8px",
            transition: "background-color 0.3s",
          }}
        >
          <NavLink
            to="/settings"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <SettingsIcon sx={{ mr: 2 }} />
            <ListItemText primary="Настройки" />
          </NavLink>
        </ListItem>
      </List>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={onClose}
        sx={{
          "& .MuiDrawer-paper": {
            width: "300px",
          },
        }}
      >
        {navContent}
      </Drawer>
    );
  }

  return (
    <Box
      component="aside"
      sx={{
        borderRight: "1px solid rgba(0, 0, 0, 0.12)",
        display: { xs: "none", md: "block" },
      }}
    >
      {navContent}
    </Box>
  );
};

export default AsideNav;
