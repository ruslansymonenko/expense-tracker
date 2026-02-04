export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: Date;
  userId: string;
}

export type ExpenseCategory =
  | "Food"
  | "Transport"
  | "Shopping"
  | "Entertainment"
  | "Bills"
  | "Other";
