import axios from "axios";

export const login = async (email: string, password: string) => {
  if (!email || !password) {
    throw new Error("Please enter email and password");
  }

  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
    { email, password }
  );

  if (response.data.message !== "Login successful") {
    throw new Error("Login failed");
  }

  return response.data;
};

export const logout = async () => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/auth/logout`
  );

  if (response.data.message !== "Logout successful") {
    throw new Error("Logout failed");
  }

  return response.data;
};
