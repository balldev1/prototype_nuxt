import { loginUser } from "~/server/service/authService";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;
  return await loginUser(event, email, password);
});
