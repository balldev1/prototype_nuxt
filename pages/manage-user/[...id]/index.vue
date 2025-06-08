<template><ManageId /></template>

<script setup>
import ManageId from "~/components/manage-user/ManageId.vue";

const props = defineProps({
  user: {
    type: Object,
    default: () => null,
  },
});
</script>
