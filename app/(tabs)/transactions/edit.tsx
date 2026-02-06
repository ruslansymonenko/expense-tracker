import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ExpenseForm } from "../../../components/forms/ExpenseForm";
import { Colors } from "../../../constants/colors";
import { useExpense, useUpdateExpense } from "../../../hooks/useExpenses";
import { UpdateExpenseRequest } from "../../../lib/api/expenses";

export default function EditExpensePage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data: expense, isLoading } = useExpense(id as string);
  const updateExpense = useUpdateExpense();

  const handleSubmit = (data: UpdateExpenseRequest) => {
    updateExpense.mutate(
      { id: id as string, data },
      {
        onSuccess: () => {
          router.back();
        },
      },
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading expense...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!expense) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Expense not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Edit Expense</Text>
      </View>
      <ExpenseForm
        initialData={expense}
        onSubmit={handleSubmit}
        isLoading={updateExpense.isPending}
        submitLabel="Update Expense"
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: Colors.error,
  },
});
