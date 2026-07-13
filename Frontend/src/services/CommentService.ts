import { api } from "./Api";

export const fetchComments = async (
  id: string,
  page: number,
  limit: number,
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

export const postComment = async (id: string, content: string) => {
  try {
    const res = await api.post(`/stories/${id}/comments`, { content });

    return res;
  } catch (error) {
    console.error("Error Occurred:", error);
    throw error;
  }
};
