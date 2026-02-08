import { Card } from "@/components/ui/Card";
import { Colors } from "@/constants/colors";
import { UI_CONSTANTS } from "@/constants/ui";
import { Category } from "@/types/category";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CategoryListItemProps {
  readonly category: Category;
  readonly total: number;
  readonly count: number;
  readonly isSelected: boolean;
  readonly totalExpenses: number;
  readonly onPress: () => void;
  readonly onLongPress: () => void;
  readonly onEdit: () => void;
  readonly onDelete: () => void;
}

export function CategoryListItem({
  category,
  total,
  count,
  isSelected,
  totalExpenses,
  onPress,
  onLongPress,
  onEdit,
  onDelete,
}: Readonly<CategoryListItemProps>) {
  const percentage = totalExpenses > 0 ? (total / totalExpenses) * 100 : 0;

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.7}
    >
      <Card
        style={StyleSheet.flatten([
          styles.card,
          isSelected && styles.cardSelected,
        ])}
      >
        <View style={styles.header}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: category.color + "20" },
            ]}
          >
            <Ionicons
              name={category.icon as any}
              size={28}
              color={category.color}
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>{category.name}</Text>
            <Text style={styles.count}>
              {count} transaction{count === 1 ? "" : "s"}
            </Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionIcon} onPress={onEdit}>
              <Ionicons
                name="create-outline"
                size={20}
                color={Colors.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionIcon} onPress={onDelete}>
              <Ionicons name="trash-outline" size={20} color={Colors.error} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.amount, { color: category.color }]}>
            ${total.toFixed(2)}
          </Text>
          {total > 0 && totalExpenses > 0 && (
            <View
              style={[
                styles.percentageBadge,
                { backgroundColor: category.color + "20" },
              ]}
            >
              <Text style={[styles.percentageText, { color: category.color }]}>
                {percentage.toFixed(1)}%
              </Text>
            </View>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: UI_CONSTANTS.SPACING.md,
    padding: UI_CONSTANTS.SPACING.lg,
    borderWidth: 2,
    borderColor: "transparent",
  },
  cardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + "05",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: UI_CONSTANTS.SPACING.md,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.lg,
    alignItems: "center",
    justifyContent: "center",
    marginRight: UI_CONSTANTS.SPACING.md,
  },
  info: {
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    gap: UI_CONSTANTS.SPACING.sm,
  },
  actionIcon: {
    padding: UI_CONSTANTS.SPACING.sm,
  },
  name: {
    fontSize: UI_CONSTANTS.FONT_SIZE.lg,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 2,
  },
  count: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  amount: {
    fontSize: UI_CONSTANTS.FONT_SIZE.xl,
    fontWeight: "bold",
  },
  percentageBadge: {
    paddingHorizontal: UI_CONSTANTS.SPACING.md,
    paddingVertical: 6,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.md,
  },
  percentageText: {
    fontSize: UI_CONSTANTS.FONT_SIZE.sm,
    fontWeight: "600",
  },
});
