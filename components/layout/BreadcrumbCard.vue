<!-- components/BreadcrumbCard.vue -->
<template>
  <div class="card flex">
    <Breadcrumb :home="home" :model="items" class="!bg-neutral-900">
      <template #item="{ item, props }">
        <router-link
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom
        >
          <a :href="href" v-bind="props.action" @click="navigate">
            <span
              :class="[item.icon, 'text-color']"
              class="hover:bg-neutral-800 hover:text-white rounded-md"
            />
            <span
              class="text-primary font-semibold hover:text-white rounded-md"
            >
              {{ item.label }}
            </span>
          </a>
        </router-link>
        <a
          class="!hover:bg-rose-500"
          v-else
          :href="item.url"
          :target="item.target"
          v-bind="props.action"
        >
          <span class="text-surface-700 dark:text-surface-0">
            {{ item.label }}
          </span>
        </a>
      </template>
    </Breadcrumb>
  </div>
</template>

<script setup>
defineProps({
  home: Object,
  items: Array,
});
</script>
