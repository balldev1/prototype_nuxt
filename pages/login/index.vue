<template>
  <LoginCard />
</template>

<script setup>
definePageMeta({
  middleware: "auth",
  layout: "login",
});
</script>
