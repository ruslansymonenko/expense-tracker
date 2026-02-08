import { Colors } from "@/constants/colors";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface ButtonProps {
  readonly title: string;
  readonly onPress: () => void;
  readonly variant?: "primary" | "secondary" | "outline";
  readonly disabled?: boolean;
  readonly loading?: boolean;
  readonly style?: ViewStyle;
}

export function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  style,
}: ButtonProps) {
  const buttonStyle = [
    styles.button,
    variant === "primary" ? styles.primaryButton : null,
    variant === "secondary" ? styles.secondaryButton : null,
    variant === "outline" ? styles.outlineButton : null,
    disabled || loading ? styles.disabledButton : null,
    style,
  ].filter(Boolean);

  const textStyle = [
    styles.text,
    variant === "primary" ? styles.primaryText : null,
    variant === "secondary" ? styles.secondaryText : null,
    variant === "outline" ? styles.outlineText : null,
  ].filter(Boolean);

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "outline" ? Colors.primary : "#fff"}
        />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.shadow.color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: Colors.shadow.opacity,
    shadowRadius: 8,
    elevation: 4,
  },
  secondaryButton: {
    backgroundColor: Colors.secondary,
    shadowColor: Colors.shadow.color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: Colors.shadow.opacity,
    shadowRadius: 8,
    elevation: 4,
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  disabledButton: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryText: {
    color: "#fff",
  },
  secondaryText: {
    color: "#fff",
  },
  outlineText: {
    color: Colors.primary,
  },
});
