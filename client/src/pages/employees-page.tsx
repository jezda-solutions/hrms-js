import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { EmployeeTable } from "@/components/tables/employee-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Employee } from "@shared/schema";

export default function EmployeesPage() {
  const { data: employees, isLoading } = useQuery<Employee[]>({
    queryKey: ["/api/employees"],
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Employees</h2>
          <p className="text-muted-foreground">Manage your organization's workforce</p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        ) : (
          <EmployeeTable data={employees || []} />
        )}
      </div>
    </DashboardLayout>
  );
}
