import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../constants/colors";
import { Expense } from "../types/expense";
import { Card } from "./ui/Card";

interface ExpenseItemProps {
  readonly expense: Expense;
  readonly onPress?: () => void;
}

export function ExpenseItem({ expense, onPress }: ExpenseItemProps) {
  const categoryColor =
    Colors.expense[
      expense.category.toLowerCase() as keyof typeof Colors.expense
    ] || Colors.expense.other;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <View style={styles.content}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: categoryColor + "20" },
            ]}
          >
            <Ionicons
              name={getCategoryIcon(expense.category)}
              size={24}
              color={categoryColor}
            />
          </View>

          <View style={styles.details}>
            <Text style={styles.title}>{expense.title}</Text>
            <Text style={styles.category}>{expense.category}</Text>
            <Text style={styles.date}>{formatDate(expense.date)}</Text>
          </View>

          <View style={styles.amountContainer}>
            <Text style={styles.amount}>-${expense.amount.toFixed(2)}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

function getCategoryIcon(category: string): any {
  const icons: Record<string, any> = {
    Food: "fast-food",
    Transport: "car",
    Shopping: "cart",
    Entertainment: "game-controller",
    Bills: "receipt",
    Other: "ellipsis-horizontal",
  };
  return icons[category] || "ellipsis-horizontal";
}

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
