import React, { useMemo } from "react";
import { AgCharts } from "ag-charts-react";
import mockStudents from "../mock/mock";
import { Paper } from "@mui/material";
const StudentsByProfileChart = () => {
  const options = useMemo(() => {
    const profileCounts = mockStudents.reduce((acc, student) => {
      acc[student.profile] = (acc[student.profile] || 0) + 1;
      return acc;
    }, {});

    const data = Object.entries(profileCounts).map(([profile, count]) => ({
      profile,
      count,
      percentage: ((count / mockStudents.length) * 100).toFixed(1),
    }));

    return {
      title: {
        text: "Распределение абитуриентов по направлениям",
      },
      data,
      height: 400,
      series: [
        {
          type: "pie",
          angleKey: "count",
          calloutLabelKey: "profile",
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
                title: datum.profile,
                content: `${datum.count} студентов (${datum.percentage}%)`,
              };
            },
          },
        },
      ],
    };
  }, []);

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

export default StudentsByProfileChart;
