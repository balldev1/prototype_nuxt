<template>
  <div v-if="userData.length > 0" class="">
    <div>
      <h2 class="text-4xl text-neutral-200">Table Infomation User</h2>
      <div class="border-b-[1px] border-neutral-200 pt-5" />
    </div>
    <div class="mt-4 flex items-center justify-between gap-2 w-full">
      <div class="w-90">
        <IconField iconPosition="left w-full ">
          <InputIcon class="pi pi-search text-white" />
          <InputText placeholder="search" class="w-full" />
        </IconField>
      </div>
      <div class="w-90">
        <IconField iconPosition="left w-full ">
          <InputIcon class="pi pi-search text-white" />
          <InputText placeholder="search" class="w-full" />
        </IconField>
      </div>
      <div class="w-90">
        <IconField iconPosition="left w-full ">
          <InputIcon class="pi pi-search text-white" />
          <InputText placeholder="search" class="w-full" />
        </IconField>
      </div>
      <button
        class="hover:cursor-pointer hover:bg-neutral-700 bg-neutral-800 text-neutral-200 font-semibold rounded-md p-2"
      >
        Search
      </button>
      <button
        class="hover:cursor-pointer hover:bg-neutral-700 bg-neutral-800 text-neutral-200 font-semibold rounded-md p-2"
      >
        Default
      </button>
    </div>

    <DataTable :value="userData" tableStyle="min-width: 50rem">
      <Column field="firstname" header="First Name" class="" />
      <Column field="lastname" header="Last Name" />
      <Column field="address" header="Address" />
      <Column field="role" header="Role" />
      <!-- คอลัมน์ Action -->
      <Column header="Actions">
        <template #body="slotProps">
          <button
            @click="handleAction(slotProps.data._id)"
            class="hover:cursor-pointer hover:bg-neutral-700 bg-neutral-800 text-neutral-200 text-sm font-semibold rounded-md p-2"
          >
            View
          </button>
        </template>
      </Column>
    </DataTable>
  </div>
  <ProgressBar v-else mode="indeterminate" style="height: 6px"></ProgressBar>
</template>

<!-- TaskCard.vue -->
<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

import { getUser } from "@/lib/user";
const router = useRouter();

const userData = ref([]);
onMounted(async () => {
  try {
    const user = await getUser();
    userData.value = user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
  }
});
const handleAction = (id) => {
  router.push(`/manage-user/${id}`);
};
</script>
