import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../utils/consts.js";

const usersApi = axios.create({
  baseURL: API_URL,
});

export const getMe = async () => {
  const { data } = await usersApi.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};

export const useGetMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });
};
