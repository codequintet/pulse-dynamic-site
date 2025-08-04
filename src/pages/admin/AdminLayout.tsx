import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AdminLayout = () => {
  const location = useLocation();
  
  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: '📊' },
    { name: 'Projects', href: '/admin/projects', icon: '🔬' },
    { name: 'Publications', href: '/admin/publications', icon: '📄' },
    { name: 'Team', href: '/admin/team', icon: '👥' },
    { name: 'Events', href: '/admin/events', icon: '📅' },
    { name: 'Gallery', href: '/admin/gallery', icon: '🖼️' },
    { name: 'Messages', href: '/admin/messages', icon: '📧' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        <div className="w-64 bg-card border-r">
          <div className="p-6">
            <h2 className="text-xl font-bold">Admin Panel</h2>
          </div>
          <nav className="px-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  location.pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;