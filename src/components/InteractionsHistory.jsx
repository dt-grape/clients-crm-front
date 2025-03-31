import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Paper,
} from "@mui/material";
import {
  FiberManualRecord as DotIcon,
  Person as PersonIcon,
  Event as TimeIcon,
  AssignmentInd as StatusIcon,
  Email as EmailIcon,
  Comment as CommentIcon,
} from "@mui/icons-material";

const interactionHistory = [
  {
    id: 1,
    user: "Иванова А.П.",
    action: "изменил статус на 'Зачислен'",
    timestamp: "2023-10-15 14:30",
    icon: <StatusIcon color="primary" />,
  },
  {
    id: 2,
    user: "Петров С.М.",
    action: "добавил комментарий: 'Необходимо уточнить документы'",
    timestamp: "2023-10-14 11:15",
    icon: <CommentIcon color="secondary" />,
  },
  {
    id: 3,
    user: "Сидорова Е.В.",
    action: "отправил письмо с подтверждением",
    timestamp: "2023-10-13 09:45",
    icon: <EmailIcon color="success" />,
  },
  {
    id: 4,
    user: "Козлов Д.И.",
    action: "изменил статус общежития",
    timestamp: "2023-10-10 16:20",
    icon: <PersonIcon color="info" />,
  },
];

const InteractionsHistory = () => {
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        История взаимодействий
      </Typography>

      <List sx={{ position: "relative" }}>
        <Divider
          orientation="vertical"
          sx={{
            position: "absolute",
            left: 24,
            top: 0,
            bottom: 0,
            height: "100%",
            borderRightWidth: 2,
            borderColor: "divider",
          }}
        />

        {interactionHistory.map((item, index) => (
          <ListItem
            key={item.id}
            sx={{
              alignItems: "flex-start",
              pl: 5,
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: 18,
                top: 24,
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DotIcon sx={{ fontSize: 8, color: "white" }} />
            </Box>

            <Avatar sx={{ bgcolor: "grey.100", mr: 2 }}>{item.icon}</Avatar>

            <ListItemText
              primary={
                <>
                  <Typography component="span" fontWeight="bold">
                    {item.user}
                  </Typography>
                  <Typography component="span" sx={{ ml: 1 }}>
                    {item.action}
                  </Typography>
                </>
              }
              secondary={
                <Box
                  component="span"
                  sx={{ display: "flex", alignItems: "center", mt: 0.5 }}
                >
                  <TimeIcon fontSize="small" sx={{ mr: 0.5, fontSize: 16 }} />
                  <Typography variant="caption" color="text.secondary">
                    {item.timestamp}
                  </Typography>
                </Box>
              }
              sx={{ my: 0 }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default InteractionsHistory;
