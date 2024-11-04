import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import type { Post } from '@/core/types/Post'

export const useFetchPosts = () => {
  const posts = ref<Post[]>([])
  const error = ref<string | null>(null)

  const fetchPosts = async () => {
    console.warn('⚠️ fetchPosts ⚠️')
    const { data, error: supabaseError } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (supabaseError) {
      error.value = supabaseError.message
      throw new Error(supabaseError.message)
    }

    return data
  }

  const fetchPostById = async (id: number) => {
    console.warn('⚠️ fetchPostById ⚠️', id)
    const { data, error: supabaseError } = await supabase
      .from('posts')
      .select('*, authors (*)')
      .eq('id', id)
      .single()

    if (supabaseError) {
      error.value = supabaseError.message
      return null
    }

    return data
  }

  return { posts, error, fetchPosts, fetchPostById }
}
