import { getAllUsers } from "~/server/service/authService";
import { defineEventHandler, getCookie, createError } from "h3";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  role: string;
}

export default defineEventHandler(async (event) => {
  if (event.method !== "GET") {
    throw createError({
      statusCode: 405,
      message: "Method Not Allowed",
    });
  }

  const token = getCookie(event, "auth_token");
  const config = useRuntimeConfig();

  if (!token) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized: No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload;

    if (decoded.role !== "admin") {
      throw createError({
        statusCode: 403,
        message: "Forbidden: Only admin can view all users",
      });
    }

    const users = await getAllUsers();
    return users;
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized: Invalid token",
    });
  }
});
