import React, { useState } from "react";
import Header from "../components/Header.jsx";
import CustomDataGrid from "../components/CustomDataGrid.jsx";
import MetricsPanel from "../components/MetricsPanel.jsx";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import AsideNav from "../components/AsideNav.jsx";
import ArrowForward from "@mui/icons-material/ArrowForward";
import StudentsChart from "../components/StudentsChart.jsx";
const Home = () => {
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
        <Box
          component="main"
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, minmax(0, 1fr))",
            },
            gap: 3,
            paddingInline: 2,
          }}
        >
          <CustomDataGrid />
          <StudentsChart />
          <MetricsPanel />
        </Box>
      </Box>
    </>
  );
};

export default Home;
