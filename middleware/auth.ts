// middleware/auth.ts
export default defineNuxtRouteMiddleware(async () => {
  try {
    const res: any = await $fetch("/api/auth/verify");

    if (!res.valid) {
      return navigateTo("/login");
    }
  } catch (err) {
    return navigateTo("/login");
  }
});
