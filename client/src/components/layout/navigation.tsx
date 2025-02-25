import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import {
  Users,
  Building2,
  Calendar,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Employees", href: "/employees", icon: Users },
  { name: "Departments", href: "/departments", icon: Building2 },
  { name: "Leaves", href: "/leaves", icon: Calendar },
];

export function Navigation() {
  const [location] = useLocation();
  const { logoutMutation } = useAuth();

  return (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Management
        </h2>
        <div className="space-y-1">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <Button
                variant={location === item.href ? "secondary" : "ghost"}
                className={cn("w-full justify-start", {
                  "bg-secondary": location === item.href,
                })}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-3 py-2">
        <div className="space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => logoutMutation.mutate()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
