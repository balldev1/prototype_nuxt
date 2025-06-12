<template>
  <div class="py-1 bg-neutral-900 flex text-sm">
    <div class="flex items-center justify-between w-full">
      <div class="w-full flex">
        <h2 class="flex hover:bg-neutral-800 rounded-md p-2">
          Welcome to Dashboard
        </h2>
      </div>
      <div class="w-full">
        <IconField iconPosition="left w-full ">
          <InputIcon class="pi pi-search text-white" />
          <InputText placeholder="search" class="w-full" />
        </IconField>
      </div>
      <div class="ml-auto w-full flex gap-4 justify-end">
        <div
          class="text-neutral-300 flex items-center gap-2 hover:bg-neutral-800 rounded-md p-2"
        >
          <Avatar
            image="https://static.vecteezy.com/system/resources/thumbnails/038/704/047/small_2x/hoodie-man-illustration-vector.jpg"
            shape="circle"
          />
          <h2 class="">{{ user?.firstname || "guest" }}</h2>
          <span class="p-1 rounded-md bg-lime-500 text-black">
            {{ user?.role || "guest" }}
          </span>
        </div>
      </div>
    </div>
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
