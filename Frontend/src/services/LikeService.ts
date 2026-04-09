import axios from "axios";

export const toggleLike = async (id: string) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(
      `http://localhost:5000/api/stories/${id}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
