<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useFetchPosts } from '@/composables/useFetchPosts'
import AvatarPost from '@/components/AvatarPost.vue'

const route = useRoute()

const { fetchPostById } = useFetchPosts()
const post = await fetchPostById(Number(route.params.id))

if (!post) {
  throw new Error('Post introuvable')
}
</script>

<template>
  <div class="p-4 flex justify-center">
    <article
      class="relative p-6 w-1/2 rounded-xl bg-gray-900 transition-all duration-300"
    >
      <div class="flex">
        <div class="flex items-center h-20 w-20">
          <AvatarPost :post="post" />
        </div>
        <h2 class="text-2xl ml-2 font-bold text-white">
          {{ post.title }}
        </h2>
      </div>
      <p class="mt-3 text-gray-400">
        {{ post.content }}
      </p>
    </article>
  </div>
</template>
