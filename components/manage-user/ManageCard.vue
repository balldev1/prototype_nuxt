<template>
  <div
    class="bg-neutral-900 shadow-sm rounded-md flex flex-col gap-5 p-5 mr-18"
  >
    <BreadcrumbCard :home="home" :items="items" />
    <div class="grid grid-cols-3 items-center justify-center gap-5">
      <TaskCard
        icon="pi-telegram"
        title="Task Repair"
        status="Online"
        total="10"
      />
      <TaskCard
        icon="pi-android"
        title="Task Technic"
        status="Online"
        total="10"
      />
      <TaskCard icon="pi-prime" title="Task User" status="Online" total="10" />
    </div>
    <TableCard />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

import TaskCard from "@/components/manage-user/TaskCard.vue";
import TableCard from "@/components/manage-user/TableCard.vue";
import BreadcrumbCard from "@/components/layout/BreadcrumbCard.vue";

const props = defineProps({
  user: {
    type: Object,
    default: () => null,
  },
});

const home = ref({
  icon: "pi pi-home",
  route: "/",
});
const items = computed(() => [{ label: "manage-user", route: `/manage-user` }]);
</script>
