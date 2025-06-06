<template>
  test default
  <NuxtPage />
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});
</script>
