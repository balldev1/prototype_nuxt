<template>
  <HomeCard :user="user" />
</template>

<script setup>
import HomeCard from "~/components/home/HomeCard.vue";

definePageMeta({
  middleware: "auth",
});

const props = defineProps({
  user: {
    type: Object,
    default: () => null,
  },
});
</script>
