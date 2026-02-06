import { Expense } from "../../types/expense";
import { apiClient } from "./client";

export interface ExpensesResponse {
  data: Expense[];
  meta: {
    count: number;
  };
}

export interface ExpenseResponse {
  data: Expense;
}

export interface CreateExpenseRequest {
  title: string;
  amount: number;
  categoryId: string;
  date: string;
}

export interface UpdateExpenseRequest {
  title?: string;
  amount?: number;
  categoryId?: string;
  date?: string;
}

export const expensesApi = {
  async getAll(): Promise<Expense[]> {
    const response = await apiClient.get<ExpensesResponse>("/expenses");

    return response.data.data.map((expense) => ({
      ...expense,
      amount: Number(expense.amount),
      date: new Date(expense.date),
    }));
  },

  async getById(id: string): Promise<Expense> {
    const response = await apiClient.get<Expense>(`/expenses/${id}`);
    return {
      ...response.data,
      amount: Number(response.data.amount),
      date: new Date(response.data.date),
    };
  },

  async create(data: CreateExpenseRequest): Promise<Expense> {
    const response = await apiClient.post<ExpenseResponse>("/expenses", data);
    return {
      ...response.data.data,
      amount: Number(response.data.data.amount),
      date: new Date(response.data.data.date),
    };
  },

  async update(id: string, data: UpdateExpenseRequest): Promise<Expense> {
    const response = await apiClient.put<ExpenseResponse>(
      `/expenses/${id}`,
      data,
    );
    return {
      ...response.data.data,
      amount: Number(response.data.data.amount),
      date: new Date(response.data.data.date),
    };
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/expenses/${id}`);
  },
};
