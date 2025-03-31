import React, { useMemo, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import { themeMaterial } from "ag-grid-community";
import { useNavigate } from "react-router-dom";
import { useGetStudents } from "../http/Students";

import mockStudents from "../mock/mock";
import { Paper } from "@mui/material";

const CustomDataGrid = () => {
  const navigate = useNavigate();

  // const { data, isLoading, isError } = useGetStudents();

  const colDefs = useMemo(
    () => [
      { field: "name", headerName: "ФИО", filter: true },
      { field: "status.title", headerName: "Статус" },
      { field: "profile", headerName: "Направление" },
      { field: "total_points_with_achievements", headerName: "Баллы" },
      {
        field: "is_dormitory_needed",
        headerName: "Общежитие",
        valueFormatter: (params) => (params.value ? "Да" : "Нет"),
      },
    ],
    []
  );

  const onRowClicked = (event) => {
    navigate(`/student/${event.data.student_id}`, { state: event.data });
  };

  // if (isLoading) return <p>Загрузка...</p>;
  // if (isError) return <p>Ошибка загрузки данных</p>;

  return (
    <Paper elevation={3} sx={{ borderRadius: 2 }}>
      <div style={{ height: 400, width: "100%" }}>
        <AgGridReact
          theme={themeMaterial}
          rowData={mockStudents}
          columnDefs={colDefs}
          onRowClicked={onRowClicked}
        />
      </div>
    </Paper>
  );
};

export default CustomDataGrid;
