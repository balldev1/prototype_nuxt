<template>
  <ManageCard />
</template>

<script setup>
import ManageCard from "~/components/manage-user/ManageCard.vue";

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
