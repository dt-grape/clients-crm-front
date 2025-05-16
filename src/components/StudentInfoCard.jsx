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

const StudentInfoCard = ({ student, onEdit, onDelete, onAddComment }) => {
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedStudent, setEditedStudent] = useState(student);

  const handleAddComment = () => {
    if (commentText.trim()) {
      onAddComment(commentText);
      setCommentText("");
    }
    setOpenCommentDialog(false);
  };

  const handleSaveEdit = () => {
    onEdit(editedStudent);
    setOpenEditDialog(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ width: 80, height: 80, fontSize: 40 }}>
            {student.name[0]}
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
                  label="ФИО"
                  fullWidth
                  value={editedStudent?.name || ""}
                  onChange={(e) =>
                    setEditedStudent({ ...editedStudent, name: e.target.value })
                  }
                />
                <TextField
                  label="Email"
                  fullWidth
                  value={editedStudent?.email || ""}
                  onChange={(e) =>
                    setEditedStudent({
                      ...editedStudent,
                      email: e.target.value,
                    })
                  }
                />
                <TextField
                  label="Телефон"
                  fullWidth
                  value={editedStudent?.phone_number || ""}
                  onChange={(e) =>
                    setEditedStudent({
                      ...editedStudent,
                      phone_number: e.target.value,
                    })
                  }
                />
                <TextField
                  label="Мобильный телефон"
                  fullWidth
                  value={editedStudent?.cellphone_number || ""}
                  onChange={(e) =>
                    setEditedStudent({
                      ...editedStudent,
                      cellphone_number: e.target.value,
                    })
                  }
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenEditDialog(false)}>Отмена</Button>
              <Button onClick={handleSaveEdit} variant="contained">
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
              Записать результат созвона
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
      </Box>
    </Paper>
  );
};

export default StudentInfoCard;
