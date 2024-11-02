export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: number
          title: string
          content: string
          created_at: string
          author_id: number
        }
        Insert: {
          title: string
          content: string
          author_id: number
        }
        Update: {
          title?: string
          content?: string
          author_id?: number
        }
      }
      authors: {
        Row: {
          id: number
          name: string
          email: string
        }
        Insert: {
          name: string
          email: string
        }
        Update: {
          name?: string
          email?: string
        }
      }
    }
  }
}
