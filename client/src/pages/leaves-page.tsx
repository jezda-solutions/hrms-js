import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { LeaveRequestForm } from "@/components/forms/leave-request-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { Leave } from "@shared/schema";
import { format } from "date-fns";

export default function LeavesPage() {
  const { data: leaves, isLoading } = useQuery<Leave[]>({
    queryKey: ["/api/leaves"],
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-yellow-500";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Leave Requests</h2>
            <p className="text-muted-foreground">
              Manage your leave applications
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Request Leave
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>New Leave Request</DialogTitle>
              </DialogHeader>
              <LeaveRequestForm />
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4">
            {leaves?.map((leave) => (
              <Card key={leave.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium">
                    {leave.type}
                    <Badge
                      className={`ml-2 ${getStatusColor(leave.status)}`}
                      variant="secondary"
                    >
                      {leave.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <div className="text-sm">
                      <span className="font-medium">Date Range: </span>
                      {format(new Date(leave.startDate), "PP")} -{" "}
                      {format(new Date(leave.endDate), "PP")}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Reason: </span>
                      {leave.reason}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
