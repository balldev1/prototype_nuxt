import { logoutUser } from "~/server/service/authService";

export default defineEventHandler(async (event) => {
  return logoutUser(event);
});
