
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  UserRound, 
  FileText, 
  Settings,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SidebarProps = {
  className?: string;
};

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button 
        variant="outline" 
        size="icon" 
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={toggleSidebar}
      >
        {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
      </Button>

      <aside className={cn(
        "fixed top-0 left-0 z-40 h-screen bg-sidebar transition-all duration-300 border-r",
        collapsed ? "-translate-x-full" : "translate-x-0",
        "md:translate-x-0",
        collapsed ? "md:w-20" : "md:w-64",
        className
      )}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b">
            {!collapsed && (
              <Link to="/" className="flex items-center">
                <span className="text-xl font-semibold text-primary">MedCare</span>
              </Link>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden md:flex"
              onClick={toggleSidebar}
            >
              {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </Button>
          </div>

          {/* Sidebar Menu */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            <ul className="space-y-2">
              <SidebarItem 
                icon={<LayoutDashboard size={20} />} 
                title="Dashboard" 
                to="/" 
                collapsed={collapsed}
              />
              <SidebarItem 
                icon={<Users size={20} />} 
                title="Patients" 
                to="/patients" 
                collapsed={collapsed}
              />
              <SidebarItem 
                icon={<Calendar size={20} />} 
                title="Appointments" 
                to="/appointments" 
                collapsed={collapsed}
              />
              <SidebarItem 
                icon={<UserRound size={20} />} 
                title="Doctors" 
                to="/doctors" 
                collapsed={collapsed}
              />
              <SidebarItem 
                icon={<FileText size={20} />} 
                title="Reports" 
                to="/reports" 
                collapsed={collapsed}
              />
              <SidebarItem 
                icon={<Settings size={20} />} 
                title="Settings" 
                to="/settings" 
                collapsed={collapsed}
              />
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="px-3 py-4 border-t">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                A
              </div>
              {!collapsed && (
                <div className="ml-3">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">admin@hospital.com</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

type SidebarItemProps = {
  icon: React.ReactNode;
  title: string;
  to: string;
  collapsed: boolean;
};

function SidebarItem({ icon, title, to, collapsed }: SidebarItemProps) {
  return (
    <li>
      <Link
        to={to}
        className={cn(
          "flex items-center p-2 text-foreground rounded-lg hover:bg-muted group",
          to === window.location.pathname && "bg-primary/10 text-primary"
        )}
      >
        <div className="flex-shrink-0">{icon}</div>
        {!collapsed && <span className="ms-3">{title}</span>}
      </Link>
    </li>
  );
}
