<script setup lang="ts">
import PostsList from '@/components/PostsList.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import SpinnerLoading from '@/components/SpinnerLoading.vue'
import { useFetchPosts } from '@/composables/useFetchPosts'

const { error } = useFetchPosts()

const handleError = (err: Error) => {
  error.value = err.message
}
</script>

<template>
  <ErrorMessage :error="error" />
  <Suspense @error="handleError">
    <template #default>
      <PostsList />
    </template>
    <template #fallback>
      <SpinnerLoading />
    </template>
  </Suspense>
</template>
