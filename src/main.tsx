
import { createRoot } from 'react-dom/client'
import './index.css'
import { lazy, Suspense } from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
// Supabase will be handled by native integration
import { Loader2 } from 'lucide-react'

// Lazy load components
const App = lazy(() => import('./App.tsx'))

const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
    <span className="ml-2">Loading...</span>
  </div>
)

// Setup QueryClient
const queryClient = new QueryClient()

// Render with Suspense for code-splitting
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
  </QueryClientProvider>
)
