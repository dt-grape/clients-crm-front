import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Divider,
  Button,
  Container,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useGetStudent } from "../http/Students";

const StudentDetails = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const { data: student, isLoading, isError } = useGetStudent(studentId);

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
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ p: 3, maxWidth: 800, margin: "0 auto" }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 2 }}
        >
          Назад
        </Button>

        <Paper elevation={3} sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ width: 80, height: 80, fontSize: 40 }}>
                  {student.name[0]}
                </Avatar>
                <Typography variant="h4" component="h1">
                  {student.name}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Основная информация
              </Typography>
              <Typography variant="body1">
                <strong>Статус:</strong> {student.status.title}
              </Typography>
              <Typography variant="body1">
                <strong>Баллы:</strong> {student.total_points_with_achievements}
              </Typography>
              <Typography variant="body1">
                <strong>Тип экзамена:</strong> {student.exam_type}
              </Typography>
              <Typography variant="body1">
                <strong>Профиль:</strong> {student.profile}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Контактные данные
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {student.email}
              </Typography>
              <Typography variant="body1">
                <strong>Телефон:</strong> {student.phone_number || "Не указан"}
              </Typography>
              <Typography variant="body1">
                <strong>Мобильный:</strong>{" "}
                {student.cellphone_number || "Не указан"}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button variant="contained" color="primary">
                  Редактировать
                </Button>
                <Button variant="outlined" color="error">
                  Удалить
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default StudentDetails;
