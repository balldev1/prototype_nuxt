<template>
  <div
    v-if="firstname !== 'ไม่ทราบชื่อ'"
    class="bg-neutral-900 shadow-sm rounded-md flex flex-col gap-5 p-5"
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
        title="Task Success"
        status="Online"
        total="10"
      />
      <TaskCard
        icon="pi-prime"
        title="Task Cancel"
        status="Online"
        total="10"
      />
    </div>

    <ManageInformationCard
      :firstname="firstname"
      :lastname="lastname"
      :address="address"
      :role="role"
      :email="email"
    />
  </div>

  <div
    v-else
    class="h-[36rem] bg-neutral-900 flex items-center justify-center"
  ></div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { getUserById } from "@/lib/user";
import { onMounted, ref, computed } from "vue";
import TaskCard from "@/components/manage-user/TaskCard.vue";
import ManageInformationCard from "@/components/manage-user/ManageInformationCard.vue";
import BreadcrumbCard from "@/components/layout/BreadcrumbCard.vue";

const route = useRoute();
const rawId = route.params.id;
const id = Array.isArray(rawId) ? rawId[0] : rawId;
const user = ref(null);
const firstname = computed(() => user.value?.firstname || "ไม่ทราบชื่อ");
const lastname = computed(() => user.value?.lastname || "ไม่ทราบชื่อ lastname");
const address = computed(() => user.value?.address || "ไม่ทราบชื่อ address");
const role = computed(() => user.value?.role || "ไม่ทราบ role");
const email = computed(() => user.value?.email || "ไม่ทราบ email");

const home = ref({
  icon: "pi pi-home",
  route: "/",
});
const items = computed(() => [
  { label: "manage-user", route: `/manage-user` },
  { label: firstname.value, route: `/manage-user/${id}` },
]);

onMounted(async () => {
  if (id) {
    try {
      user.value = await getUserById(id);
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  }
});
</script>
