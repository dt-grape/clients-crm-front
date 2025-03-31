import { Box, Card, CardContent, Typography } from "@mui/material";

const metricsPanel = [
  { title: "Всего абитуриентов", value: "3" },
  { title: "Максимальный балл", value: "400" },
  { title: "Минимальный балл", value: "230" },
  { title: "Средний балл", value: "333" },
];

const MetricsPanel = () => {
  return (
    <Box
      sx={{
        mb: 4,
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        justifyContent: "space-between",
      }}
    >
      {metricsPanel.map((metric, index) => (
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "calc(50% - 16px)",
              md: "calc(25% - 16px)",
            },
            minWidth: {
              xs: "240px",
              sm: "200px",
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
