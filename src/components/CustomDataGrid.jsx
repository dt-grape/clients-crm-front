import React, { useEffect, useMemo, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import { themeMaterial } from "ag-grid-community";
import { useNavigate } from "react-router-dom";
import { Add, Search } from "@mui/icons-material";
import {
  InputAdornment,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Tooltip,
} from "@mui/material";
import { createClient, useGetClients } from "../http/clients.js";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const CustomDataGrid = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    phone: "",
    email: "",
    budget: "",
    projectType: "",
    status: "",
  });

  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetClients();

  const [clientsData, setClientsData] = useState([]);

  useEffect(() => {
    if (data) {
      setClientsData(data);
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: createClient,
    onSuccess: (data) => {
      toast.success("Клиент успешно добавлен");
      setClientsData((prev) => [...prev, data]);
    },

    onError: (error) => {
      toast.error(`Ошибка: ${error.response.data.message}`);
    },
  });

  const colDefs = useMemo(
    () => [
      { field: "companyName", headerName: "Компания" },
      { field: "contactName", headerName: "Контактное лицо" },
      { field: "phone", headerName: "Номер телефона" },
      { field: "status", headerName: "Статус" },
      { field: "projectType", headerName: "Тип проекта" },
    ],
    []
  );

  const onRowClicked = (event) => {
    navigate(`/client/${event.data.id}`, { state: event.data });
  };

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка загрузки данных</p>;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
    setForm({
      companyName: "",
      contactName: "",
      phone: "",
      email: "",
      budget: "",
      projectType: "",
      status: "",
    });
    handleClose();
    // refetch clients data
    useGetClients.refetch();
  };

  return (
    <Paper
      elevation={3}
      sx={{ borderRadius: 2, width: { xs: "100%", md: "calc(65% - 16px)" } }}
    >
      <Box sx={{ p: 2, display: "flex", gap: 2, flexWrap: "nowrap" }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Поиск клиентов..."
          size="small"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            },
          }}
        />
        <Tooltip title="Добавить клиента">
          <Button
            onClick={handleOpen}
            variant="contained"
            component="label"
            htmlFor="file-upload"
          >
            <Add />
          </Button>
        </Tooltip>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Добавить клиента</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                minWidth: { xs: "250px", md: "400px" },
              }}
            >
              <TextField
                label="Компания"
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                required
              />
              <TextField
                label="Контактное лицо"
                name="contactName"
                value={form.contactName}
                onChange={handleChange}
                required
              />
              <TextField
                label="Телефон"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
              <TextField
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <TextField
                label="Бюджет"
                name="budget"
                type="number"
                value={form.budget}
                onChange={handleChange}
                required
              />
              <TextField
                label="Тип проекта"
                name="projectType"
                value={form.projectType}
                onChange={handleChange}
                required
              />
              <TextField
                label="Статус"
                name="status"
                value={form.status}
                onChange={handleChange}
                required
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Отмена</Button>
              <Button type="submit" variant="contained">
                Создать
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Box>
      <div style={{ height: 400 }}>
        <AgGridReact
          theme={themeMaterial}
          rowData={clientsData}
          columnDefs={colDefs}
          onRowClicked={onRowClicked}
        />
      </div>
    </Paper>
  );
};

export default CustomDataGrid;
