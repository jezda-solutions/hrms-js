import { Link, useLocation } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import {
  Users,
  Building2,
  Calendar,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "Employee Management",
    icon: Users,
    items: [
      { name: "Employee List", href: "/employees" },
      { name: "Add Employee", href: "/employees?action=new" },
    ],
  },
  {
    title: "Department Management",
    icon: Building2,
    items: [
      { name: "Department List", href: "/departments" },
      { name: "Add Department", href: "/departments?action=new" },
    ],
  },
  {
    title: "Leave Management",
    icon: Calendar,
    items: [
      { name: "Leave Requests", href: "/leaves" },
      { name: "Submit Request", href: "/leaves?action=new" },
    ],
  },
];

export function Navigation() {
  const [location] = useLocation();
  const { logoutMutation } = useAuth();

  return (
    <div className="space-y-4 py-4">
      <Accordion type="single" collapsible className="px-3">
        {menuItems.map((section, i) => (
          <AccordionItem key={i} value={`section-${i}`}>
            <AccordionTrigger className="flex items-center gap-2">
              <section.icon className="h-4 w-4" />
              {section.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-2 mt-2">
                {section.items.map((item, j) => (
                  <Link key={j} href={item.href}>
                    <Button
                      variant={location === item.href ? "secondary" : "ghost"}
                      className={cn("w-full justify-start", {
                        "bg-secondary": location === item.href,
                      })}
                    >
                      {item.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

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