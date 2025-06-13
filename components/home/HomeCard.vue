<template>
  <div
    class="relative bg-neutral-900 shadow-sm rounded-md h-[36rem] flex w-full"
  >
    <div class="absolute top-5 left-5">
      <BreadcrumbCard :home="home" :items="items" />
    </div>

    <div class="flex w-full">
      <img
        src="/dashboard_bg.webp"
        alt="Dashboard Background"
        class="scale-70"
      />
    </div>
    <div class="flex flex-col gap-3 w-full pt-20 pr-10">
      <h2 class="text-4xl flex">Repair Notification and Maintenance</h2>
      <h2 class="border-[1px]" />
      <h2 class="text-balance">
        A centralized and intelligent system designed to streamline the process
        of reporting, tracking, and resolving maintenance issues. Users can
        easily submit repair requests, attach relevant details or images, and
        receive real-time updates on progress. The system automatically assigns
        tasks to the appropriate technicians based on availability and issue
        category. With built-in prioritization and escalation logic, critical
        problems are handled promptly and transparently. Comprehensive logs and
        dashboards allow administrators to monitor performance and optimize
        response times. Designed for facilities, campuses, and organizations
        aiming to improve operational efficiency and service reliability.
      </h2>
      <ContactCard />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

import BreadcrumbCard from "@/components/layout/BreadcrumbCard.vue";
import ContactCard from "@/components/home/ContactCard.vue";

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

const items = computed(() => [{ label: "about", route: `/` }]);
</script>
