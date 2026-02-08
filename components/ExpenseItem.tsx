import { Card } from "@/components/ui/Card";
import { Colors } from "@/constants/colors";
import { Category } from "@/types/category";
import { Expense } from "@/types/expense";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ExpenseItemProps {
  readonly expense: Expense;
  readonly categories?: Category[];
  readonly onPress?: () => void;
}

export const ExpenseItem = React.memo(
  ({ expense, categories, onPress }: ExpenseItemProps) => {
    const category = useMemo(
      () => categories?.find((cat) => cat.id === expense.categoryId),
      [categories, expense.categoryId],
    );

    const categoryColor = useMemo(
      () => category?.color || Colors.expense.other,
      [category?.color],
    );

    const categoryIcon = useMemo(
      () => (category?.icon || "ellipsis-horizontal") as any,
      [category?.icon],
    );

    const categoryName = useMemo(
      () => category?.name || expense.category || "Other",
      [category?.name, expense.category],
    );

    const formatDate = useCallback((date: Date | string) => {
      const dateObj = date instanceof Date ? date : new Date(date);
      return dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }, []);

    const formattedDate = useMemo(
      () => formatDate(expense.date),
      [expense.date, formatDate],
    );

    const iconContainerStyle = useMemo(
      () => [styles.iconContainer, { backgroundColor: categoryColor + "20" }],
      [categoryColor],
    );

    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Card style={styles.card}>
          <View style={styles.content}>
            <View style={iconContainerStyle}>
              <Ionicons name={categoryIcon} size={24} color={categoryColor} />
            </View>

            <View style={styles.details}>
              <Text style={styles.title}>{expense.title}</Text>
              <Text style={styles.category}>{categoryName}</Text>
              <Text style={styles.date}>{formattedDate}</Text>
            </View>

            <View style={styles.amountContainer}>
              <Text style={styles.amount}>-${expense.amount.toFixed(2)}</Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  },
);

ExpenseItem.displayName = "ExpenseItem";

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 2,
  },
  category: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: Colors.textLight,
  },
  amountContainer: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.error,
  },
});
