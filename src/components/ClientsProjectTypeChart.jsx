import React, { useMemo } from "react";
import { AgCharts } from "ag-charts-react";
import { Paper, Typography } from "@mui/material";
import { useGetClients } from "../http/clients";

const ClientsProjectTypeChart = () => {
  const { data: clients, isLoading, isError } = useGetClients();

  const options = useMemo(() => {
    if (!clients) return {};

    const typeCounts = clients.reduce((acc, client) => {
      acc[client.projectType] = (acc[client.projectType] || 0) + 1;
      return acc;
    }, {});

    const data = Object.entries(typeCounts).map(([projectType, count]) => ({
      projectType,
      count,
      percentage: ((count / clients.length) * 100).toFixed(1),
    }));

    return {
      title: {
        text: "Распределение клиентов по типу проекта",
      },
      data,
      height: 400,
      series: [
        {
          type: "pie",
          angleKey: "count",
          calloutLabelKey: "projectType",
          sectorLabelKey: "percentage",
          sectorLabel: {
            color: "white",
            fontWeight: "bold",
          },
          fills: ["#1976d2", "#2e7d32", "#ed6c02", "#9c27b0"],
          strokes: ["#1565c0", "#2e7d32", "#e65100", "#7b1fa2"],
          highlightStyle: {
            item: {
              fill: "rgb(3, 3, 61)",
            },
          },
          tooltip: {
            renderer: ({ datum }) => {
              return {
                title: datum.projectType,
                content: `${datum.count} клиентов (${datum.percentage}%)`,
              };
            },
          },
        },
      ],
    };
  }, [clients]);

  if (isLoading) {
    return (
      <Paper
        elevation={3}
        sx={{
          borderRadius: 2,
          width: { xs: "100%", md: "calc(65% - 16px)" },
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
          width: { xs: "100%", md: "calc(65% - 16px)" },
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
      sx={{ borderRadius: 2, width: { xs: "100%", md: "calc(65% - 16px)" } }}
    >
      <div style={{ height: 400 }}>
        <AgCharts options={options} />
      </div>
    </Paper>
  );
};

export default ClientsProjectTypeChart;
