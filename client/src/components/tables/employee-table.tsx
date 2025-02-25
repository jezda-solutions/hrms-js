import { Employee } from "@shared/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

interface EmployeeTableProps {
  data: Employee[];
}

export function EmployeeTable({ data }: EmployeeTableProps) {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead className="text-right">Salary</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.id}</TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>{employee.departmentId || "Unassigned"}</TableCell>
              <TableCell>
                {format(new Date(employee.joinDate), "PP")}
              </TableCell>
              <TableCell className="text-right">
                ${employee.salary.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                No employees found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
