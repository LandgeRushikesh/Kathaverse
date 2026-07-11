import { api } from "./Api";

export const getAllStories = async (page: number, limit: number) => {
  try {
    const res = await api.get("/stories", {
      params: { page, limit },
    });

    return res.data; //as res is like {data:{success:...,data:{},pagination:{}}}
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
};

export const createStory = async () => {
  try {
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
};
