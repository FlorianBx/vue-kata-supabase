<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import { useRoute } from 'vue-router'

const route = useRoute()

const postId = route.params.id

const post = ref<Post | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

const fetchPost = async () => {
  try {
    isLoading.value = true
    const { data, error: supabaseError } = await supabase
      .from('posts')
      .select('*')
      .eq('id', postId)

    if (supabaseError) throw supabaseError

    post.value = data[0] || null
  } catch (e) {
    error.value = e.message
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchPost()
})
</script>

<template>
  <div class="p-4">
    <div v-if="isLoading" class="text-center py-4">Chargement...</div>
    <div v-else-if="error" class="text-red-500">
      {{ error }}
    </div>
    <div v-else-if="post === null" class="text-center py-4">
      Post introuvable
    </div>
    <div v-else class="flex justify-center">
      <article
        class="relative p-6 w-1/2 rounded-xl bg-gray-900 transition-all duration-300"
      >
        <div class="flex">
          <div class="flex items-center h-20 w-20">
            <img
              src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTC-MPYyzKUoluoSuLZBGbb8jj6esf64t9-gFDIRtUd6294H5zJ"
              :alt="post?.authors?.name"
              class="w-20 h-20 rounded inset-0 w-full h-full object-cover border-2 border-gray-800"
            />
          </div>
          <h2 class="text-2xl ml-2 font-bold text-white">{{ post.title }}</h2>
        </div>
        <p class="mt-3 text-gray-400">
          {{ post.content }}
        </p>
      </article>
    </div>
  </div>
</template>
