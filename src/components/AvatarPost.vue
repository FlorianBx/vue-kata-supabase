<script setup lang="ts">
import type { Post } from '@/core/types/Post'
import type { Author } from '@/core/types/Post'

defineProps<{
  post: Post
}>()

const hasAuthor = (post: Post): post is Post & { authors: Author } => {
  return !!post.authors?.name
}
</script>
<template>
  <div v-if="hasAuthor(post)" class="flex items-center h-20 w-20">
    <img
      :src="post.authors.avatar || '/default-avatar.png'"
      :alt="post.authors.name"
      class="w-20 h-20 rounded inset-0 w-full h-full object-cover border-2 border-gray-800"
    />
  </div>
  <div v-else class="flex items-center h-20 w-20">
    <img
      src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTC-MPYyzKUoluoSuLZBGbb8jj6esf64t9-gFDIRtUd6294H5zJ"
      :alt="post?.authors?.name"
      class="w-20 h-20 rounded inset-0 w-full h-full object-cover border-2 border-gray-800"
    />
  </div>
</template>
