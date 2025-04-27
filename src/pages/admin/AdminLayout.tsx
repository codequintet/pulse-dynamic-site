import { Outlet } from 'react-router-dom';
import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';
import { FileText, User, Calendar, FolderOpen } from 'lucide-react';
import { Button } from "@/components/ui/button";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild onClick={() => navigate('/admin/projects')}>
                  <div className="flex items-center">
                    <FolderOpen className="mr-2" />
                    <span>Projects</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild onClick={() => navigate('/admin/publications')}>
                  <div className="flex items-center">
                    <FileText className="mr-2" />
                    <span>Publications</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild onClick={() => navigate('/admin/team')}>
                  <div className="flex items-center">
                    <User className="mr-2" />
                    <span>Team</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild onClick={() => navigate('/admin/events')}>
                  <div className="flex items-center">
                    <Calendar className="mr-2" />
                    <span>Events</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <div className="mt-auto p-4">
              <Button onClick={handleSignOut} variant="outline" className="w-full">
                Sign Out
              </Button>
            </div>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
