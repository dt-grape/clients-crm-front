import { Box, Card, CardContent, Typography } from "@mui/material";
import { useGetClients } from "../http/clients";

const MetricsPanel = () => {
  const { data: clients, isLoading, isError } = useGetClients();

  if (isLoading) {
    return <Typography>Загрузка метрик...</Typography>;
  }
  if (isError || !clients) {
    return (
      <Typography color="error">Ошибка загрузки данных клиентов</Typography>
    );
  }

  const budgets = clients.map((client) => client?.budget || 0);
  const totalClients = clients.length;
  const maxBudget = budgets.length ? Math.max(...budgets) : 0;
  const minBudget = budgets.length ? Math.min(...budgets) : 0;
  const avgBudget = budgets.length
    ? Math.round(budgets.reduce((a, b) => a + b, 0) / totalClients)
    : 0;

  const metricsPanel = [
    { title: "Всего клиентов", value: totalClients },
    {
      title: "Макс. бюджет",
      value: maxBudget.toLocaleString("ru-RU") + " ₽",
    },
    {
      title: "Мин. бюджет",
      value: minBudget.toLocaleString("ru-RU") + " ₽",
    },
    {
      title: "Средний бюджет",
      value: avgBudget.toLocaleString("ru-RU") + " ₽",
    },
  ];

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
