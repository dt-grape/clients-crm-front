import axios from "axios";
import { API_URL } from "../utils/consts.js";
import { useQuery } from "@tanstack/react-query";

const interactionsApi = axios.create({
  baseURL: API_URL,
});

export const getInteractions = async () => {
  const { data } = await interactionsApi.get("/interactions", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  console.log(data);
  return data;
};

export const useGetInteractions = () => {
  return useQuery({
    queryKey: ["interactions"],
    queryFn: getInteractions,
  });
};

export const getInteractionsByClient = async (clientId) => {
  const { data } = await interactionsApi.get(
    `/interactions/client/${clientId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  );
  return data;
};

export const useGetInteractionsByClient = (clientId) => {
  return useQuery({
    queryKey: ["interactions", clientId],
    queryFn: () => getInteractionsByClient(clientId),
  });
};

export const createInteraction = async (interactionData) => {
  const { data } = await interactionsApi.post(
    "/interactions",
    interactionData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  );
  return data;
};
