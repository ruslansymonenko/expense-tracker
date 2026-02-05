import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/colors";

interface Props {
  userName: string;
  onLogout: () => void;
}

export const HomeHeader: React.FC<Props> = ({ userName, onLogout }) => {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>Hello,</Text>
        <Text style={styles.userName}>{userName || "User"}</Text>
      </View>
      <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={24} color={Colors.error} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  greeting: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginTop: 2,
  },
  logoutButton: {
    padding: 8,
  },
});
