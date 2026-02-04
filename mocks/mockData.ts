import { Category } from "../types/category";
import { Expense } from "../types/expense";

export const MOCK_CATEGORIES: Category[] = [
  { id: "1", name: "Food", icon: "fast-food", color: "#f59e0b" },
  { id: "2", name: "Transport", icon: "car", color: "#3b82f6" },
  { id: "3", name: "Entertainment", icon: "game-controller", color: "#8b5cf6" },
  { id: "4", name: "Shopping", icon: "cart", color: "#ec4899" },
  { id: "5", name: "Bills", icon: "receipt", color: "#ef4444" },
  { id: "6", name: "Health", icon: "medical", color: "#10b981" },
  { id: "7", name: "Education", icon: "school", color: "#0ea5e9" },
  { id: "8", name: "Other", icon: "ellipsis-horizontal", color: "#64748b" },
];

export const MOCK_EXPENSES: Expense[] = [
  {
    id: "1",
    title: "Grocery Shopping",
    amount: 85.5,
    category: MOCK_CATEGORIES[0].name,
    date: new Date(2026, 1, 3),
    userId: "1",
  },
  {
    id: "2",
    title: "Uber Ride",
    amount: 15.2,
    category: MOCK_CATEGORIES[1].name,
    date: new Date(2026, 1, 2),
    userId: "1",
  },
  {
    id: "3",
    title: "Netflix Subscription",
    amount: 15.99,
    category: MOCK_CATEGORIES[2].name,
    date: new Date(2026, 1, 1),
    userId: "1",
  },
  {
    id: "4",
    title: "New Shoes",
    amount: 120,
    category: MOCK_CATEGORIES[3].name,
    date: new Date(2026, 0, 30),
    userId: "1",
  },
  {
    id: "5",
    title: "Electricity Bill",
    amount: 95.3,
    category: MOCK_CATEGORIES[4].name,
    date: new Date(2026, 0, 28),
    userId: "1",
  },
];

export const TEST_USERS = [
  {
    id: "1",
    email: "test@test.com",
    password: "123456",
    name: "Test User",
  },
  {
    id: "2",
    email: "demo@example.com",
    password: "demo123",
    name: "Demo User",
  },
];
