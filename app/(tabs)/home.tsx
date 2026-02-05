import { HomeActions } from "@/components/blocks/HomeActions";
import { HomeExpenses } from "@/components/blocks/HomeExpenses";
import { HomeHeader } from "@/components/blocks/HomeHeader";
import { HomeSummary } from "@/components/blocks/HomeSummary";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/colors";
import { useAuth } from "../../contexts/AuthContext";
import { MOCK_EXPENSES } from "../../mocks/mockData";

export default function HomeScreen() {
  const { user, logout } = useAuth();

  const totalExpenses = MOCK_EXPENSES.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );
  const thisMonthExpenses = MOCK_EXPENSES.filter(
    (expense) => new Date(expense.date).getMonth() === new Date().getMonth(),
  ).reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader userName={user?.name || "User"} onLogout={logout} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <HomeSummary
          totalExpenses={totalExpenses}
          thisMonthExpenses={thisMonthExpenses}
        />

        <HomeActions />

        <HomeExpenses expenses={MOCK_EXPENSES} />

        <View style={styles.bottomSpacing} />
      </ScrollView>

      <TouchableOpacity style={styles.fab}>
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
    bottom: 80,
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
});
