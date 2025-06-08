import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import {
  useTheme,
  useMediaQuery,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ArrowForward } from "@mui/icons-material";
import AsideNav from "./components/AsideNav";
import { useNavigate } from "react-router-dom";
import { useGetMe } from "./http/user.js";

ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { data, isLoading, isError } = useGetMe();

  useEffect(() => {
    if (
      !localStorage.getItem("token") &&
      !window.location.pathname.includes("/login")
    ) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <Box sx={{ padding: "10px 20px" }}>
        <Typography variant="h6">Загрузка...</Typography>
      </Box>
    );
  }
  if (isError || !data) {
    return (
      <Box sx={{ padding: "10px 20px" }}>
        <Typography variant="h6" color="error">
          Ошибка загрузки данных пользователя
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Header user={user} />
      {isMobile && (
        <Box
          sx={{
            position: "fixed",
            left: 0,
            backgroundColor: "background.paper",
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
            boxShadow: 2,
            zIndex: 1100,
          }}
        >
          <IconButton onClick={() => setIsNavOpen(true)} size="small">
            <ArrowForward />
          </IconButton>
        </Box>
      )}
      <Box
        sx={{
          mt: { xs: 0, md: 4 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "250px 1fr" },
          gap: 3,
        }}
      >
        <AsideNav
          isOpen={isNavOpen}
          onClose={() => setIsNavOpen(false)}
          user={user}
        />
        <Outlet />
      </Box>
    </>
  );
}

export default App;
