<template>
  <div class="bg-neutral-900 shadow-sm rounded-md flex flex-col gap-5 p-5">
    <div class="flex items-center justify-center"><h2></h2></div>
    <div>1</div>
  </div>
</template>

<script setup>
const props = defineProps({
  user: {
    type: Object,
    default: () => null,
  },
});
</script>
