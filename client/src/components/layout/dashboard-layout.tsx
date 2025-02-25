import { Navigation } from "./navigation";
import { MobileNav } from "./mobile-nav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Building2 } from "lucide-react";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:block w-72 border-r bg-gray-50/40">
        <div className="flex h-16 items-center px-6">
          <Building2 className="h-6 w-6 text-primary mr-2" />
          <span className="font-semibold">HR Management</span>
        </div>
        <Separator />
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <Navigation />
        </ScrollArea>
      </div>
      <main className="flex-1 min-h-screen bg-background">
        <header className="flex h-16 items-center gap-4 border-b px-6">
          <MobileNav />
          <div className="flex-1 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary lg:hidden" />
              <span className="font-semibold lg:hidden">HR Management</span>
            </div>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}