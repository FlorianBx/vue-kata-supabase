<script setup lang="ts">
import { ref } from 'vue'
import Post from '@/components/Post.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import SpinnerLoading from '@/components/SpinnerLoading.vue'

const error = ref<string | null>(null)

const handleError = (err: Error) => {
  error.value = err.message
}
</script>

<template>
  <ErrorMessage :error="error" />
  <Suspense @error="handleError">
    <template #default>
      <Post />
    </template>
    <template #fallback>
      <SpinnerLoading />
    </template>
  </Suspense>
</template>
