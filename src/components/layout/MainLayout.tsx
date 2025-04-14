
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

type MainLayoutProps = {
  children?: React.ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  const [title, setTitle] = useState("Dashboard");
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col overflow-hidden transition-all duration-300",
        isMobileView ? "ml-0" : "md:ml-64"
      )}>
        <Header title={title} />
        
        <main className="flex-1 overflow-auto p-6">
          {children || <Outlet context={{ setTitle }} />}
        </main>
      </div>
    </div>
  );
}
