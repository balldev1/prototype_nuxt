import axios from "axios";

export const getUser = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/auth`
    );

    return response.data;
  } catch (error) {
    console.error("Get User error:", error);
  }
  throw new Error("Get User failed");
};
