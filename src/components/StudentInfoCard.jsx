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
} from "@mui/material";

const StudentInfoCard = ({ student, onEdit, onDelete }) => {
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleAddComment = () => {
    console.log("Comment added:", commentText);
    setOpenCommentDialog(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ width: 80, height: 80, fontSize: 40 }}>
            {student.name[0]}
          </Avatar>
          <Typography variant="h4" component="h1">
            {student.name}
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          <Box sx={{ flex: 1, minWidth: "250px" }}>
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
          </Box>

          <Box sx={{ flex: 1, minWidth: "250px" }}>
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
              <Button onClick={handleAddComment} variant="contained">
                Сохранить
              </Button>
            </DialogActions>
          </Dialog>
        </Box>

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
            onClick={onEdit}
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
            onClick={onDelete}
            fullWidth
            sx={{ minHeight: "36px" }}
          >
            Удалить
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default StudentInfoCard;
