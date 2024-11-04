<script setup lang="ts">
defineProps<{
  error: string | null
}>()
</script>

<template>
  <div
    v-if="error"
    class="mb-4 p-4 bg-red-100 text-red-600 rounded text-center"
  >
    {{ error }}
  </div>
</template>
