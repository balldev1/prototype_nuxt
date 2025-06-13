<template>
  <div v-if="title" class="flex gap-5 items-center bg-neutral-800 p-5">
    <div
      class="text-neutral-200 p-4 rounded-md flex items-center justify-center bg-neutral-900"
    >
      <i :class="`pi ${icon}`" style="font-size: 3rem"></i>
    </div>
    <div class="flex flex-col gap-5">
      <div class="flex items-center gap-2">
        <h2 class="text-2xl text-neutral-200 font-semibold">{{ title }}</h2>
        <span class="bg-lime-400 text-black px-2 p-1 text-sm rounded-md">
          {{ status }}
        </span>
      </div>
      <div class="text-xl text-neutral-200">Total {{ total }} Task</div>
    </div>
  </div>
</template>

<!-- TaskCard.vue -->
<script setup>
defineProps({
  icon: String,
  title: String,
  status: String,
  total: [String, Number],
});
</script>
