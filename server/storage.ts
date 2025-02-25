import { InsertUser, User, Department, Employee, Leave, Attendance } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUsers(): Promise<User[]>; // Added getUsers method

  // Department operations
  getDepartments(): Promise<Department[]>;
  getDepartment(id: number): Promise<Department | undefined>;
  createDepartment(department: Omit<Department, "id">): Promise<Department>;
  
  // Employee operations
  getEmployees(): Promise<Employee[]>;
  getEmployee(id: number): Promise<Employee | undefined>;
  createEmployee(employee: Omit<Employee, "id">): Promise<Employee>;
  
  // Leave operations
  getLeaves(): Promise<Leave[]>;
  getLeavesByEmployee(employeeId: number): Promise<Leave[]>;
  createLeave(leave: Omit<Leave, "id">): Promise<Leave>;
  updateLeaveStatus(id: number, status: string): Promise<Leave>;
  
  // Attendance operations
  getAttendance(employeeId: number): Promise<Attendance[]>;
  clockIn(employeeId: number): Promise<Attendance>;
  clockOut(id: number): Promise<Attendance>;

  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private departments: Map<number, Department>;
  private employees: Map<number, Employee>;
  private leaves: Map<number, Leave>;
  private attendance: Map<number, Attendance>;
  private currentId: number;
  sessionStore: session.SessionStore;

  constructor() {
    this.users = new Map();
    this.departments = new Map();
    this.employees = new Map();
    this.leaves = new Map();
    this.attendance = new Map();
    this.currentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    // Make the first registered user an admin
    const isFirstUser = this.users.size === 0;
    const user: User = { 
      ...insertUser, 
      id, 
      role: isFirstUser ? "admin" : "employee" 
    };
    this.users.set(id, user);
    return user;
  }

  async getUsers(): Promise<User[]> { // Added getUsers method implementation
    return Array.from(this.users.values());
  }

  async getDepartments(): Promise<Department[]> {
    return Array.from(this.departments.values());
  }

  async getDepartment(id: number): Promise<Department | undefined> {
    return this.departments.get(id);
  }

  async createDepartment(department: Omit<Department, "id">): Promise<Department> {
    const id = this.currentId++;
    const newDepartment = { ...department, id };
    this.departments.set(id, newDepartment);
    return newDepartment;
  }

  async getEmployees(): Promise<Employee[]> {
    return Array.from(this.employees.values());
  }

  async getEmployee(id: number): Promise<Employee | undefined> {
    return this.employees.get(id);
  }

  async createEmployee(employee: Omit<Employee, "id">): Promise<Employee> {
    const id = this.currentId++;
    const newEmployee = { ...employee, id };
    this.employees.set(id, newEmployee);
    return newEmployee;
  }

  async getLeaves(): Promise<Leave[]> {
    return Array.from(this.leaves.values());
  }

  async getLeavesByEmployee(employeeId: number): Promise<Leave[]> {
    return Array.from(this.leaves.values()).filter(
      (leave) => leave.employeeId === employeeId,
    );
  }

  async createLeave(leave: Omit<Leave, "id">): Promise<Leave> {
    const id = this.currentId++;
    const newLeave = { ...leave, id };
    this.leaves.set(id, newLeave);
    return newLeave;
  }

  async updateLeaveStatus(id: number, status: string): Promise<Leave> {
    const leave = this.leaves.get(id);
    if (!leave) throw new Error("Leave not found");
    const updatedLeave = { ...leave, status };
    this.leaves.set(id, updatedLeave);
    return updatedLeave;
  }

  async getAttendance(employeeId: number): Promise<Attendance[]> {
    return Array.from(this.attendance.values()).filter(
      (record) => record.employeeId === employeeId,
    );
  }

  async clockIn(employeeId: number): Promise<Attendance> {
    const id = this.currentId++;
    const record: Attendance = {
      id,
      employeeId,
      date: new Date(),
      clockIn: new Date(),
      clockOut: null,
    };
    this.attendance.set(id, record);
    return record;
  }

  async clockOut(id: number): Promise<Attendance> {
    const record = this.attendance.get(id);
    if (!record) throw new Error("Attendance record not found");
    const updatedRecord = { ...record, clockOut: new Date() };
    this.attendance.set(id, updatedRecord);
    return updatedRecord;
  }
}

export const storage = new MemStorage();