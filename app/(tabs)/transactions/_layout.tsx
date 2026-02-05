import { Stack } from "expo-router";
import { Colors } from "../../../constants/colors";

export default function TransactionsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Colors.background,
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          headerTitle: "Transaction Details",
          headerStyle: {
            backgroundColor: Colors.surface,
          },
          headerTintColor: Colors.text,
          headerShadowVisible: false,
          presentation: "card",
        }}
      />
    </Stack>
  );
}
