import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteClient, updateClient } from "../http/clients.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createInteraction } from "../http/interactions.js";

const ClientInfoCard = ({ client, onClientUpdate }) => {
  const navigate = useNavigate();
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [clientData, setClientData] = useState({
    companyName: client.companyName || "",
    contactName: client.contactName || "",
    phone: client.phone || "",
    email: client.email || "",
    budget: client.budget || "",
    projectType: client.projectType || "",
    status: client.status || "",
  });

  const [commentType, setCommentType] = useState("call");
  const [commentText, setCommentText] = useState("");

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      toast.success("Клиент успешно удален");
      navigate("/");
    },
    onError: (error) => {
      toast.error(`Ошибка: ${error.response.data.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateClient,
    onSuccess: (data) => {
      toast.success("Данные клиента успешно обновлены");
      setOpenEditDialog(false);
      if (onClientUpdate) {
        onClientUpdate(data);
      }
    },
    onError: (error) => {
      toast.error(`Ошибка: ${error.response.data.error}`);
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: createInteraction,
    onSuccess: () => {
      toast.success("Комментарий успешно добавлен");
      setOpenCommentDialog(false);
      queryClient.invalidateQueries(["interactions", client.id]);
    },
    onError: (error) => {
      toast.error(`Ошибка: ${error.response.data.message}`);
    },
  });

  const formatBudget = (budget) => {
    if (typeof budget === "number") {
      return budget.toLocaleString("ru-RU", {
        style: "currency",
        currency: "RUB",
      });
    }
    return budget;
  };

  const handleDeleteClient = () => {
    deleteMutation.mutate(client.id);
  };

  const handleSave = () => {
    const updatedClient = {
      ...client,
      companyName: document.getElementById("companyName").value,
      contactName: document.getElementById("contactName").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      budget: document.getElementById("budget").value,
      projectType: document.getElementById("projectType").value,
      status: document.getElementById("status").value,
    };

    updateMutation.mutate({ id: client.id, ...updatedClient });
  };

  const handleAddComment = () => {
    if (!commentText) {
      toast.error("Комментарий не может быть пустым");
      return;
    }
    addCommentMutation.mutate({
      clientId: client.id,
      date: new Date().toISOString(),
      type: commentType,
      comment: commentText,
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ width: 80, height: 80, fontSize: 40 }}>
            {client.contactName ? client.contactName[0] : "?"}
          </Avatar>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontSize: {
                xs: "1.5rem",
                sm: "2.125rem",
              },
            }}
          >
            {`${client.contactName}`}
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          <Box sx={{ flex: 1, minWidth: "250px" }}>
            <Typography variant="h6" gutterBottom>
              Основная информация
            </Typography>
            <Typography variant="body1">
              <strong>Название компании:</strong> {client.companyName}
            </Typography>
            <Typography variant="body1">
              <strong>Тип проекта:</strong> {client.projectType}
            </Typography>
            <Typography variant="body1">
              <strong>Статус:</strong> {client.status}
            </Typography>
            <Typography variant="body1">
              <strong>Бюджет:</strong> {formatBudget(client.budget)}
            </Typography>
          </Box>

          <Box sx={{ flex: 1, minWidth: "250px" }}>
            <Typography variant="h6" gutterBottom>
              Контактные данные
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {client.email}
            </Typography>
            <Typography variant="body1">
              <strong>Телефон:</strong> {client.phone}
            </Typography>
          </Box>
        </Box>

        <Divider />

        <Box>
          <Dialog
            open={Boolean(openCommentDialog)}
            onClose={() => setOpenCommentDialog(false)}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>Добавить комментарий</DialogTitle>
            <DialogContent>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="type-label">Тип</InputLabel>
                <Select
                  labelId="type-label"
                  value={commentType}
                  label="Тип"
                  onChange={(e) => setCommentType(e.target.value)}
                >
                  <MenuItem value="call">Звонок</MenuItem>
                  <MenuItem value="email">Email</MenuItem>
                </Select>
              </FormControl>
              <TextField
                autoFocus
                margin="dense"
                label="Комментарий"
                type="text"
                fullWidth
                multiline
                rows={4}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenCommentDialog(false)}>
                Отмена
              </Button>
              <Button variant="contained" onClick={handleAddComment}>
                Сохранить
              </Button>
            </DialogActions>
          </Dialog>
        </Box>

        <Box>
          <Dialog
            open={Boolean(openEditDialog)}
            onClose={() => setOpenEditDialog(false)}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>Редактировать данные</DialogTitle>
            <DialogContent>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 2, py: 2 }}
              >
                <TextField
                  id="companyName"
                  label="Название компании"
                  fullWidth
                  value={clientData.companyName}
                  onChange={(e) =>
                    setClientData({
                      ...clientData,
                      companyName: e.target.value,
                    })
                  }
                />
                <TextField
                  id="contactName"
                  label="Контактное лицо"
                  fullWidth
                  value={clientData.contactName}
                  onChange={(e) =>
                    setClientData({
                      ...clientData,
                      contactName: e.target.value,
                    })
                  }
                />
                <TextField
                  id="phone"
                  label="Телефон"
                  fullWidth
                  value={clientData.phone}
                  onChange={(e) =>
                    setClientData({
                      ...clientData,
                      phone: e.target.value,
                    })
                  }
                />
                <TextField
                  id="email"
                  label="Email"
                  fullWidth
                  value={clientData.email}
                  onChange={(e) =>
                    setClientData({
                      ...clientData,
                      email: e.target.value,
                    })
                  }
                />
                <TextField
                  id="budget"
                  label="Бюджет"
                  fullWidth
                  value={clientData.budget}
                  onChange={(e) =>
                    setClientData({
                      ...clientData,
                      budget: e.target.value,
                    })
                  }
                />
                <TextField
                  id="projectType"
                  label="Тип проекта"
                  fullWidth
                  value={clientData.projectType}
                  onChange={(e) =>
                    setClientData({
                      ...clientData,
                      projectType: e.target.value,
                    })
                  }
                />
                <TextField
                  id="status"
                  label="Статус"
                  fullWidth
                  value={clientData.status}
                  onChange={(e) =>
                    setClientData({
                      ...clientData,
                      status: e.target.value,
                    })
                  }
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenEditDialog(false)}>Отмена</Button>
              <Button variant="contained" onClick={handleSave}>
                Сохранить
              </Button>
            </DialogActions>
          </Dialog>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenEditDialog(true)}
              fullWidth
              sx={{ minHeight: "36px" }}
            >
              Редактировать
            </Button>

            <Button
              variant="contained"
              onClick={() => setOpenCommentDialog(true)}
              color="success"
              fullWidth
              sx={{ minHeight: "36px" }}
            >
              Добавить комментарий
            </Button>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={() => {
                if (window.confirm("Вы уверены, что хотите удалить клиента?")) {
                  handleDeleteClient();
                }
              }}
              sx={{ minHeight: "36px" }}
            >
              Удалить
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default ClientInfoCard;
