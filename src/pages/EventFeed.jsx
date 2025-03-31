import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Paper,
} from "@mui/material";
import {
  AssignmentInd as StatusIcon,
  Comment as CommentIcon,
  Email as EmailIcon,
  PersonAdd as AddIcon,
} from "@mui/icons-material";
import Header from "../components/Header.jsx";

const events = [
  {
    id: 1,
    type: "status",
    user: "Иванов Иван",
    description: "Статус изменен на 'Зачислен'",
    timestamp: "2023-10-01 14:30",
  },
  {
    id: 2,
    type: "comment",
    user: "Петров Петр",
    description: "Добавлен комментарий: 'Необходимо уточнить документы'",
    timestamp: "2023-10-01 15:00",
  },
  {
    id: 3,
    type: "email",
    user: "Сидорова Анна",
    description: "Отправлено письмо с подтверждением зачисления",
    timestamp: "2023-10-02 10:15",
  },
  {
    id: 4,
    type: "add",
    user: "Кузнецов Дмитрий",
    description: "Абитуриент добавлен в систему",
    timestamp: "2023-10-02 11:45",
  },
];

const EventFeed = () => {
  const getEventIcon = (type) => {
    switch (type) {
      case "status":
        return <StatusIcon color="primary" />;
      case "comment":
        return <CommentIcon color="secondary" />;
      case "email":
        return <EmailIcon color="success" />;
      case "add":
        return <AddIcon color="info" />;
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <Box sx={{ p: 3, maxWidth: 800, margin: "0 auto" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Лента событий
        </Typography>

        <Paper elevation={3} sx={{ p: 2 }}>
          <List>
            {events.map((event) => (
              <React.Fragment key={event.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar>{getEventIcon(event.type)}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body1" fontWeight="bold">
                        {event.user}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.primary">
                          {event.description}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {event.timestamp}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Box>
    </>
  );
};

export default EventFeed;
