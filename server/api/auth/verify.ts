// server/api/auth/verify.ts
import { defineEventHandler, getCookie } from "h3";
import jwt from "jsonwebtoken";

export default defineEventHandler((event) => {
  const token = getCookie(event, "auth_token");
  const config = useRuntimeConfig();

  if (!token) return { valid: false };

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    return { valid: true, user: decoded };
  } catch {
    return { valid: false };
  }
});
