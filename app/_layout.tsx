import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(home)",
};

export default function RootLayout() {
  return (
    <>
      <Tabs
        screenOptions={{ headerShown: false, tabBarActiveTintColor: "#3B82F6" }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            title: "Today",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "checkmark-circle" : "checkmark-circle-outline"}
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(streaks)"
          options={{
            title: "Streaks",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "flame" : "flame-outline"}
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar style="auto" />
    </>
  );
}
