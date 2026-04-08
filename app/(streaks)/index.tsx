import { Heatmap } from "@/components/heatmap";
import { StreakCard } from "@/components/streak-card";
import { useStorage } from "@/hooks/use-storage";
import { type CompletionMap, getDateKey, type Habit, getActiveHabits } from "@/utils/habits";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

function calculateTotalStreak(
  completions: CompletionMap,
  habits: Habit[],
): number {
  if (habits.length === 0) return 0;
  let streak = 0;
  const today = new Date();

  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = getDateKey(d);
    
    const activeHabits = getActiveHabits(habits, key);
    if (activeHabits.length === 0) {
      if (i > 0) break;
      continue;
    }

    const dayCompletions = completions[key] ?? [];
    const allDone = activeHabits.every((h) => dayCompletions.includes(h.id));

    if (allDone) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }
  return streak;
}

export default function StreaksScreen() {
  const [habits] = useStorage<Habit[]>("habits", []);
  const [completions] = useStorage<CompletionMap>("completions", {});

  const totalStreak = calculateTotalStreak(completions, habits);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ padding: 20, gap: 20, paddingBottom: 100 }}
    >
      {/* Overall Streak */}
      <Animated.View
        entering={FadeInDown.duration(400)}
        style={{
          alignItems: "center",
          padding: 24,
          borderRadius: 20,
          borderCurve: "continuous",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          gap: 6,
        }}
      >
        <MaterialCommunityIcons
          name="fire"
          color={totalStreak > 0 ? "#FF6B35" : "#CCC"}
          size={48}
        />
        <Text
          style={{
            fontSize: 48,
            fontWeight: "800",
            color: totalStreak > 0 ? "#FF6B35" : "#CCC",
            fontVariant: ["tabular-nums"],
          }}
        >
          {totalStreak}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "600", color: "#888" }}>
          {totalStreak === 1 ? "Day Perfect Streak" : "Days Perfect Streak"}
        </Text>
        <Text style={{ fontSize: 13, color: "#AAA", textAlign: "center" }}>
          Complete all habits every day to build your streak
        </Text>
      </Animated.View>

      {/* Heatmap */}
      <Animated.View
        entering={FadeInDown.duration(400).delay(100)}
        style={{
          padding: 16,
          borderRadius: 20,
          borderCurve: "continuous",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          gap: 14,
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: "700", color: "#1a1a1a" }}>
          Last 7 Weeks
        </Text>
        <Heatmap completions={completions} habits={habits} />
      </Animated.View>

      {/* Per-habit Streaks */}
      {habits.length > 0 && (
        <Animated.View
          entering={FadeInDown.duration(400).delay(200)}
          style={{ gap: 12 }}
        >
          <Text style={{ fontSize: 17, fontWeight: "700", color: "#1a1a1a" }}>
            Habit Streaks
          </Text>
          <View style={{ gap: 8 }}>
            {habits.map((habit, index) => (
              <StreakCard
                key={habit.id}
                habit={habit}
                completions={completions}
                index={index}
              />
            ))}
          </View>
        </Animated.View>
      )}

      {habits.length === 0 && (
        <Animated.View
          entering={FadeInDown.delay(200)}
          style={{
            alignItems: "center",
            paddingTop: 40,
            gap: 12,
          }}
        >
          <MaterialCommunityIcons
            name="chart-bar"
            color="#CCC"
            size={48}
          />
          <Text
            style={{
              fontSize: 16,
              color: "#999",
              textAlign: "center",
            }}
          >
            Add some habits to start tracking streaks
          </Text>
        </Animated.View>
      )}
    </ScrollView>
  );
}
