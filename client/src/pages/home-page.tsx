import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Building2, Calendar } from "lucide-react";

export default function HomePage() {
  const { data: employees, isLoading: loadingEmployees } = useQuery({
    queryKey: ["/api/employees"],
  });

  const { data: departments, isLoading: loadingDepartments } = useQuery({
    queryKey: ["/api/departments"],
  });

  const { data: leaves, isLoading: loadingLeaves } = useQuery({
    queryKey: ["/api/leaves"],
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Overview of your HR management system
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/employees">
            <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Employees
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {loadingEmployees ? (
                  <Skeleton className="h-8 w-20" />
                ) : (
                  <div className="text-2xl font-bold">
                    {employees?.length || 0}
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>

          <Link href="/departments">
            <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Departments
                </CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {loadingDepartments ? (
                  <Skeleton className="h-8 w-20" />
                ) : (
                  <div className="text-2xl font-bold">
                    {departments?.length || 0}
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>

          <Link href="/leaves">
            <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Leaves
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {loadingLeaves ? (
                  <Skeleton className="h-8 w-20" />
                ) : (
                  <div className="text-2xl font-bold">
                    {leaves?.filter((l: any) => l.status === "pending").length || 0}
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}