import { ExpenseForm } from "@/components/forms/ExpenseForm";
import { Colors } from "@/constants/colors";
import { useCreateExpense } from "@/hooks/useExpenses";
import { CreateExpenseRequest, UpdateExpenseRequest } from "@/lib/api/expenses";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddExpensePage() {
  const router = useRouter();
  const createExpense = useCreateExpense();

  const handleSubmit = (data: CreateExpenseRequest | UpdateExpenseRequest) => {
    createExpense.mutate(data as CreateExpenseRequest, {
      onSuccess: () => {
        router.back();
      },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add Expense</Text>
      </View>
      <ExpenseForm
        onSubmit={handleSubmit}
        isLoading={createExpense.isPending}
        submitLabel="Create Expense"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
  },
});
