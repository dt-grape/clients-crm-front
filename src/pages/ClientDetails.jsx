import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClientInfoCard from "../components/ClientInfoCard.jsx";
import InteractionsHistory from "../components/InteractionsHistory";
import { useGetClient } from "../http/clients.js";

const ClientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: clientData, isLoading, isError } = useGetClient(id);

  const [client, setClient] = useState(null);

  useEffect(() => {
    if (clientData) {
      setClient(clientData);
    }
  }, [clientData]);

  if (isLoading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h6" color="error">
          Ошибка загрузки данных
        </Typography>
        <Button onClick={() => navigate(-1)}>Назад</Button>
      </Container>
    );
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingBlock: "10px",
      }}
    >
      <Box sx={{ width: "100%", margin: "0 auto" }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 2 }}
        >
          Назад
        </Button>

        {!client ? (
          <Typography variant="h6" color="error">
            Клиент не найден
          </Typography>
        ) : (
          <>
            <ClientInfoCard client={client} onClientUpdate={setClient} />
            <InteractionsHistory clientId={client.id} />
          </>
        )}
      </Box>
    </Container>
  );
};

export default ClientDetails;
