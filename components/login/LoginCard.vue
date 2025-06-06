<template>
  <div
    class="flex items-center justify-center min-h-screen bg-gradient-to-b from-neutral-900 to-neutral-950"
  >
    <div
      class="p-5 w-96 inset-shadow-xs inset-shadow-neutral-600 bg-gradient-to-b from-neutral-800 to-neutral-900 rounded-lg"
    >
      <div class="space-y-2">
        <h2 class="text-center text-2xl">aPanel Linoob panel</h2>
        <div class="text-center text-sm text-gray-400">
          security everywhere ? <span class="text-white">login</span>
        </div>
      </div>
      <form @submit.prevent="handleLogin" class="mt-6 flex flex-col gap-4">
        <InlineMessage v-if="emailError || loginErrorMessage" class="">
          {{ loginErrorMessage || "login fail email or password wrong" }}
        </InlineMessage>

        <IconField iconPosition="left w-full ">
          <InputIcon class="pi pi-envelope text-white" />
          <InputText
            v-model="email"
            placeholder="email address"
            class="w-full"
          />
        </IconField>

        <IconField iconPosition="left ">
          <InputIcon class="pi pi-lock text-white" />
          <InputText
            v-model="password"
            type="password"
            placeholder="password"
            class="w-full"
          />
        </IconField>

        <IconField iconPosition="left ">
          <Button
            type="submit"
            label="login"
            @click="validate"
            class="w-full !bg-neutral-600 hover:opacity-90 !text-white !border-none shadow-md shadow-neutral-800"
          />
        </IconField>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { login } from "@/lib/auth";

const email = ref("");
const password = ref("");

const emailError = ref(false);
const loginErrorMessage = ref("");

const handleLogin = async () => {
  emailError.value = !email.value;
  loginErrorMessage.value = "";

  try {
    await login(email.value, password.value);
    window.location.href = "/";
  } catch (error) {
    loginErrorMessage.value = error.message || "Login failed";
  }
};
</script>
