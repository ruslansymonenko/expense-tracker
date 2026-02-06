import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { Alert } from "react-native";
import {
  CreateExpenseRequest,
  expensesApi,
  UpdateExpenseRequest,
} from "../lib/api/expenses";
import { Expense } from "../types/expense";

export const EXPENSES_QUERY_KEY = ["expenses"];

export function useExpenses(): UseQueryResult<Expense[], Error> {
  return useQuery({
    queryKey: EXPENSES_QUERY_KEY,
    queryFn: () => expensesApi.getAll(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useExpense(id: string): UseQueryResult<Expense, Error> {
  return useQuery({
    queryKey: [...EXPENSES_QUERY_KEY, id],
    queryFn: () => expensesApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateExpenseRequest) => expensesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSES_QUERY_KEY });
      Alert.alert("Success", "Expense created successfully");
    },
    onError: (error: any) => {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to create expense",
      );
    },
  });
}

export function useUpdateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateExpenseRequest }) =>
      expensesApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: EXPENSES_QUERY_KEY });
      queryClient.invalidateQueries({
        queryKey: [...EXPENSES_QUERY_KEY, variables.id],
      });
      Alert.alert("Success", "Expense updated successfully");
    },
    onError: (error: any) => {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to update expense",
      );
    },
  });
}

export function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => expensesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSES_QUERY_KEY });
      Alert.alert("Success", "Expense deleted successfully");
    },
    onError: (error: any) => {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to delete expense",
      );
    },
  });
}
