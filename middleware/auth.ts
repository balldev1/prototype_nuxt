export default defineNuxtRouteMiddleware(async (to) => {
  if (process.server) {
    const cookieHeader = useRequestHeaders(["cookie"])?.cookie || "";
    const tokenMatch = cookieHeader.match(/auth_token=([^;]+)/);
    const token = tokenMatch?.[1] as string;
    const jwtSecret = process.env.JWT_SECRET as string;

    if (!token) {
      if (to.path !== "/login") return navigateTo("/login");
      return;
    }
    console.log("test");
    try {
      const jwt = await import("jsonwebtoken");
      jwt.verify(token, jwtSecret);

      if (to.path === "/login") return navigateTo("/");
    } catch (error) {
      if (to.path !== "/login") return navigateTo("/");
      return;
    }
  }
});
