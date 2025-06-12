import axios from "axios";

export const getUser = async (filters = {}) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/auth`,
      {
        params: filters, // <== ส่ง query เช่น { firstname, role }
        withCredentials: true, // <== ส่ง cookie ด้วยถ้ามี auth
      }
    );

    return response.data;
  } catch (error) {
    console.error("Get User error:", error);
    throw new Error("Get User failed");
  }
};
