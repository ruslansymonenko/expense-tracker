import { TransactionActions } from "@/components/blocks/TransactionActions";
import { TransactionAmountCard } from "@/components/blocks/TransactionAmountCard";
import { TransactionDetailsCard } from "@/components/blocks/TransactionDetailsCard";
import { ErrorState } from "@/components/ui/ErrorState";
import { LoadingState } from "@/components/ui/LoadingState";
import { Colors } from "@/constants/colors";
import { useCategories } from "@/hooks/useCategories";
import { useDeleteExpense, useExpense } from "@/hooks/useExpenses";
import { formatDate, formatTime } from "@/lib/utils/dateHelpers";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TransactionDetailsPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { data: transaction, isLoading, error } = useExpense(id as string);
  const { data: categories } = useCategories();
  const deleteExpense = useDeleteExpense();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingState />
      </SafeAreaView>
    );
  }

  if (error || !transaction) {
    return (
      <SafeAreaView style={styles.container}>
        <ErrorState
          message={
            error ? "Failed to load transaction" : "Transaction not found"
          }
          onRetry={() => router.back()}
          retryLabel="Go Back"
        />
      </SafeAreaView>
    );
  }

  const category = categories?.find((cat) => cat.id === transaction.categoryId);
  const categoryColor = category?.color || Colors.expense.other;
  const categoryIcon = (category?.icon || "ellipsis-horizontal") as any;

  const handleEdit = () => {
    router.push(`/(tabs)/transactions/edit?id=${id}` as any);
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteExpense.mutate(id as string, {
              onSuccess: () => {
                router.back();
              },
            });
          },
        },
      ],
    );
  };

  const categoryIconComponent = (
    <View
      style={[styles.categoryIcon, { backgroundColor: categoryColor + "20" }]}
    >
      <Ionicons name={categoryIcon} size={20} color={categoryColor} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <TransactionAmountCard amount={transaction.amount} />

        <TransactionDetailsCard
          rows={[
            {
              label: "Category",
              value: category?.name || "Other",
              icon: categoryIconComponent,
            },
          ]}
        />

        <TransactionDetailsCard
          rows={[
            {
              label: "Title",
              value: transaction.title,
            },
            {
              label: "Date",
              value: formatDate(transaction.date, "long"),
            },
            {
              label: "Time",
              value: formatTime(transaction.date),
            },
            {
              label: "Transaction ID",
              value: transaction.id,
              valueStyle: { fontSize: 13 },
            },
          ]}
        />

        <TransactionActions onEdit={handleEdit} onDelete={handleDelete} />

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomSpacing: {
    height: 32,
  },
});
