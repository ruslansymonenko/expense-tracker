import { Card } from "@/components/ui/Card";
import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  totalExpenses: number;
  thisMonthExpenses: number;
}

export const HomeSummary: React.FC<Props> = ({
  totalExpenses,
  thisMonthExpenses,
}) => {
  return (
    <View style={styles.summaryContainer}>
      <Card style={StyleSheet.flatten([styles.summaryCard, styles.totalCard])}>
        <View style={styles.summaryIconContainer}>
          <Ionicons name="wallet" size={28} color="#fff" />
        </View>
        <Text style={styles.summaryLabel}>Total Expenses</Text>
        <Text style={styles.summaryAmount}>${totalExpenses.toFixed(2)}</Text>
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
  );
};

const styles = StyleSheet.create({
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
});
