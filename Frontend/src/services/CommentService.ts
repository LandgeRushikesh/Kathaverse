import { api } from "./Api";

export const fetchComments = async (
  id: string,
  page: Number,
  limit: Number,
) => {
  try {
    const res = await api.get(`/stories/${id}/comments`, {
      params: { page, limit },
    });

    return res.data;
  } catch (error) {
    console.error("Error Occurred:", error);
    throw error;
  }
};
