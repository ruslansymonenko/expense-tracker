import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/colors";

interface Props {}

export const HomeActions: React.FC<Props> = (props) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <View
            style={[
              styles.actionIcon,
              { backgroundColor: Colors.primary + "20" },
            ]}
          >
            <Ionicons name="add-circle" size={32} color={Colors.primary} />
          </View>
          <Text style={styles.actionText}>Add Expense</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <View
            style={[
              styles.actionIcon,
              { backgroundColor: Colors.success + "20" },
            ]}
          >
            <Ionicons name="analytics" size={32} color={Colors.success} />
          </View>
          <Text style={styles.actionText}>View Reports</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <View
            style={[
              styles.actionIcon,
              { backgroundColor: Colors.warning + "20" },
            ]}
          >
            <Ionicons name="settings" size={32} color={Colors.warning} />
          </View>
          <Text style={styles.actionText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
  },
  seeAll: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "600",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
  },
  actionIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: Colors.text,
    fontWeight: "500",
    textAlign: "center",
  },
});
