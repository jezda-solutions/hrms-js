import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Menu, Users, Building2, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export function MainNav() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

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

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="hover:bg-gray-100"
          aria-label="Toggle Menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="p-6 border-b">
          <SheetTitle>HR Management</SheetTitle>
        </SheetHeader>
        <Accordion type="single" collapsible className="p-6">
          {menuItems.map((section, i) => (
            <AccordionItem key={i} value={`section-${i}`}>
              <AccordionTrigger className="flex items-center gap-2">
                <section.icon className="h-4 w-4" />
                {section.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2 mt-2">
                  {section.items.map((item, j) => (
                    <Link
                      key={j}
                      href={item.href}
                      onClick={() => setOpen(false)}
                    >
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
      </SheetContent>
    </Sheet>
  );
}