import { api } from "./Api";

export const uploadImage = async (selectedImage: File) => {
  try {
    const formData = new FormData();

    formData.append("coverImage", selectedImage);
    const res = await api.post("/upload", formData);

    return res.data;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
};
