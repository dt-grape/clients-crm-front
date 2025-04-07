import React, { useState } from "react";
import { AgCharts } from "ag-charts-react";
import mockStudents from "../mock/mock";
import { Paper } from "@mui/material";

const StudentsChart = () => {
  const [options] = useState({
    title: {
      text: "Баллы абитуриентов",
    },
    height: 400,
    data: mockStudents.map((student) => ({
      id: student.student_id,
      name: student.name,
      points: student.total_points_with_achievements,
      profile: student.profile,
    })),
    series: [
      {
        type: "bar",
        xKey: "id",
        yKey: "points",
        yName: "Баллы",
        fill: "#1976d2",
      },
    ],
    axes: [
      {
        type: "category",
        position: "bottom",
        title: {
          text: "Абитуриенты",
        },
        label: {
          formatter: (params) => {
            const student = mockStudents.find(
              (s) => s.student_id === params.value
            );
            return student
              ? student.total_points_with_achievements
              : params.value;
          },
        },
      },
      {
        type: "number",
        position: "left",
        title: {
          text: "Баллы",
        },
      },
    ],
  });

  return (
    <Paper elevation={3} sx={{ borderRadius: 2 }}>
      <div
        style={{
          height: 400,
        }}
      >
        <AgCharts options={options} />
      </div>
    </Paper>
  );
};

export default StudentsChart;
