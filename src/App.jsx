import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { useTheme, useMediaQuery, Box, IconButton } from "@mui/material";
import { useState } from "react";
import { ArrowForward } from "@mui/icons-material";
import AsideNav from "./components/AsideNav";
ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
  // const navigate = useNavigate();
  //
  // useEffect(() => {
  //   const accessToken = Cookies.get("access_token");
  //   if (!accessToken) {
  //     navigate("/auth");
  //   }
  // }, [navigate]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <Header />
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
        <AsideNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
        <Outlet />
      </Box>
    </>
  );
}

export default App;
