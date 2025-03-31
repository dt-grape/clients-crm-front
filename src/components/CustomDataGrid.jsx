import React, { useMemo, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import { useGetStudents } from "../http/Students";

const CustomDataGrid = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetStudents();

  const colDefs = useMemo(
    () => [
      { field: "name", headerName: "ФИО", filter: true },
      { field: "status.title", headerName: "Статус" },
      { field: "profile", headerName: "Направление" },
      { field: "total_points", headerName: "Баллы" },
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

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка загрузки данных</p>;

  return (
    <div style={{ height: 400, width: "100%" }}>
      <AgGridReact
        rowData={data}
        columnDefs={colDefs}
        onRowDoubleClicked={onRowClicked}
      />
    </div>
  );
};

export default CustomDataGrid;
