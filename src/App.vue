<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="h-screen bg-gray-900 text-gray-200 p-4">
    <header>
      <nav class="flex gap-4 h-10">
        <RouterLink class="text-teal-400 hover:text-yellow-200 font-bold" to="/"
          >Home</RouterLink
        >
        <RouterLink
          class="text-teal-400 hover:text-yellow-200 font-bold"
          to="/about"
          >About</RouterLink
        >
      </nav>
    </header>
    <main class="mt-10">
      <RouterView />
    </main>
  </div>
</template>
