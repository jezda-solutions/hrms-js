import { Navigation } from "./navigation";
import { MainNav } from "./mobile-nav";
import { Building2 } from "lucide-react";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <main className="flex-1 min-h-screen bg-background">
        <header className="flex h-16 items-center gap-4 border-b px-6">
          <MainNav />
          <div className="flex-1 flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="font-semibold">HR Management</span>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}