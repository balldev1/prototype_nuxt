<template>
  <div v-if="user" class="flex fixed text-white w-full">
    <SideBarCard />
    <div class="w-full">
      <HeaderCard :user="user" />
      <div class="p-5">
        <NuxtPage :user="user" />
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderCard from "~/components/layout/HeaderCard.vue";
import SideBarCard from "~/components/layout/SideBarCard.vue";
import { currentUser } from "~/lib/decodeToken";
const { user } = currentUser();
</script>
