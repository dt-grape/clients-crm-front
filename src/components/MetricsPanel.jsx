import { Box, Card, CardContent, Typography } from "@mui/material";

const metricsPanel = [
  { title: "Всего абитуриентов", value: "6" },
  { title: "Максимальный балл", value: "95" },
  { title: "Минимальный балл", value: "78" },
  { title: "Средний балл", value: "90" },
];

const MetricsPanel = () => {
  return (
    <Box
      sx={{
        mb: { xs: 0, md: 16 },
        display: "flex",
        flexWrap: "wrap",
        columnGap: 2,
        rowGap: 2,
        width: { xs: "100%", md: "calc(35% - 16px)" },
      }}
    >
      {metricsPanel.map((metric, index) => (
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "calc(50% - 8px)",
            },
          }}
          key={index}
        >
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                {metric.title}
              </Typography>
              <Typography variant="h4" color="primary">
                {metric.value}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default MetricsPanel;
