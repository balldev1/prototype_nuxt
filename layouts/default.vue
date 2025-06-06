<template>
  <Button
    label="Logout"
    icon="pi pi-sign-out"
    class="p-button-danger"
    @click="handleLogout"
  />
  <NuxtPage />
</template>

<script setup>
import { logout } from "@/lib/auth";

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
