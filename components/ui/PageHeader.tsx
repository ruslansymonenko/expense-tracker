import { Colors } from "@/constants/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface PageHeaderProps {
  readonly title: string;
  readonly rightComponent?: React.ReactNode;
}

export function PageHeader({
  title,
  rightComponent,
}: Readonly<PageHeaderProps>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {rightComponent}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.text,
  },
});
