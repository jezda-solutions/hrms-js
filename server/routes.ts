import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertDepartmentSchema, insertEmployeeSchema, insertLeaveSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Department routes
  app.get("/api/departments", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const departments = await storage.getDepartments();
    res.json(departments);
  });

  app.post("/api/departments", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "admin") 
      return res.sendStatus(403);
    const parsed = insertDepartmentSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);
    const department = await storage.createDepartment(parsed.data);
    res.status(201).json(department);
  });

  // Employee routes
  app.get("/api/employees", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const employees = await storage.getEmployees();
    res.json(employees);
  });

  app.post("/api/employees", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "admin") 
      return res.sendStatus(403);
    const parsed = insertEmployeeSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);
    const employee = await storage.createEmployee(parsed.data);
    res.status(201).json(employee);
  });

  // Add this route after the employee routes
  app.get("/api/users", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    // Get all users except the current user
    const users = await storage.getUsers();
    res.json(users.filter(user => user.id !== req.user?.id));
  });

  // Leave routes
  app.get("/api/leaves", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const leaves = await storage.getLeaves();
    res.json(leaves);
  });

  app.post("/api/leaves", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const parsed = insertLeaveSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);
    const leave = await storage.createLeave(parsed.data);
    res.status(201).json(leave);
  });

  app.patch("/api/leaves/:id/status", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "admin") 
      return res.sendStatus(403);
    const { status } = req.body;
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const leave = await storage.updateLeaveStatus(parseInt(req.params.id), status);
    res.json(leave);
  });

  // Attendance routes
  app.get("/api/attendance", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const employeeId = parseInt(req.query.employeeId as string);
    const attendance = await storage.getAttendance(employeeId);
    res.json(attendance);
  });

  app.post("/api/attendance/clock-in", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const { employeeId } = req.body;
    const record = await storage.clockIn(employeeId);
    res.status(201).json(record);
  });

  app.post("/api/attendance/:id/clock-out", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const record = await storage.clockOut(parseInt(req.params.id));
    res.json(record);
  });

  const httpServer = createServer(app);
  return httpServer;
}