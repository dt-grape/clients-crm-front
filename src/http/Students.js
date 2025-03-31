import axios from "axios";
import { API_URL } from "../utils/consts";
import { useQuery } from "@tanstack/react-query";
const studentsApi = axios.create({
  baseURL: API_URL,
});

const getStudents = async () => {
  const { data } = await studentsApi.get("/students", {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
    withCredentials: true,
  });
  return data;
};

export const useGetStudents = () => {
  return useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });
};

export const getStudent = async (student_id) => {
  const { data } = await axios.get(
    `${API_URL}/students/?student_id=${student_id}`,
    {
      headers: {
        "ngrok-skip-browser-warning": "true",
    },
    withCredentials: true,
  });
  return data;
};

export const useGetStudent = (id) => {
  return useQuery({
    queryKey: ["student", id],
    queryFn: () => getStudent(id),
  });
};
