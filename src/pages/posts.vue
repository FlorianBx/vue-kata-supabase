<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useFormatDate } from '@/utils/useFormatDate'
import { useFetchPosts } from '@/composables/useFetchPosts'

const router = useRouter()

const { posts, error, isLoading } = useFetchPosts()

const navigateToArticle = (id: number) => {
  router.push(`/post/${id}`)
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-6xl font-grotesk font-bold mb-20">Posts</h1>

    <div v-if="isLoading" class="text-center py-4">Chargement...</div>

    <div v-else-if="error" class="text-red-500">
      {{ error }}
    </div>

    <div v-else-if="posts.length === 0" class="text-center py-4">
      Aucun post trouvé
    </div>

    <div v-else class="space-y-6">
      <article
        v-for="post in posts"
        :key="post.id"
        class="relative rounded-xl bg-gray-900 transition-all duration-300 group cursor-pointer"
        @click="navigateToArticle(post.id)"
      >
        <h2
          class="text-2xl font-bold text-teal-400 group-hover:text-yellow-200 transition-colors duration-200"
        >
          {{ post.title }}
        </h2>

        <p class="mt-3 text-gray-400 line-clamp-3">
          {{ post.content }}
        </p>

        <div class="flex items-center mt-6 space-x-4">
          <img
            src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTC-MPYyzKUoluoSuLZBGbb8jj6esf64t9-gFDIRtUd6294H5zJ"
            :alt="post?.authors?.name"
            class="w-10 h-10 rounded-full border-2 border-gray-800"
          />

          <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-300">
              {{ post?.authors?.name }}
            </span>

            <div class="flex items-center text-sm text-gray-500 space-x-2">
              <span>{{ useFormatDate(post.created_at).formatedDate }}</span>
              <span>•</span>
              <span>{{ post.readTime }} min de lecture</span>
            </div>
          </div>
        </div>

        <div
          class="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <svg
            class="w-6 h-6 text-teal-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>

        <div
          class="absolute inset-0 bg-gradient-to-r from-teal-600/0 to-teal-600/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"
        />
      </article>
    </div>
  </div>
</template>
