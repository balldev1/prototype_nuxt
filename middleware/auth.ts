export default defineNuxtRouteMiddleware(async (to) => {
  if (process.server) {
    const cookieHeader = useRequestHeaders(["cookie"])?.cookie || "";
    const tokenMatch = cookieHeader.match(/auth_token=([^;]+)/);
    const token = tokenMatch?.[1] as string;
    const jwtSecret = process.env.JWT_SECRET as string;

    if (!token) {
      return navigateTo("/login");
    }

    try {
      const jwt = await import("jsonwebtoken");
      jwt.verify(token, jwtSecret);

      if (to.path === "/login") return navigateTo("/");
    } catch (error) {
      return navigateTo("/login");
    }
  } else {
    // client side อาจตรวจสอบแบบอื่นหรือข้ามไป
    console.log("this client");
    return;
  }
});
