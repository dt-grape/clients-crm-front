import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  Divider,
  Avatar,
  Paper,
  Chip,
} from "@mui/material";
import {
  FiberManualRecord as DotIcon,
  Person as PersonIcon,
  Event as TimeIcon,
  AssignmentInd as StatusIcon,
  Email as EmailIcon,
  Comment as CommentIcon,
} from "@mui/icons-material";

const generalHistory = [
  {
    id: 1,
    student: {
      id: 1,
      name: "Масагутов Алмаз Викторович",
      profile: "Программирование",
    },
    user: "Виноградов Д. А.",
    action: "записал результат созвона",
    timestamp: "05.05.2025 14:30",
    type: "comment",
    details:
      "Абитуриент выбрал направление информационные системы и технологии",
  },
];

const getActionIcon = (type) => {
  switch (type) {
    case "status":
      return <StatusIcon color="primary" />;
    case "comment":
      return <CommentIcon color="secondary" />;
    case "email":
      return <EmailIcon color="success" />;
    default:
      return <PersonIcon color="info" />;
  }
};

const GeneralHistory = () => {
  return (
    <Paper elevation={3} sx={{ p: { xs: 1, sm: 2, md: 3 }, borderRadius: 2 }}>
      <List sx={{ position: "relative" }}>
        {generalHistory.map((item) => (
          <>
            <ListItem
              key={item.id}
              sx={{
                alignItems: "flex-start",
                pl: 2,
                position: "relative",
                mb: 2,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "grey.100",
                  mr: { xs: 1, sm: 1.5, md: 2 },
                  width: { xs: 32, sm: 36, md: 40 },
                  height: { xs: 32, sm: 36, md: 40 },
                }}
              >
                {getActionIcon(item.type)}
              </Avatar>

              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "flex-start", sm: "center" },
                    gap: 1,
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                  >
                    {item.user}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                  >
                    {item.action}
                  </Typography>
                </Box>

                <Box sx={{ mb: 1 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                  >
                    {item.details}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "flex-start", sm: "center" },
                    gap: { xs: 1, sm: 2 },
                  }}
                >
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Chip
                      size="small"
                      label={item.student.name}
                      variant="outlined"
                      color="primary"
                      sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                    />
                    <Chip
                      size="small"
                      label={item.student.profile}
                      variant="outlined"
                      color="secondary"
                      sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      ml: { xs: 0, sm: "auto" },
                      mt: { xs: 1, sm: 0 },
                    }}
                  >
                    <TimeIcon
                      fontSize="small"
                      sx={{ mr: 0.5, fontSize: { xs: 14, sm: 16 } }}
                    />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                    >
                      {item.timestamp}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </Paper>
  );
};

export default GeneralHistory;
