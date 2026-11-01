import { z } from "zod";

export const eventWizardSchema = z.object({
  title: z.string().min(3, "Event title must be at least 3 characters"),
  event_type: z.enum(["Wedding", "Birthday", "College Fest", "Conference", "Corporate"]),
  event_date: z.string().min(1, "Event date is required"),
  event_time: z.string().min(1, "Event time is required"),
  location: z.string().min(2, "Location or city is required"),
  guest_count: z.number().min(10, "Guest count must be at least 10").max(50000),
  total_budget: z.number().min(5000, "Minimum budget is 5,000"),
  theme_style: z.string().min(2, "Select or enter a theme style"),
  catering_preference: z.string().min(2, "Select a catering preference"),
  priorities: z.array(z.string()).min(1, "Select at least one top priority"),
});

export const expenseSchema = z.object({
  category: z.string().min(2),
  title: z.string().min(2, "Expense title is required"),
  vendor: z.string().min(1, "Vendor or supplier name is required"),
  estimated: z.number().min(0),
  actual: z.number().min(0),
  priority: z.enum(["High", "Medium", "Low"]),
  status: z.enum(["Pending", "Deposit Paid", "Paid"]),
});
