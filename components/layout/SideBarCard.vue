<template>
  <div
    class="relative bg-neutral-900 min-h-screen p-2 shadow overflow-hidden transition-all ease-in-out duration-300"
    :class="sidebar ? 'w-60' : ''"
  >
    <div class="flex flex-col gap-5 hover:cursor-pointer mt-1">
      <div class="flex items-center gap-2">
        <i
          @click="openSidebars"
          class="pi pi-apple hover:bg-neutral-800 rounded-md p-2"
          style="font-size: 1.2rem"
        ></i>
        <transition name="fade">
          <h2
            v-show="sidebar"
            class="text-sm select-none hover:bg-neutral-800 rounded-md p-2"
          >
            Nuxt.js
          </h2>
        </transition>
      </div>
    </div>

    <div class="flex flex-col gap-5 mt-20">
      <a
        :href="item.href"
        v-for="(item, idx) in linkItems"
        :key="idx"
        class="flex items-center gap-2"
      >
        <i
          :class="
            item.icon + ' text-neutral-300 hover:bg-neutral-800 rounded-md p-2'
          "
          style="font-size: 1.2rem"
        ></i>
        <transition name="fade">
          <h2
            v-show="sidebar"
            class="text-sm select-none hover:bg-neutral-800 rounded-md p-2"
          >
            {{ item.label }}
          </h2>
        </transition>
      </a>
    </div>

    <button
      @click="handleLogout"
      class="absolute bottom-5 flex items-center gap-2"
    >
      <i
        class="pi pi-sign-out hover:bg-neutral-800 rounded-md p-2"
        style="font-size: 1.5rem"
      ></i>
      <transition name="fade">
        <h2
          v-show="sidebar"
          class="text-sm select-none hover:bg-neutral-800 rounded-md p-2"
        >
          Logout
        </h2>
      </transition>
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { logout } from "@/lib/auth";

const sidebar = ref(false);

const linkItems = [
  {
    href: "/manage-user",
    icon: "pi pi-search",
    label: "Search",
  },
  {
    href: "/manage-user",
    icon: "pi pi-plus",
    label: "Add Product",
  },
  {
    href: "/manage-user",
    icon: "pi pi-microsoft",
    label: "Dashboard",
  },
  {
    href: "/manage-user",
    icon: "pi pi-compass",
    label: "Navigator",
  },
  {
    href: "/manage-user",
    icon: "pi pi-bell",
    label: "Notification",
  },
  {
    href: "/manage-user",
    icon: "pi pi-cog",
    label: "Setting",
  },
  {
    href: "https://portfolio-frontend-ten-steel.vercel.app/",
    icon: "pi pi-shield",
    label: "Security",
  },
];

const openSidebars = () => {
  sidebar.value = !sidebar.value;
};

const handleLogout = async () => {
  try {
    await logout();
    window.location.reload();
  } catch (error) {
    console.error(error);
    alert(error.message || "Logout failed");
  }
};
</script>
