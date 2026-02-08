import { Colors } from "@/constants/colors";
import { UI_CONSTANTS } from "@/constants/ui";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface CategorySummaryCardProps {
  readonly totalCategories: number;
  readonly totalExpenses: number;
}

export function CategorySummaryCard({
  totalCategories,
  totalExpenses,
}: Readonly<CategorySummaryCardProps>) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.item}>
          <Ionicons name="apps" size={24} color={Colors.primary} />
          <Text style={styles.label}>Categories</Text>
          <Text style={styles.value}>{totalCategories}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.item}>
          <Ionicons name="cash" size={24} color={Colors.success} />
          <Text style={styles.label}>Total Spent</Text>
          <Text style={[styles.value, { color: Colors.success }]}>
            ${totalExpenses.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    marginHorizontal: UI_CONSTANTS.SPACING.xl,
    marginTop: UI_CONSTANTS.SPACING.lg,
    marginBottom: UI_CONSTANTS.SPACING.lg,
    padding: 20,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.lg,
    ...UI_CONSTANTS.SHADOW.small,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  item: {
    flex: 1,
    alignItems: "center",
  },
  divider: {
    width: 1,
    backgroundColor: Colors.borderLight,
  },
  label: {
    fontSize: UI_CONSTANTS.FONT_SIZE.xs,
    color: Colors.textSecondary,
    marginTop: UI_CONSTANTS.SPACING.sm,
    marginBottom: UI_CONSTANTS.SPACING.xs,
  },
  value: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
  },
});
