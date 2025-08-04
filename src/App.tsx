import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageProjects from "./pages/admin/ManageProjects";
import ManagePublications from "./pages/admin/ManagePublications";
import ManageTeam from "./pages/admin/ManageTeam";
import ManageEvents from "./pages/admin/ManageEvents";
import AdminLogin from "./pages/admin/AdminLogin";
import ViewMessages from "./pages/admin/ViewMessages";
import ManageGallery from "./pages/admin/ManageGallery";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // For now, allow access - will be properly implemented with Supabase auth
  return <>{children}</>;
};

const App = () => (
  <BrowserRouter>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<ManageProjects />} />
          <Route path="publications" element={<ManagePublications />} />
          <Route path="team" element={<ManageTeam />} />
          <Route path="events" element={<ManageEvents />} />
          <Route path="messages" element={<ViewMessages />} />
          <Route path="gallery" element={<ManageGallery />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </BrowserRouter>
);

export default App;