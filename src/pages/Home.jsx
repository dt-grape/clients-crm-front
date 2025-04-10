import React from "react";
import CustomDataGrid from "../components/CustomDataGrid.jsx";
import MetricsPanel from "../components/MetricsPanel.jsx";
import { Box } from "@mui/material";
import StudentsChart from "../components/StudentsChart.jsx";
const Home = () => {
  return (
    <>
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
    </>
  );
};

export default Home;
