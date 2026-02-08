import { Card } from "@/components/ui/Card";
import { Colors } from "@/constants/colors";
import { UI_CONSTANTS } from "@/constants/ui";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface TransactionDetailRowProps {
  readonly label: string;
  readonly value: string;
  readonly icon?: React.ReactNode;
  readonly valueStyle?: any;
  readonly showDivider?: boolean;
}

interface TransactionDetailsCardProps {
  readonly rows: TransactionDetailRowProps[];
}

function DetailRow({
  label,
  value,
  icon,
  valueStyle,
  showDivider = true,
}: Readonly<TransactionDetailRowProps>) {
  return (
    <>
      <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.valueContainer}>
          {icon}
          <Text style={[styles.value, valueStyle]}>{value}</Text>
        </View>
      </View>
      {showDivider && <View style={styles.divider} />}
    </>
  );
}

export function TransactionDetailsCard({
  rows,
}: Readonly<TransactionDetailsCardProps>) {
  return (
    <Card style={styles.card}>
      {rows.map((row) => (
        <DetailRow
          key={row.label}
          {...row}
          showDivider={rows.indexOf(row) < rows.length - 1}
        />
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: UI_CONSTANTS.SPACING.xl,
    marginBottom: UI_CONSTANTS.SPACING.md,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: UI_CONSTANTS.SPACING.sm,
  },
  label: {
    fontSize: 15,
    color: Colors.textSecondary,
    fontWeight: "500",
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
    marginLeft: UI_CONSTANTS.SPACING.lg,
  },
  value: {
    fontSize: 15,
    color: Colors.text,
    fontWeight: "600",
    textAlign: "right",
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: UI_CONSTANTS.SPACING.sm,
  },
});
