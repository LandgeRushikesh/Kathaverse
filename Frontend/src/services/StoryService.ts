import axios from "axios";

export const getAllStories = async (page: number, limit: number) => {
  try {
    const res = await axios.get("http://localhost:5000/api/stories", {
      params: { page, limit },
    });

    return res.data; //as res is like {data:{success:...,data:{},pagination:{}}}
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
};
