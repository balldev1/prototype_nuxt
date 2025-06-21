<template>
  <div class="shadow-sm flex gap-5">
    <div class="w-1/3 p-5 bg-neutral-800">
      <span class="px-2 p-1 text-sm left-0 rounded-md bg-lime-400 text-black">
        Profile
      </span>
      <div
        class="relative text-neutral-300 flex items-cente justify-center gap-2 rounded-md p-2"
      >
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/038/704/047/small_2x/hoodie-man-illustration-vector.jpg"
          shape="circle"
          class="w-auto h-60 rounded-full"
        />
      </div>
    </div>
    <div class="w-full flex flex-col gap-5 p-5 bg-neutral-800">
      <div class="flex items-center">
        <span class="px-2 p-1 text-sm left-0 rounded-md bg-lime-400 text-black">
          Infomation User
        </span>
        <div class="flex ml-auto gap-2">
          <button
            @click="handleEditUser(id)"
            class="cursor-pointer px-4 bg-neutral-900 hover:bg-neutral-700 text-neutral-200 text-sm font-semibold rounded-md p-2"
          >
            Confirm Edit
          </button>
          <button
            @click="handleDeleteUser(id)"
            class="cursor-pointer px-4 bg-neutral-900 hover:bg-neutral-700 text-neutral-200 text-sm font-semibold rounded-md p-2"
          >
            Delete
          </button>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-5">
        <InputGroup>
          <InputGroupAddon class="w-30 !text-neutral-100">
            Email address
          </InputGroupAddon>
          <InputText
            v-model="email"
            placeholder="enter your email"
            class="!bg-neutral-800 !text-white"
          />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon class="w-30 !text-neutral-100">
            role
          </InputGroupAddon>
          <InputText
            v-model="role"
            placeholder="enter your role"
            class="!bg-neutral-800 !text-white"
          />
        </InputGroup>
      </div>
      <div class="grid grid-cols-1 gap-5">
        <InputGroup>
          <InputGroupAddon class="w-30 !text-neutral-100">
            Firstname
          </InputGroupAddon>
          <InputText
            v-model="firstname"
            placeholder="enter your firstname"
            class="!bg-neutral-800 !text-white"
          />
        </InputGroup>
        {{ firstname }}
        <InputGroup>
          <InputGroupAddon class="w-30 !text-neutral-100">
            Lastname
          </InputGroupAddon>
          <InputText
            v-model="lastname"
            placeholder="enter your lastname"
            class="!bg-neutral-800 !text-white"
          />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon class="w-30 !text-neutral-100">
            Address
          </InputGroupAddon>
          <InputText
            v-model="address"
            placeholder="enter your address"
            class="!bg-neutral-800 !text-white"
          />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon class="w-30 !text-neutral-100">
            Phone
          </InputGroupAddon>
          <InputText
            v-model="phone"
            placeholder="enter your phone"
            class="!bg-neutral-800 !text-white"
          />
        </InputGroup>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { deleteUser, patchUser } from "@/lib/user";
import Swal from "sweetalert2";
const route = useRoute();
const rawId = route.params.id;
const id = Array.isArray(rawId) ? rawId[0] : rawId;

const props = defineProps({
  firstname: String,
  lastname: String,
  address: String,
  role: String,
  email: String,
  phone: String,
});

// local refs (ใช้สำหรับแก้ไขและแสดงค่าใหม่)
const firstname = ref(props.firstname);
const lastname = ref(props.lastname);
const address = ref(props.address);
const role = ref(props.role);
const email = ref(props.email);
const phone = ref(props.phone);

const handleEditUser = async (id) => {
  const updateData = {
    firstname: firstname.value,
    lastname: lastname.value,
    address: address.value,
    role: role.value,
    email: email.value,
    phone: phone.value,
  };

  const result = await Swal.fire({
    title: "คุณต้องการแก้ไขหรือไม่?",
    text: "คุณจะไม่สามารถย้อนกลับได้!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "ใช่, แก้ไขเลย!",
    cancelButtonText: "ยกเลิก",
  });

  if (result.isConfirmed) {
    try {
      const response = await patchUser(id, updateData);
      console.log("User updated:", response);

      if (response.error) {
        await Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: response.error,
        });
      } else {
        await Swal.fire({
          icon: "success",
          title: "แก้ไขข้อมูลสำเร็จ",
          text: "ข้อมูลผู้ใช้ถูกอัปเดตเรียบร้อยแล้ว",
        });
      }
    } catch (err) {
      console.error("Error updating user:", err);
      await Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
      });
    }
  }
};

const handleDeleteUser = async (id) => {
  const result = await Swal.fire({
    title: "คุณแน่ใจหรือไม่?",
    text: "คุณจะไม่สามารถย้อนกลับได้!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "ใช่, ลบเลย!",
    cancelButtonText: "ยกเลิก",
  });

  if (result.isConfirmed) {
    await deleteUser(id);
    Swal.fire({
      title: "Good job!",
      text: "You delete success!",
      icon: "success",
    });
    await navigateTo("/manage-user");
  }
};

// ✅ log ทุกค่าทันทีเมื่อมีการเปลี่ยนแปลง
// watch(firstname, (val) => {
//   console.log("Firstname changed to:", val);
// });
// watch(lastname, (val) => {
//   console.log("Lastname changed to:", val);
// });
// watch(address, (val) => {
//   console.log("Address changed to:", val);
// });
// watch(role, (val) => {
//   console.log("Role changed to:", val);
// });
// watch(email, (val) => {
//   console.log("Email changed to:", val);
// });
// watch(phone, (val) => {
//   console.log("Phone changed to:", val);
// });
</script>
