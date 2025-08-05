import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          title: string
          description: string
          image_url: string
          tech_stack: string[]
          github_url?: string
          demo_url?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          image_url: string
          tech_stack: string[]
          github_url?: string
          demo_url?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          image_url?: string
          tech_stack?: string[]
          github_url?: string
          demo_url?: string
          updated_at?: string
        }
      }
      publications: {
        Row: {
          id: string
          title: string
          authors: string[]
          journal: string
          year: number
          doi?: string
          pdf_url?: string
          abstract: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          authors: string[]
          journal: string
          year: number
          doi?: string
          pdf_url?: string
          abstract: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          authors?: string[]
          journal?: string
          year?: number
          doi?: string
          pdf_url?: string
          abstract?: string
          updated_at?: string
        }
      }
      team_members: {
        Row: {
          id: string
          name: string
          role: string
          bio: string
          image_url: string
          linkedin_url?: string
          email?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          role: string
          bio: string
          image_url: string
          linkedin_url?: string
          email?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string
          bio?: string
          image_url?: string
          linkedin_url?: string
          email?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string
          date: string
          location: string
          image_url?: string
          registration_url?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          date: string
          location: string
          image_url?: string
          registration_url?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          date?: string
          location?: string
          image_url?: string
          registration_url?: string
          updated_at?: string
        }
      }
      gallery: {
        Row: {
          id: string
          title: string
          description?: string
          image_url: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string
          image_url: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          image_url?: string
          updated_at?: string
        }
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          subject: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          subject: string
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          subject?: string
          message?: string
        }
      }
    }
  }
}