import React, { useEffect, useState } from "react";

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
  AccessTime as AccessTimeIcon,
  Email as EmailIcon,
  Call as CallIcon,
} from "@mui/icons-material";
import { useGetInteractionsByClient } from "../http/interactions";

const getActionIcon = (type) => {
  switch (type) {
    case "call":
      return <CallIcon color="primary" />;
    case "email":
      return <EmailIcon color="success" />;
    default:
      return <DotIcon color="action" />;
  }
};

const InteractionsHistory = ({ clientId }) => {
  const { data, isLoading, isError } = useGetInteractionsByClient(clientId);

  if (isLoading) {
    return <Typography>Загрузка...</Typography>;
  }
  if (isError) {
    return <Typography color="error">Ошибка загрузки истории</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        История взаимодействий
      </Typography>
      <List sx={{ position: "relative" }}>
        {!data || data.length === 0 ? (
          <ListItem>
            <Typography color="text.secondary">
              История взаимодействий пуста
            </Typography>
          </ListItem>
        ) : (
          data.map((item) => (
            <React.Fragment key={item.id}>
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
                <Avatar sx={{ bgcolor: "grey.100", mr: 2 }}>
                  {getActionIcon(item.type)}
                </Avatar>
                <ListItemText
                  primary={
                    <>
                      <Typography component="span" fontWeight="bold">
                        {item.User?.name || item.User?.email}
                      </Typography>
                    </>
                  }
                  secondary={
                    <Box
                      component="span"
                      sx={{
                        display: "flex",
                        alignItems: "start",
                        mt: 0.5,
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        {item.comment}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "start" }}>
                        <AccessTimeIcon
                          fontSize="small"
                          sx={{ mr: 0.5, fontSize: 16 }}
                        />
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ mr: 1 }}
                        >
                          {new Date(item.createdAt).toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                  }
                  sx={{ my: 0 }}
                />
              </ListItem>
            </React.Fragment>
          ))
        )}
      </List>
    </Paper>
  );
};

export default InteractionsHistory;
