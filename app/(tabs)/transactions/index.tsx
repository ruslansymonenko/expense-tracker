import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ExpenseItem } from "../../../components/ExpenseItem";
import { Colors } from "../../../constants/colors";
import { useExpenses } from "../../../hooks/useExpenses";

export default function TransactionsPage() {
  const router = useRouter();
  const { data: expenses, isLoading, error } = useExpenses();

  const handleTransactionPress = (id: string) => {
    router.push(`/(tabs)/transactions/${id}` as any);
  };

  const thisMonthCount =
    expenses?.filter((e) => {
      const expenseDate = e.date instanceof Date ? e.date : new Date(e.date);
      return expenseDate.getMonth() === new Date().getMonth();
    }).length ?? 0;

  const totalAmount = expenses?.reduce((sum, e) => sum + e.amount, 0) ?? 0;

  const renderHeader = () => (
    <>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total</Text>
          <Text style={styles.statValue}>{expenses?.length ?? 0}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>This Month</Text>
          <Text style={styles.statValue}>{thisMonthCount}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Amount</Text>
          <Text style={[styles.statValue, { color: Colors.primary }]}>
            ${totalAmount.toFixed(0)}
          </Text>
        </View>
      </View>
      <Text style={styles.sectionTitle}>All Transactions</Text>
    </>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Transactions</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading transactions...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Transactions</Text>
        </View>
        <View style={styles.errorContainer}>
          <Ionicons
            name="alert-circle-outline"
            size={48}
            color={Colors.error}
          />
          <Text style={styles.errorText}>Failed to load transactions</Text>
          <Text style={styles.errorSubText}>{error.message}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transactions</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={expenses}
        renderItem={({ item }) => (
          <ExpenseItem
            expense={item}
            onPress={() => handleTransactionPress(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/(tabs)/transactions/add" as any)}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={28} color={Colors.surface} />
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
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.text,
  },
  filterButton: {
    padding: 8,
  },
  listContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
    marginTop: 16,
    marginBottom: 24,
    padding: 20,
    borderRadius: 16,
    shadowColor: Colors.shadow.color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
  },
  divider: {
    width: 1,
    backgroundColor: Colors.borderLight,
    marginHorizontal: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    paddingHorizontal: 24,
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
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.shadow.color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
