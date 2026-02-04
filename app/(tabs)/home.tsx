import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ExpenseItem } from "../../components/ExpenseItem";
import { Card } from "../../components/ui/Card";
import { Colors } from "../../constants/colors";
import { useAuth } from "../../contexts/AuthContext";
import { MOCK_EXPENSES } from "../../mocks/mockData";

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const totalExpenses = MOCK_EXPENSES.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );
  const thisMonthExpenses = MOCK_EXPENSES.filter(
    (expense) => new Date(expense.date).getMonth() === new Date().getMonth(),
  ).reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.userName}>{user?.name || "User"}</Text>
        </View>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color={Colors.error} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.summaryContainer}>
          <Card
            style={StyleSheet.flatten([styles.summaryCard, styles.totalCard])}
          >
            <View style={styles.summaryIconContainer}>
              <Ionicons name="wallet" size={28} color="#fff" />
            </View>
            <Text style={styles.summaryLabel}>Total Expenses</Text>
            <Text style={styles.summaryAmount}>
              ${totalExpenses.toFixed(2)}
            </Text>
          </Card>

          <Card style={styles.summaryCard}>
            <View
              style={[
                styles.summaryIconContainer,
                { backgroundColor: Colors.secondary + "20" },
              ]}
            >
              <Ionicons name="calendar" size={28} color={Colors.secondary} />
            </View>
            <Text style={styles.summaryLabel}>This Month</Text>
            <Text style={[styles.summaryAmount, { color: Colors.text }]}>
              ${thisMonthExpenses.toFixed(2)}
            </Text>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <View
                style={[
                  styles.actionIcon,
                  { backgroundColor: Colors.primary + "20" },
                ]}
              >
                <Ionicons name="add-circle" size={32} color={Colors.primary} />
              </View>
              <Text style={styles.actionText}>Add Expense</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View
                style={[
                  styles.actionIcon,
                  { backgroundColor: Colors.success + "20" },
                ]}
              >
                <Ionicons name="analytics" size={32} color={Colors.success} />
              </View>
              <Text style={styles.actionText}>View Reports</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View
                style={[
                  styles.actionIcon,
                  { backgroundColor: Colors.warning + "20" },
                ]}
              >
                <Ionicons name="settings" size={32} color={Colors.warning} />
              </View>
              <Text style={styles.actionText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Expenses</Text>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/transactions")}
            >
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          {MOCK_EXPENSES.slice(0, 3).map((expense) => (
            <ExpenseItem key={expense.id} expense={expense} />
          ))}
        </View>

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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  greeting: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginTop: 2,
  },
  logoutButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  summaryContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
    marginBottom: 24,
  },
  summaryCard: {
    flex: 1,
    padding: 20,
  },
  totalCard: {
    backgroundColor: Colors.primary,
  },
  summaryIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 13,
    color: "#fff",
    marginBottom: 4,
    opacity: 0.9,
  },
  summaryAmount: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
  },
  seeAll: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "600",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
  },
  actionIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: Colors.text,
    fontWeight: "500",
    textAlign: "center",
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
