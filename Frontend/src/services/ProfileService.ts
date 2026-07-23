import { api } from "./Api";

export const getUserProfile = async (id: string) => {
  try {
    const res = await api.get(`/users/${id}`);

    return res.data;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
};
