import React from "react";
import CustomDataGrid from "../components/CustomDataGrid.jsx";
import MetricsPanel from "../components/MetricsPanel.jsx";
import { Box } from "@mui/material";
import ClientsBudgetChart from "../components/ClientsBudgetChart.jsx";
import ClientsProjectTypeChart from "../components/ClientsProjectTypeChart.jsx";
const Home = () => {
  return (
    <>
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          flexWrap: "wrap",
          pb: { xs: 0, md: 4 },
          gap: 3,
          paddingInline: 2,
        }}
      >
        <CustomDataGrid />
        <ClientsBudgetChart />
        <MetricsPanel />
        <ClientsProjectTypeChart />
      </Box>
    </>
  );
};

export default Home;
