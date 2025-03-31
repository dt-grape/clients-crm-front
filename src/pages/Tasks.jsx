import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  TextField,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import { Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import Header from "../components/Header.jsx"; // Иконки для удаления и добавления

const initialTasks = [
  {
    id: 1,
    text: "Позвонить абитуриенту Иванову",
    completed: false,
  },
  {
    id: 2,
    text: "Отправить документы на проверку",
    completed: true,
  },
  {
    id: 3,
    text: "Подготовить отчет по зачисленным",
    completed: false,
  },
];

const Tasks = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");

  // Добавление новой задачи
  const handleAddTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask,
        completed: false,
      };
      setTasks([...tasks, task]);
      setNewTask("");
    }
  };

  // Удаление задачи
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Изменение статуса задачи (выполнено/не выполнено)
  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  return (
    <>
      <Header />
      <Box sx={{ p: 3, maxWidth: 800, margin: "0 auto" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Напоминания и задачи
        </Typography>

        <Paper elevation={3} sx={{ p: 2 }}>
          {/* Форма для добавления новой задачи */}
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Добавить новую задачу"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <Button variant="contained" onClick={handleAddTask}>
              <AddIcon />
            </Button>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Список задач */}
          <List>
            {tasks.map((task) => (
              <ListItem key={task.id} dense>
                <Checkbox
                  checked={task.completed}
                  onChange={() => handleToggleTask(task.id)}
                />
                <ListItemText
                  primary={task.text}
                  sx={{
                    textDecoration: task.completed ? "line-through" : "none",
                    color: task.completed ? "text.secondary" : "text.primary",
                  }}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </>
  );
};

export default Tasks;
