import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ExpenseItem } from "../../../components/ExpenseItem";
import { Colors } from "../../../constants/colors";
import { MOCK_EXPENSES } from "../../../mocks/mockData";

export default function TransactionsPage() {
  const router = useRouter();

  const handleTransactionPress = (id: string) => {
    router.push(`/(tabs)/transactions/${id}` as any);
  };

  const renderHeader = () => (
    <>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total</Text>
          <Text style={styles.statValue}>{MOCK_EXPENSES.length}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>This Month</Text>
          <Text style={styles.statValue}>
            {
              MOCK_EXPENSES.filter(
                (e) => new Date(e.date).getMonth() === new Date().getMonth(),
              ).length
            }
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Amount</Text>
          <Text style={[styles.statValue, { color: Colors.primary }]}>
            ${MOCK_EXPENSES.reduce((sum, e) => sum + e.amount, 0).toFixed(0)}
          </Text>
        </View>
      </View>
      <Text style={styles.sectionTitle}>All Transactions</Text>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transactions</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={MOCK_EXPENSES}
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
});
