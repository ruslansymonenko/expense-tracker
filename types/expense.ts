export interface Expense {
  id: string;
  title: string;
  amount: number;
  categoryId: string;
  category?: string;
  date: Date | string;
  userId: string;
}

export type ExpenseCategory =
  | "Food"
  | "Transport"
  | "Shopping"
  | "Entertainment"
  | "Bills"
  | "Other";
