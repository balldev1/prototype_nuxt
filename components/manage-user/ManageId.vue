<template>
  <div class="bg-neutral-900 shadow-sm rounded-md flex flex-col gap-5 p-5">
    <NuxtLink href="/manage-user">
      <button
        class="hover:cursor-pointer hover:bg-neutral-700 bg-neutral-800 text-neutral-200 font-semibold rounded-md p-2"
      >
        Back
      </button>
    </NuxtLink>

    <div class="flex items-center justify-center"><h2></h2></div>
    <div>This is ID: {{ userId }}</div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const props = defineProps({
  user: {
    type: Object,
    default: () => null,
  },
});

const route = useRoute();
const rawId = route.params.id;
const userId = Array.isArray(rawId) ? rawId[0] : rawId;
</script>
