import { ReportsStats } from "@/components/blocks/ReportsStats";
import { SettingsHeader } from "@/components/blocks/SettingsHeader";
import { Colors } from "@/constants/colors";
import { useExpenses } from "@/hooks/useExpenses";
import React, { useMemo } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReportsPage() {
  const { data: expenses, isLoading } = useExpenses();

  const stats = useMemo(() => {
    if (!expenses) {
      return {
        totalExpenses: 0,
        thisMonth: 0,
        thisWeek: 0,
        today: 0,
        avgPerDay: 0,
      };
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    let totalExpenses = 0;
    let thisMonth = 0;
    let thisWeek = 0;
    let todayExpenses = 0;

    expenses.forEach((expense) => {
      const expenseDate =
        expense.date instanceof Date ? expense.date : new Date(expense.date);
      totalExpenses += expense.amount;

      if (expenseDate >= monthStart) {
        thisMonth += expense.amount;
      }
      if (expenseDate >= weekAgo) {
        thisWeek += expense.amount;
      }
      if (
        expenseDate.getDate() === today.getDate() &&
        expenseDate.getMonth() === today.getMonth() &&
        expenseDate.getFullYear() === today.getFullYear()
      ) {
        todayExpenses += expense.amount;
      }
    });

    const daysInMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
    ).getDate();
    const avgPerDay = thisMonth / daysInMonth;

    return {
      totalExpenses,
      thisMonth,
      thisWeek,
      today: todayExpenses,
      avgPerDay,
    };
  }, [expenses]);

  return (
    <SafeAreaView style={styles.container}>
      <SettingsHeader title="Reports" subtitle="Track your spending patterns" />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <ReportsStats
            stats={stats}
            transactionCount={expenses?.length || 0}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
});
