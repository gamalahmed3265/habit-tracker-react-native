import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(home)",
};

export default function RootLayout() {
  return (
    <>
      <NativeTabs>
        <NativeTabs.Trigger name="(home)">
          <Label>Today</Label>
          <Icon
            sf={{
              default: "checkmark.circle",
              selected: "checkmark.circle.fill",
            }}
          />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="(streaks)">
          <Label>Streaks</Label>
          <Icon sf={{ default: "flame", selected: "flame.fill" }} />
        </NativeTabs.Trigger>
      </NativeTabs>
      <StatusBar style="auto" />
    </>
  );
}
