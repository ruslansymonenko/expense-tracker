import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface StatCardProps {
  readonly icon: keyof typeof Ionicons.glyphMap;
  readonly iconColor: string;
  readonly value: string | number;
  readonly label: string;
}

export const StatCard: React.FC<StatCardProps> = React.memo(
  ({ icon, iconColor, value, label }) => {
    const iconContainerStyle = React.useMemo(
      () => [styles.statIcon, { backgroundColor: iconColor + "20" }],
      [iconColor],
    );

    return (
      <View style={styles.statCard}>
        <View style={iconContainerStyle}>
          <Ionicons name={icon} size={24} color={iconColor} />
        </View>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    );
  },
);

StatCard.displayName = "StatCard";

const styles = StyleSheet.create({
  statCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    width: "47%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: "center",
  },
});
