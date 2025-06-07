<template>
  <div class="flex gap-5 items-center mt-2">
    <div
      v-for="(item, index) in linkItems"
      :key="index"
      class="flex items-center justify-center"
    >
      <a
        :href="item.href"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-2 bg-neutral-800 rounded-md p-2 hover:bg-neutral-700"
      >
        <i :class="item.icon" style="font-size: 1.2rem"></i>
        <h2 class="text-sm select-none">{{ item.label }}</h2>
      </a>
    </div>
  </div>
</template>

<script setup>
const linkItems = [
  {
    href: "https://portfolio-frontend-ten-steel.vercel.app/",
    icon: "pi pi-apple",
    label: "Portfolio",
  },
  {
    href: "mailto:nanthawatcola1994@gmail.com",
    icon: "pi pi-google",
    label: "Gmail",
  },
  {
    href: "https://github.com/balldev1?tab=repositories",
    icon: "pi pi-github",
    label: "Github",
  },
  {
    href: "https://www.linkedin.com/in/nanthawat-cola-6733bb28a/",
    icon: "pi pi-linkedin",
    label: "Linkedin",
  },
];
</script>
