<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-gray-200 p-6">
    <header>
      <nav class="flex gap-4 px-3 py-2 h-10">
        <RouterLink class="text-teal-400 hover:text-yellow-200 font-bold" to="/"
          >Home</RouterLink
        >
        <RouterLink
          class="text-teal-400 hover:text-yellow-200 font-bold"
          to="/about"
          >About</RouterLink
        >
        <RouterLink
          class="text-teal-400 hover:text-yellow-200 font-bold"
          to="/posts"
        >Posts</RouterLink>
      </nav>
    </header>
    <main class="mt-20">
      <RouterView />
    </main>
  </div>
</template>
