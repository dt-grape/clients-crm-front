import React, { useMemo } from "react";
import { AgCharts } from "ag-charts-react";
import { Paper, Typography } from "@mui/material";
import { useGetClients } from "../http/clients";

const ClientsBudgetChart = () => {
  const { data: clients, isLoading, isError } = useGetClients();

  const chartData = useMemo(
    () =>
      clients?.map((client) => ({
        id: client.id,
        company: client.companyName,
        budget: client.budget || 0,
      })) || [],
    [clients],
  );

  const options = useMemo(
    () => ({
      title: {
        text: "Бюджет по клиентам",
      },
      height: 400,
      data: chartData,
      series: [
        {
          type: "bar",
          xKey: "company",
          yKey: "budget",
          yName: "Бюджет",
          fill: "#1976d2",
        },
      ],
      axes: [
        {
          type: "category",
          position: "bottom",
          title: {
            text: "Клиенты",
          },
          label: {
            rotation: 30,
          },
        },
        {
          type: "number",
          position: "left",
          title: {
            text: "Бюджет, ₽",
          },
          label: {
            formatter: (params) => params.value.toLocaleString("ru-RU"),
          },
        },
      ],
      tooltip: {
        renderer: ({ datum }) => ({
          title: datum.company,
          content: `Бюджет: ${datum.budget?.toLocaleString("ru-RU") || 0} ₽`,
        }),
      },
    }),
    [chartData],
  );

  if (isLoading) {
    return (
      <Paper
        elevation={3}
        sx={{
          borderRadius: 2,
          width: { xs: "100%", md: "calc(35% - 16px)" },
          p: 2,
        }}
      >
        <Typography>Загрузка данных...</Typography>
      </Paper>
    );
  }

  if (isError) {
    return (
      <Paper
        elevation={3}
        sx={{
          borderRadius: 2,
          width: { xs: "100%", md: "calc(35% - 16px)" },
          p: 2,
        }}
      >
        <Typography color="error">Ошибка загрузки данных клиентов</Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{ borderRadius: 2, width: { xs: "100%", md: "calc(35% - 16px)" } }}
    >
      <div style={{ height: 400 }}>
        <AgCharts options={options} />
      </div>
    </Paper>
  );
};

export default ClientsBudgetChart;
