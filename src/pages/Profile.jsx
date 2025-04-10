import { Box, Typography } from "@mui/material";

const Profile = () => {
  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        bgcolor: "background.paper",
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: "bold",
          textAlign: { xs: "center", md: "left" },
        }}
      >
        Профиль
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        <Box
          sx={{
            flex: 1,
            bgcolor: "grey.50",
            p: 3,
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              pb: 1,
              borderBottom: "2px solid",
              borderColor: "primary.main",
              color: "text.primary",
              fontWeight: "bold",
            }}
          >
            Личная информация
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Typography
              sx={{
                p: 1.5,
                bgcolor: "white",
                borderRadius: 1,
                "& strong": { color: "text.secondary", mr: 1 },
              }}
            >
              <strong>ФИО:</strong> Дмитрий
            </Typography>
            <Typography
              sx={{
                p: 1.5,
                bgcolor: "white",
                borderRadius: 1,
                "& strong": { color: "text.secondary", mr: 1 },
              }}
            >
              <strong>Email:</strong> dmitriy@gmail.com
            </Typography>
            <Typography
              sx={{
                p: 1.5,
                bgcolor: "white",
                borderRadius: 1,
                "& strong": { color: "text.secondary", mr: 1 },
              }}
            >
              <strong>Телефон:</strong> +7 (999) 123-45-67
            </Typography>
            <Typography
              sx={{
                p: 1.5,
                bgcolor: "white",
                borderRadius: 1,
                "& strong": { color: "text.secondary", mr: 1 },
              }}
            >
              <strong>Должность:</strong> Админ
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
