import tailwindcss from "@tailwindcss/vite";
import Aura from "@primeuix/themes/aura";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  primevue: {
    options: {
      ripple: true,
      theme: {
        preset: Aura,
      },
    },
  },
  modules: ["@primevue/nuxt-module"],
  runtimeConfig: {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    // public: {
    //   apiBase: process.env.API_BASE_URL || "http://localhost:3000",
    // },
  },
});
