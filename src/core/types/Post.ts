export interface Author {
  id: number
  name: string
  avatar?: string
}

export interface Post {
  id: number
  title: string
  content: string
  author_id: number
  created_at: string
  authors: Partial<Author>
}

