import { api } from "./Api";

export const toggleLike = async (id: string) => {
  try {
    const res = await api.post(`/stories/${id}/like`);

    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
