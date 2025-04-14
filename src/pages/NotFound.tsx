
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="text-6xl font-bold mb-4 text-primary">404</div>
        
        <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
        
        <p className="text-muted-foreground mb-6">
          The page you are looking for doesn't exist or has been moved. Please check the URL or navigate back to the dashboard.
        </p>
        
        <div className="flex justify-center">
          <Button asChild>
            <Link to="/">Return to Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
