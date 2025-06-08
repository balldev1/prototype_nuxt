<template>
  <div
    class="w-full flex flex-col items-center justify-center h-[36rem] bg-neutral-900"
  >
    <h1 class="text-6xl font-bold text-white">
      404 - Page Not Found
      <span className="loading loading-dots loading-sm mt-5"></span>
    </h1>
    <NuxtLink
      to="/"
      class="mt-6 hover:underline btn btn-neutral hover:opacity-90"
    >
      <Button label="Go home" severity="contrast" raised />
    </NuxtLink>
  </div>
</template>

<script setup></script>
