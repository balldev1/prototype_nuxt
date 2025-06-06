import { registerUser } from "~/server/service/authService";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password, firstname, lastname, role } = body;
  return await registerUser(email, password, firstname, lastname, role);
});
