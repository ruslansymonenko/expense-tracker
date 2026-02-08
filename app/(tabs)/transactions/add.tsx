import { ExpenseForm } from "@/components/forms/ExpenseForm";
import { Colors } from "@/constants/colors";
import { useCreateExpense } from "@/hooks/useExpenses";
import { CreateExpenseRequest, UpdateExpenseRequest } from "@/lib/api/expenses";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Expense</Text>
        <View style={styles.placeholder} />
      </View>
      <ExpenseForm
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
  },
  placeholder: {
    width: 40,
  },
});
