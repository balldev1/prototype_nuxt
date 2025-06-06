<template>
  <div class="mr-5 pb-5 rounded-md">
    <h1 class="text-3xl font-bold underline">This is page!</h1>
    <DatePicker v-model="date" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const date = ref();
</script>
