import { getUserById } from "~/server/service/authService";
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

  const id = event.context.params?.id;

  if (!id) {
    throw createError({
      statusCode: 400,
      message: "User ID is required in route parameter",
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

    const user = await getUserById(id);

    if (!user) {
      throw createError({
        statusCode: 404,
        message: "User not found",
      });
    }

    return user;
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized: Invalid token",
    });
  }
});
