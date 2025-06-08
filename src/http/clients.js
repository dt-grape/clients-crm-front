import axios from "axios";
import { API_URL } from "../utils/consts";
import { useQuery } from "@tanstack/react-query";
const clientsApi = axios.create({
  baseURL: API_URL,
});

const getClients = async () => {
  const { data } = await clientsApi.get("/clients", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};

export const useGetClients = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
  });
};

export const getClient = async (clientId) => {
  const { data } = await axios.get(`${API_URL}/clients/${clientId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};

export const useGetClient = (id) => {
  return useQuery({
    queryKey: ["client", id],
    queryFn: () => getClient(id),
  });
};

export const createClient = async (clientData) => {
  const { data } = await axios.post(`${API_URL}/clients`, clientData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};

export const deleteClient = async (clientId) => {
  await axios.delete(`${API_URL}/clients/${clientId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const updateClient = async ({ id, ...clientData }) => {
  const { data } = await axios.put(`${API_URL}/clients/${id}`, clientData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};
