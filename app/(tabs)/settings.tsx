import {
  SettingItem,
  SettingsDivider,
  SettingsHeader,
  SettingsSection,
  UserInfoCard,
} from "@/components/blocks";
import { Colors } from "@/constants/colors";
import { useAuth } from "@/contexts/AuthContext";
import React from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsPage() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: logout,
      },
    ]);
  };

  const handleAbout = () => {
    Alert.alert(
      "About Expense Tracker",
      "Version 1.0.0\n\nTrack your expenses easily and efficiently.",
      [{ text: "OK" }],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SettingsHeader title="Settings" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <SettingsSection title="Account">
          <UserInfoCard name={user?.name || "User"} email={user?.email || ""} />
        </SettingsSection>

        <SettingsSection title="Preferences">
          <SettingItem icon="notifications-outline" label="Notifications" />
          <SettingsDivider />
          <SettingItem icon="moon-outline" label="Dark Mode" />
          <SettingsDivider />
          <SettingItem icon="language-outline" label="Language" />
        </SettingsSection>

        <SettingsSection title="Support">
          <SettingItem icon="help-circle-outline" label="Help & Support" />
          <SettingsDivider />
          <SettingItem
            icon="information-circle-outline"
            label="About"
            onPress={handleAbout}
          />
        </SettingsSection>

        <SettingsSection>
          <SettingItem
            icon="log-out-outline"
            label="Logout"
            onPress={handleLogout}
            iconColor={Colors.error}
            textColor={Colors.error}
            showChevron={false}
          />
        </SettingsSection>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
});
