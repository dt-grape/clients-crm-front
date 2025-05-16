import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Container } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useGetStudent } from "../http/Students";

import mockStudents from "../mock/mock";
import StudentInfoCard from "../components/StudentInfoCard";
import InteractionsHistory from "../components/InteractionsHistory";

const StudentDetails = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const student = mockStudents.find(
    (student) => student.student_id === Number(studentId)
  );

  // const { data: student, isLoading, isError } = useGetStudent(studentId);
  const [comments, setComments] = useState([]);

  const handleEdit = () => {
    // TODO: Implement edit functionality
    console.log("Edit student:", student);
  };

  const handleDelete = () => {
    // TODO: Implement delete functionality
    console.log("Delete student:", student);
  };

  // if (isLoading) {
  //   return (
  //     <Container sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
  //       <CircularProgress />
  //     </Container>
  //   );
  // }

  // if (isError) {
  //   return (
  //     <Container sx={{ textAlign: "center", mt: 5 }}>
  //       <Typography variant="h6" color="error">
  //         Ошибка загрузки данных
  //       </Typography>
  //       <Button onClick={() => navigate(-1)}>Назад</Button>
  //     </Container>
  //   );
  // }

  const handleAddComment = (commentText) => {
    const newComment = {
      text: commentText,
      timestamp: new Date()
        .toLocaleString("ru-RU", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })
        .replace(",", ""),
    };
    setComments([...comments, newComment]);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingBlock: "10px",
      }}
    >
      <Box sx={{ width: "100%", margin: "0 auto" }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 2 }}
        >
          Назад
        </Button>

        <StudentInfoCard
          student={student}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAddComment={handleAddComment}
        />
        <InteractionsHistory comments={comments} />
      </Box>
    </Container>
  );
};

export default StudentDetails;
