import { Card } from "@/components/ui/Card";
import { Colors } from "@/constants/colors";
import { UI_CONSTANTS } from "@/constants/ui";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface TransactionAmountCardProps {
  readonly amount: number;
}

export function TransactionAmountCard({
  amount,
}: Readonly<TransactionAmountCardProps>) {
  return (
    <Card style={styles.card}>
      <View style={styles.section}>
        <Text style={styles.label}>Amount</Text>
        <Text style={styles.value}>${amount.toFixed(2)}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: UI_CONSTANTS.SPACING.xl,
    marginTop: UI_CONSTANTS.SPACING.lg,
    marginBottom: UI_CONSTANTS.SPACING.md,
    backgroundColor: Colors.primary,
  },
  section: {
    alignItems: "center",
    paddingVertical: UI_CONSTANTS.SPACING.lg,
  },
  label: {
    fontSize: UI_CONSTANTS.FONT_SIZE.sm,
    color: Colors.surface,
    opacity: 0.9,
    marginBottom: UI_CONSTANTS.SPACING.sm,
    fontWeight: "500",
  },
  value: {
    fontSize: 48,
    fontWeight: "bold",
    color: Colors.surface,
  },
});
