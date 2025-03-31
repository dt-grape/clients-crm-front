import { Grid2, Card, CardContent, Typography } from "@mui/material";

const metricsPanel = [
  { title: "Всего абитуриентов", value: "3" },
  { title: "Максимальный балл", value: "400" },
  { title: "Минимальный балл", value: "230" },
  { title: "Средний балл", value: "333" },
];

const MetricsPanel = () => {
  return (
    <Grid2 container spacing={3} sx={{ mb: 4 }}>
      {metricsPanel.map((metric, index) => (
        <Grid2 item xs={12} sm={6} md={4} lg={2} key={index}>
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
        </Grid2>
      ))}
    </Grid2>
  );
};

export default MetricsPanel;
