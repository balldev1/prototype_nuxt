<template>
  <div
    class="relative bg-neutral-900 min-h-screen p-2 shadow overflow-hidden transition-all ease-in-out duration-300"
    :class="sidebar ? 'w-48' : ''"
  >
    <div class="flex flex-col gap-5">
      <div class="flex items-center gap-2">
        <i
          @click="openSidebar"
          class="pi pi-apple hover:cursor-pointer hover:bg-neutral-800 rounded-md p-2"
          style="font-size: 1.5rem"
        ></i>
        <transition name="fade">
          <h1 v-show="sidebar" class="select-none">Nuxt.js</h1>
        </transition>
      </div>
    </div>
    <div class="flex flex-col gap-5 mt-20">
      <div class="flex items-center gap-2">
        <i
          class="pi pi-search text-neutral-300 hover:cursor-pointer hover:bg-neutral-800 rounded-md p-2"
          style="font-size: 1.2rem"
        ></i>
        <transition name="fade">
          <h1 v-show="sidebar" class="select-none">Search</h1>
        </transition>
      </div>
      <div class="flex items-center gap-2">
        <i
          class="pi pi-plus text-neutral-300 hover:cursor-pointer hover:bg-neutral-800 rounded-md p-2"
          style="font-size: 1.2rem"
        ></i>
        <transition name="fade">
          <h1 v-show="sidebar" class="select-none">Add Product</h1>
        </transition>
      </div>
      <div class="flex items-center gap-2">
        <i
          class="pi pi-microsoft text-neutral-300 hover:cursor-pointer hover:bg-neutral-800 rounded-md p-2"
          style="font-size: 1.2rem"
        ></i>
        <transition name="fade">
          <h1 v-show="sidebar" class="select-none">Dashboard</h1>
        </transition>
      </div>
      <div class="flex items-center gap-2">
        <i
          class="pi pi-compass text-neutral-300 hover:cursor-pointer hover:bg-neutral-800 rounded-md p-2"
          style="font-size: 1.2rem"
        ></i>
        <transition name="fade">
          <h1 v-show="sidebar" class="select-none">Navigator</h1>
        </transition>
      </div>
      <div class="flex items-center gap-2">
        <i
          class="pi pi-bell text-neutral-300 hover:cursor-pointer hover:bg-neutral-800 rounded-md p-2"
          style="font-size: 1.2rem"
        ></i>
        <transition name="fade">
          <h1 v-show="sidebar" class="select-none">Notification</h1>
        </transition>
      </div>
      <div class="flex items-center gap-2">
        <i
          class="pi pi-cog text-neutral-300 hover:cursor-pointer hover:bg-neutral-800 rounded-md p-2"
          style="font-size: 1.2rem"
        ></i>
        <transition name="fade">
          <h1 v-show="sidebar" class="select-none">Setting</h1>
        </transition>
      </div>
      <div class="flex items-center gap-2">
        <i
          class="pi pi-shield text-neutral-300 hover:cursor-pointer hover:bg-neutral-800 rounded-md p-2"
          style="font-size: 1.2rem"
        ></i>
        <transition name="fade">
          <h1 v-show="sidebar" class="select-none">Security</h1>
        </transition>
      </div>
    </div>
    <div class="absolute bottom-5 flex items-center gap-2">
      <i
        @click="openSidebar"
        class="pi pi-sign-out hover:cursor-pointer hover:bg-neutral-800 rounded-md p-2"
        style="font-size: 1.5rem"
      ></i>
      <transition name="fade">
        <h1 v-show="sidebar" class="select-none">Logout</h1>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const sidebar = ref(false);

const openSidebar = () => {
  sidebar.value = !sidebar.value;
};
</script>
