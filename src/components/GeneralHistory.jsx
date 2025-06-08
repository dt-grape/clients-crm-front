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
  Email as EmailIcon,
  Call as CallIcon,
  AccessTime as AccessTimeIcon,
} from "@mui/icons-material";

import { useGetInteractions } from "../http/interactions.js";

const getActionIcon = (type) => {
  switch (type) {
    case "call":
      return <CallIcon color="primary" />;
    case "email":
      return <EmailIcon color="success" />;
    default:
      return <CallIcon color="action" />;
  }
};

const GeneralHistory = () => {
  const { data, isLoading, isError } = useGetInteractions();

  if (isLoading) {
    return (
      <Typography variant="body1" color="text.secondary">
        Загрузка...
      </Typography>
    );
  }

  if (isError) {
    return (
      <Typography variant="body1" color="error">
        Ошибка загрузки данных
      </Typography>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: { xs: 1, sm: 2, md: 3 }, borderRadius: 2 }}>
      <List>
        {data.map((item) => (
          <React.Fragment key={item.id}>
            <ListItem alignItems="flex-start" sx={{ pl: 2, mb: 2 }}>
              <Avatar sx={{ bgcolor: "grey.100", mr: 2 }}>
                {getActionIcon(item.type)}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.User?.name}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  {item.comment}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  <Chip
                    size="small"
                    label={item.Client?.companyName}
                    variant="outlined"
                    color="primary"
                  />
                  <Chip
                    size="small"
                    label={item.Client?.contactName}
                    variant="outlined"
                    color="secondary"
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "end", mt: 1 }}>
                  <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="caption" color="text.secondary">
                    {new Date(item.createdAt).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default GeneralHistory;
