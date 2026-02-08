import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SettingItemProps {
  readonly icon: keyof typeof Ionicons.glyphMap;
  readonly label: string;
  readonly onPress?: () => void;
  readonly iconColor?: string;
  readonly textColor?: string;
  readonly showChevron?: boolean;
}

export const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  label,
  onPress,
  iconColor = Colors.text,
  textColor = Colors.text,
  showChevron = true,
}) => {
  return (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingLeft}>
        <Ionicons name={icon} size={24} color={iconColor} />
        <Text style={[styles.settingText, { color: textColor }]}>{label}</Text>
      </View>
      {showChevron && (
        <Ionicons
          name="chevron-forward"
          size={20}
          color={Colors.textSecondary}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  settingText: {
    fontSize: 16,
  },
});
