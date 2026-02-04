import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "../../components/ui/Card";
import { Colors } from "../../constants/colors";
import { MOCK_CATEGORIES, MOCK_EXPENSES } from "../../mocks/mockData";
import { Category } from "../../types/category";

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const getCategoryTotal = (categoryName: string) => {
    return MOCK_EXPENSES.filter(
      (expense) => expense.category === categoryName,
    ).reduce((sum, expense) => sum + expense.amount, 0);
  };

  const getCategoryCount = (categoryName: string) => {
    return MOCK_EXPENSES.filter((expense) => expense.category === categoryName)
      .length;
  };

  const renderCategoryItem = ({ item }: { item: Category }) => {
    const total = getCategoryTotal(item.name);
    const count = getCategoryCount(item.name);
    const isSelected = selectedCategory === item.id;

    return (
      <TouchableOpacity
        onPress={() => setSelectedCategory(isSelected ? null : item.id)}
        activeOpacity={0.7}
      >
        <Card
          style={StyleSheet.flatten([
            styles.categoryCard,
            isSelected && styles.categoryCardSelected,
          ])}
        >
          <View style={styles.categoryHeader}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: item.color + "20" },
              ]}
            >
              <Ionicons name={item.icon as any} size={28} color={item.color} />
            </View>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryName}>{item.name}</Text>
              <Text style={styles.categoryCount}>
                {count} transaction{count === 1 ? "" : "s"}
              </Text>
            </View>
          </View>

          <View style={styles.categoryFooter}>
            <Text style={[styles.categoryAmount, { color: item.color }]}>
              ${total.toFixed(2)}
            </Text>
            {total > 0 && (
              <View
                style={[
                  styles.percentageBadge,
                  { backgroundColor: item.color + "20" },
                ]}
              >
                <Text style={[styles.percentageText, { color: item.color }]}>
                  {(
                    (total /
                      MOCK_EXPENSES.reduce((sum, e) => sum + e.amount, 0)) *
                    100
                  ).toFixed(1)}
                  %
                </Text>
              </View>
            )}
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  const totalExpenses = MOCK_EXPENSES.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle" size={28} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Ionicons name="apps" size={24} color={Colors.primary} />
            <Text style={styles.summaryLabel}>Categories</Text>
            <Text style={styles.summaryValue}>{MOCK_CATEGORIES.length}</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Ionicons name="cash" size={24} color={Colors.success} />
            <Text style={styles.summaryLabel}>Total Spent</Text>
            <Text style={[styles.summaryValue, { color: Colors.success }]}>
              ${totalExpenses.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      <FlatList
        data={MOCK_CATEGORIES}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
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
  addButton: {
    padding: 4,
  },
  summaryCard: {
    backgroundColor: Colors.surface,
    marginHorizontal: 24,
    marginTop: 16,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: Colors.shadow.color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryDivider: {
    width: 1,
    backgroundColor: Colors.borderLight,
  },
  summaryLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 8,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
  },
  listContainer: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  categoryCard: {
    marginBottom: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: "transparent",
  },
  categoryCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + "05",
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 2,
  },
  categoryCount: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  categoryFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryAmount: {
    fontSize: 24,
    fontWeight: "bold",
  },
  percentageBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  percentageText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
