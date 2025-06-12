<template>
  <div v-if="user" class="flex text-white w-full">
    <SideBarCard @toggleSidebar="handleToggleSidebar" />
    <div class="w-full ml-18">
      <HeaderCard :user="user" class="fixed w-full pr-20" />
      <div
        :class="[
          'p-5 mt-16 transition-all duration-300 ease-in-out',
          isSidebarOpen ? 'pl-48 ' : 'pl-8 ',
        ]"
      >
        <NuxtPage :user="user" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import HeaderCard from "~/components/layout/HeaderCard.vue";
import SideBarCard from "~/components/layout/SideBarCard.vue";
import { currentUser } from "~/lib/decodeToken";
const { user } = currentUser();

const isSidebarOpen = ref(false);

const handleToggleSidebar = (value) => {
  isSidebarOpen.value = value;
};
</script>
