import { Expense } from "../types/expense";

export const MOCK_EXPENSES: Expense[] = [
  {
    id: "1",
    title: "Grocery Shopping",
    amount: 85.5,
    category: "Food",
    date: new Date(2026, 1, 3),
    userId: "1",
  },
  {
    id: "2",
    title: "Uber Ride",
    amount: 15.2,
    category: "Transport",
    date: new Date(2026, 1, 2),
    userId: "1",
  },
  {
    id: "3",
    title: "Netflix Subscription",
    amount: 15.99,
    category: "Entertainment",
    date: new Date(2026, 1, 1),
    userId: "1",
  },
  {
    id: "4",
    title: "New Shoes",
    amount: 120,
    category: "Shopping",
    date: new Date(2026, 0, 30),
    userId: "1",
  },
  {
    id: "5",
    title: "Electricity Bill",
    amount: 95.3,
    category: "Bills",
    date: new Date(2026, 0, 28),
    userId: "1",
  },
];

export const TEST_USERS = [
  {
    id: "1",
    email: "test@example.com",
    password: "password123",
    name: "Test User",
  },
  {
    id: "2",
    email: "demo@example.com",
    password: "demo123",
    name: "Demo User",
  },
];
