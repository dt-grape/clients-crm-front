import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  MenuItem,
  Typography,
  Paper,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import GeneralHistory from "../components/GeneralHistory";
const History = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filterOptions = [
    { value: "all", label: "Все взаимодействия" },
    { value: "status", label: "Изменения статуса" },
    { value: "comment", label: "Комментарии" },
    { value: "email", label: "Письма" },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        История взаимодействий
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Поиск по истории..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              select
              variant="outlined"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FilterListIcon />
                    </InputAdornment>
                  ),
                },
              }}
            >
              {filterOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>
      </Paper>

      <GeneralHistory />
    </Container>
  );
};

export default History;
