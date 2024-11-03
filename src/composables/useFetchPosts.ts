import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import type { Post } from '@/core/types/Post'

export const useFetchPosts = () => {
  const posts = ref<Post[]>([])
  const isLoading = ref(true)
  const error = ref<string | null>(null)

  const fetchPosts = async () => {
    try {
      const { data, error: supabaseError } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (supabaseError) throw supabaseError
      posts.value = data || []
    } catch (e: unknown) {
      if (e instanceof Error) error.value = e.message
    } finally {
      isLoading.value = false
    }
  }

  const fetchPostById = async (id?: number) => {
    if (posts.value.length > 0) {
      return posts.value.filter(post => post.id === id)
    }

    try {
      const { data, error: supabaseError } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)

      if (supabaseError) throw supabaseError
      posts.value = data || []
    } catch (e: unknown) {
      if (e instanceof Error) error.value = e.message
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    fetchPosts()
  })

  return { posts, error, isLoading, fetchPosts, fetchPostById }
}
