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

    const query = getQuery(event);

    const firstname = query.firstname as string | undefined;
    const lastname = query.lastname as string | undefined;
    const role = query.role as string | undefined;
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 10;

    const result = await getAllUsers({
      firstname,
      lastname,
      role,
      page,
      limit,
    });

    return result;
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized: Invalid token",
    });
  }
});
