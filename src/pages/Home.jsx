import React from "react";
import Header from "../components/Header.jsx";
import CustomDataGrid from "../components/CustomDataGrid.jsx";
import MetricsPanel from "../components/MetricsPanel.jsx";
import { Container } from "@mui/material";

const Home = () => {
  return (
    <>
      <Header />
      <Container sx={{ mt: 4 }}>
        <MetricsPanel />
        <CustomDataGrid />
      </Container>
    </>
  );
};

export default Home;
