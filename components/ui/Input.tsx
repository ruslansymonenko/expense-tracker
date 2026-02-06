import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { Colors } from "../../constants/colors";

interface InputProps extends TextInputProps {
  readonly label?: string;
  readonly error?: string;
  readonly icon?: React.ReactNode;
  readonly leftIcon?: React.ReactNode;
}

export function Input({
  label,
  error,
  icon,
  leftIcon,
  style,
  ...props
}: Readonly<InputProps>) {
  const hasIcon = icon || leftIcon;
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, error && styles.inputError]}>
        {(leftIcon || icon) && (
          <View style={styles.iconContainer}>{leftIcon || icon}</View>
        )}
        <TextInput
          style={[styles.input, hasIcon ? styles.inputWithIcon : null, style]}
          placeholderTextColor={Colors.textLight}
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  inputError: {
    borderColor: Colors.error,
  },
  iconContainer: {
    paddingLeft: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: Colors.text,
  },
  inputWithIcon: {
    paddingLeft: 8,
  },
  errorText: {
    fontSize: 12,
    color: Colors.error,
    marginTop: 4,
    marginLeft: 4,
  },
});
