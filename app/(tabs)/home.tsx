import { HomeActions } from "@/components/blocks/HomeActions";
import { HomeExpenses } from "@/components/blocks/HomeExpenses";
import { HomeHeader } from "@/components/blocks/HomeHeader";
import { HomeSummary } from "@/components/blocks/HomeSummary";
import { Colors } from "@/constants/colors";
import { useAuth } from "@/contexts/AuthContext";
import { useCategories } from "@/hooks/useCategories";
import { useExpenses } from "@/hooks/useExpenses";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useCallback, useMemo } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const { data: expenses, isLoading, error } = useExpenses();
  const { data: categories } = useCategories();

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const handleAddExpense = useCallback(() => {
    router.push("/transactions/add");
  }, []);

  const totalExpenses = useMemo(
    () => expenses?.reduce((sum, expense) => sum + expense.amount, 0) ?? 0,
    [expenses],
  );

  const thisMonthExpenses = useMemo(
    () =>
      expenses
        ?.filter((expense) => {
          const expenseDate =
            expense.date instanceof Date
              ? expense.date
              : new Date(expense.date);
          return expenseDate.getMonth() === new Date().getMonth();
        })
        .reduce((sum, expense) => sum + expense.amount, 0) ?? 0,
    [expenses],
  );

  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader userName={user?.name || "User"} onLogout={handleLogout} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <HomeSummary
          totalExpenses={totalExpenses}
          thisMonthExpenses={thisMonthExpenses}
        />

        <HomeActions />

        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loadingText}>Loading expenses...</Text>
          </View>
        )}

        {!isLoading && error && (
          <View style={styles.errorContainer}>
            <Ionicons
              name="alert-circle-outline"
              size={48}
              color={Colors.error}
            />
            <Text style={styles.errorText}>Failed to load expenses</Text>
            <Text style={styles.errorSubText}>{error.message}</Text>
          </View>
        )}

        {!isLoading && !error && (
          <HomeExpenses expenses={expenses || []} categories={categories} />
        )}

        <View style={styles.bottomSpacing} />
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={handleAddExpense}>
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
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
    paddingHorizontal: 24,
  },
  bottomSpacing: {
    height: 100,
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 60,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.shadow.color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  errorText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
  },
  errorSubText: {
    marginTop: 8,
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
  },
});
