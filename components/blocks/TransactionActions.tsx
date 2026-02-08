import { Colors } from "@/constants/colors";
import { UI_CONSTANTS } from "@/constants/ui";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TransactionActionsProps {
  readonly onEdit: () => void;
  readonly onDelete: () => void;
}

export function TransactionActions({
  onEdit,
  onDelete,
}: Readonly<TransactionActionsProps>) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.editButton]}
        onPress={onEdit}
      >
        <Ionicons name="create-outline" size={20} color={Colors.surface} />
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.deleteButton]}
        onPress={onDelete}
      >
        <Ionicons name="trash-outline" size={20} color={Colors.surface} />
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: UI_CONSTANTS.SPACING.xl,
    marginTop: UI_CONSTANTS.SPACING.md,
    gap: UI_CONSTANTS.SPACING.md,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.md,
    gap: UI_CONSTANTS.SPACING.sm,
  },
  editButton: {
    backgroundColor: Colors.primary,
  },
  deleteButton: {
    backgroundColor: Colors.error,
  },
  buttonText: {
    color: Colors.surface,
    fontSize: UI_CONSTANTS.FONT_SIZE.md,
    fontWeight: "600",
  },
});
