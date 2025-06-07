// server/api/secure/hello.ts
import { defineEventHandler, getCookie, createError } from "h3";
import jwt from "jsonwebtoken";

export default defineEventHandler((event) => {
  const token = getCookie(event, "auth_token");
  const config = useRuntimeConfig();

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized: No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);

    return { message: "Hello, world!", user: decoded };
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized: Invalid token",
    });
  }
});
