import { api } from "./Api";

export const loginUser = async (email: string, password: string) => {
  try {
    const res = await api.post("/users/login", {
      email,
      password,
    });

    return res.data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const res = await api.post("/users/register", {
      name,
      email,
      password,
    });

    return res.data;
  } catch (error) {
    console.error("Registration Error:", error);
    throw error;
  }
};
