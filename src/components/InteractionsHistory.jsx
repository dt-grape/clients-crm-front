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

const InteractionsHistory = ({ comments = [] }) => {
  const interactionHistory = [
    ...comments.map((comment, index) => ({
      id: 1000 + index,
      user: "Виноградов Д.А.",
      action: `записал результат созвона: '${comment.text}'`,
      timestamp: "05.05.2025 14:30",
      icon: <CommentIcon color="secondary" />,
    })),
  ];

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        История взаимодействий
      </Typography>

      <List sx={{ position: "relative" }}>
        {interactionHistory.length === 0 ? (
          <ListItem>
            <Typography color="text.secondary">
              История взаимодействий пуста
            </Typography>
          </ListItem>
        ) : (
          interactionHistory.map((item, index) => (
            <>
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
                      <TimeIcon
                        fontSize="small"
                        sx={{ mr: 0.5, fontSize: 16 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {item.timestamp}
                      </Typography>
                    </Box>
                  }
                  sx={{ my: 0 }}
                />
              </ListItem>
            </>
          ))
        )}
      </List>
    </Paper>
  );
};

export default InteractionsHistory;
