<template>
  <div class="bg-neutral-900 shadow-sm rounded-md flex flex-col gap-5 p-5">
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
import TaskCard from "@/components/manage-user/TaskCard.vue";
import TableCard from "@/components/manage-user/TableCard.vue";

const props = defineProps({
  user: {
    type: Object,
    default: () => null,
  },
});
</script>
