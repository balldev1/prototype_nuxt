import { deleteUser } from "~/server/service/authService";
import { createError, getCookie } from "h3";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  role: string;
}

export default defineEventHandler(async (event) => {
  if (event.method !== "DELETE") {
    throw createError({
      statusCode: 405,
      message: "Method not allowed",
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
        message: "Forbidden: Only admin can delete users",
      });
    }

    return await deleteUser(id);
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized: Invalid token",
    });
  }
});
