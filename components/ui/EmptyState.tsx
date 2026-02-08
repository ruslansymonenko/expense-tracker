import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface EmptyStateProps {
  readonly icon?: keyof typeof Ionicons.glyphMap;
  readonly message: string;
  readonly subMessage?: string;
  readonly actionLabel?: string;
  readonly onAction?: () => void;
}

export function EmptyState({
  icon = "folder-open-outline",
  message,
  subMessage,
  actionLabel,
  onAction,
}: Readonly<EmptyStateProps>) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={64} color={Colors.textSecondary} />
      <Text style={styles.message}>{message}</Text>
      {subMessage && <Text style={styles.subMessage}>{subMessage}</Text>}
      {actionLabel && onAction && (
        <TouchableOpacity style={styles.button} onPress={onAction}>
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  message: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    textAlign: "center",
  },
  subMessage: {
    marginTop: 8,
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  button: {
    marginTop: 24,
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.surface,
    fontSize: 16,
    fontWeight: "600",
  },
});
