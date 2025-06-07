import { updateUser } from "~/server/service/authService";
import { defineEventHandler, getCookie, createError, readBody } from "h3";
import jwt, { decode } from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  role: string;
}

export default defineEventHandler(async (event) => {
  if (event.method !== "PATCH") {
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
      statusMessage: "Unauthorized: No token provided",
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
        statusMessage: "Forbidden: You are not allowed to update this user",
      });
    }

    const body = await readBody(event);
    return await updateUser(id, body);
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized: Invalid token",
    });
  }
});
