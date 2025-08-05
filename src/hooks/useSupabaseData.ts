import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase, type Database } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

type Tables = Database['public']['Tables']

// Projects
export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    }
  })
}

export const useCreateProject = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  
  return useMutation({
    mutationFn: async (project: Tables['projects']['Insert']) => {
      const { data, error } = await supabase
        .from('projects')
        .insert(project)
        .select()
        .single()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      toast({ title: "Project created successfully" })
    },
    onError: (error) => {
      toast({ title: "Error creating project", description: error.message, variant: "destructive" })
    }
  })
}

export const useUpdateProject = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string, updates: Tables['projects']['Update'] }) => {
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      toast({ title: "Project updated successfully" })
    },
    onError: (error) => {
      toast({ title: "Error updating project", description: error.message, variant: "destructive" })
    }
  })
}

export const useDeleteProject = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      toast({ title: "Project deleted successfully" })
    },
    onError: (error) => {
      toast({ title: "Error deleting project", description: error.message, variant: "destructive" })
    }
  })
}

// Publications
export const usePublications = () => {
  return useQuery({
    queryKey: ['publications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('publications')
        .select('*')
        .order('year', { ascending: false })
      
      if (error) throw error
      return data
    }
  })
}

export const useCreatePublication = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  
  return useMutation({
    mutationFn: async (publication: Tables['publications']['Insert']) => {
      const { data, error } = await supabase
        .from('publications')
        .insert(publication)
        .select()
        .single()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publications'] })
      toast({ title: "Publication created successfully" })
    },
    onError: (error) => {
      toast({ title: "Error creating publication", description: error.message, variant: "destructive" })
    }
  })
}

// Team Members
export const useTeamMembers = () => {
  return useQuery({
    queryKey: ['team_members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    }
  })
}

export const useCreateTeamMember = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  
  return useMutation({
    mutationFn: async (member: Tables['team_members']['Insert']) => {
      const { data, error } = await supabase
        .from('team_members')
        .insert(member)
        .select()
        .single()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team_members'] })
      toast({ title: "Team member added successfully" })
    },
    onError: (error) => {
      toast({ title: "Error adding team member", description: error.message, variant: "destructive" })
    }
  })
}

// Events
export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: false })
      
      if (error) throw error
      return data
    }
  })
}

export const useCreateEvent = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  
  return useMutation({
    mutationFn: async (event: Tables['events']['Insert']) => {
      const { data, error } = await supabase
        .from('events')
        .insert(event)
        .select()
        .single()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
      toast({ title: "Event created successfully" })
    },
    onError: (error) => {
      toast({ title: "Error creating event", description: error.message, variant: "destructive" })
    }
  })
}

// Gallery
export const useGallery = () => {
  return useQuery({
    queryKey: ['gallery'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    }
  })
}

export const useCreateGalleryItem = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  
  return useMutation({
    mutationFn: async (item: Tables['gallery']['Insert']) => {
      const { data, error } = await supabase
        .from('gallery')
        .insert(item)
        .select()
        .single()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] })
      toast({ title: "Gallery item added successfully" })
    },
    onError: (error) => {
      toast({ title: "Error adding gallery item", description: error.message, variant: "destructive" })
    }
  })
}

// Contact Messages
export const useContactMessages = () => {
  return useQuery({
    queryKey: ['contact_messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    }
  })
}

export const useCreateContactMessage = () => {
  const { toast } = useToast()
  
  return useMutation({
    mutationFn: async (message: Tables['contact_messages']['Insert']) => {
      const { data, error } = await supabase
        .from('contact_messages')
        .insert(message)
        .select()
        .single()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      toast({ title: "Message sent successfully" })
    },
    onError: (error) => {
      toast({ title: "Error sending message", description: error.message, variant: "destructive" })
    }
  })
}