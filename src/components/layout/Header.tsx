
import { BellIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) {
  return (
    <header className="bg-background py-4 px-6 border-b flex items-center justify-between">
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full md:w-[300px] pl-10"
          />
        </div>
        
        <Button variant="ghost" size="icon" className="relative">
          <BellIcon className="h-5 w-5" />
          <span className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-destructive"></span>
        </Button>
      </div>
    </header>
  );
}
