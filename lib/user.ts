import axios from "axios";

export const getUserById = async (id: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/auth/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Get User By ID error:", error);
    throw new Error("Get User by ID failed");
  }
};

export const getUser = async (filters = {}) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/auth`,
      {
        params: filters,
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Get User error:", error);
    throw new Error("Get User failed");
  }
};

export const patchUser = async (id: string, updateData: any) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_API_BASE_URL}/auth/${id}`,
      updateData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Get User error:", error);
    throw new Error("Get User failed");
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/auth/${id}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Get User error:", error);
    throw new Error("Get User failed");
  }
};
