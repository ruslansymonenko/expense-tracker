import { Colors } from "@/constants/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import { StatCard } from "./StatCard";

interface ReportsStatsProps {
  readonly stats: {
    totalExpenses: number;
    thisMonth: number;
    thisWeek: number;
    today: number;
    avgPerDay: number;
  };
  readonly transactionCount: number;
}

export const ReportsStats: React.FC<ReportsStatsProps> = React.memo(
  ({ stats, transactionCount }) => {
    return (
      <View style={styles.statsGrid}>
        <StatCard
          icon="trending-up"
          iconColor={Colors.primary}
          value={`$${stats.totalExpenses.toFixed(2)}`}
          label="Total Expenses"
        />
        <StatCard
          icon="calendar-outline"
          iconColor={Colors.success}
          value={`$${stats.thisMonth.toFixed(2)}`}
          label="This Month"
        />
        <StatCard
          icon="time-outline"
          iconColor={Colors.warning}
          value={`$${stats.thisWeek.toFixed(2)}`}
          label="This Week"
        />
        <StatCard
          icon="today-outline"
          iconColor={Colors.error}
          value={`$${stats.today.toFixed(2)}`}
          label="Today"
        />
        <StatCard
          icon="analytics-outline"
          iconColor={Colors.primary}
          value={`$${stats.avgPerDay.toFixed(2)}`}
          label="Avg per Day"
        />
        <StatCard
          icon="receipt-outline"
          iconColor={Colors.success}
          value={transactionCount}
          label="Transactions"
        />
      </View>
    );
  },
);

ReportsStats.displayName = "ReportsStats";

const styles = StyleSheet.create({
  statsGrid: {
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
});
