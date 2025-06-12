<template>
  <div class="">
    <div>
      <div class="text-4xl text-neutral-200 flex items-center justify-between">
        <span> Table Infomation User </span>
        <div>
          <!-- Pagination Controls -->
          <div
            v-if="userData.length > 0"
            class="mt-4 text-sm flex items-center justify-center gap-4 text-neutral-200"
          >
            <button
              @click="goToPage(page - 1)"
              :disabled="page <= 1"
              class="px-3 py-1 rounded bg-neutral-700 hover:bg-neutral-600 disabled:opacity-50"
            >
              Prev
            </button>

            <span>Page {{ page }} of {{ totalPages }}</span>

            <button
              @click="goToPage(page + 1)"
              :disabled="page >= totalPages"
              class="px-3 py-1 rounded bg-neutral-700 hover:bg-neutral-600 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div class="border-b-[1px] border-neutral-200 pt-2" />
    </div>
    <div class="mt-4 flex items-center justify-between gap-2 w-full">
      <!-- Input firstname -->
      <div class="w-90">
        <IconField iconPosition="left w-full ">
          <InputIcon class="pi pi-search text-white" />
          <InputText
            v-model="firstname"
            placeholder="Firstname"
            class="w-full"
          />
        </IconField>
      </div>

      <!-- Input lastname -->
      <div class="w-90">
        <IconField iconPosition="left w-full ">
          <InputIcon class="pi pi-search text-white" />
          <InputText v-model="lastname" placeholder="Lastname" class="w-full" />
        </IconField>
      </div>

      <!-- Select role -->
      <div class="w-90">
        <IconField iconPosition="left w-full ">
          <Select
            v-model="role"
            :options="selectRoles"
            optionLabel="role"
            placeholder="Select Role"
            class="w-full !text-white"
          />
        </IconField>
      </div>

      <!-- ปุ่ม Search -->
      <button
        @click="handleSearch"
        class="hover:cursor-pointer hover:bg-neutral-700 bg-neutral-800 text-neutral-200 font-semibold rounded-md p-2"
      >
        Search
      </button>

      <!-- ปุ่ม Default ล้างค่า -->
      <button
        @click="handleReset"
        class="hover:cursor-pointer hover:bg-neutral-700 bg-neutral-800 text-neutral-200 font-semibold rounded-md p-2"
      >
        Default
      </button>
    </div>

    <!-- ตารางข้อมูล -->
    <DataTable
      v-if="userData.length > 0"
      :value="userData"
      tableStyle="min-width: 50rem"
    >
      <Column field="firstname" header="First Name" />
      <Column field="lastname" header="Last Name" />
      <Column field="address" header="Address" />
      <Column field="role" header="Role" />
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

    <div
      v-else
      class="mt-10 h-60 flex gap-2 items-center justify-center text-sm"
    >
      <span class="pi pi-search"></span>
      <span>No information found .. .</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { getUser } from "@/lib/user";
import Select from "primevue/select";

const firstname = ref("");
const lastname = ref("");
const role = ref(null);
const selectRoles = ref([
  { role: "admin" },
  { role: "user" },
  { role: "technic" },
]);

const page = ref(1);
const limit = 4;
const total = ref(0);
const userData = ref([]);
const isLoading = ref(false);
const router = useRouter();

const totalPages = computed(() => Math.ceil(total.value / limit));

const fetchUsers = async (filters = {}) => {
  try {
    isLoading.value = true;

    // รวม page, limit เข้า params ด้วย
    const params = {
      ...filters,
      page: page.value,
      limit,
    };

    const result = await getUser(params);

    // สมมุติว่า backend ส่ง { users: [...], total: number }
    userData.value = result.users || [];
    total.value = result.total || 0;
  } catch (error) {
    console.error("Failed to fetch user:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchUsers();
});

const handleSearch = () => {
  page.value = 1; // เริ่มหน้าแรกใหม่ทุกครั้งกด search
  fetchUsers({
    firstname: firstname.value || undefined,
    lastname: lastname.value || undefined,
    role: role.value?.role || undefined,
  });
};

const handleReset = () => {
  firstname.value = "";
  lastname.value = "";
  role.value = null;
  page.value = 1;
  fetchUsers();
};

const goToPage = (newPage) => {
  if (newPage < 1 || newPage > totalPages.value) return;
  page.value = newPage;
  fetchUsers({
    firstname: firstname.value || undefined,
    lastname: lastname.value || undefined,
    role: role.value?.role || undefined,
  });
};

const handleAction = (id) => {
  router.push(`/manage-user/${id}`);
};
</script>
