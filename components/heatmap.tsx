import { getDateKey, getHeatmapWeeks, getActiveHabits, type CompletionMap, type Habit } from "@/utils/habits";
import { Text, View, useWindowDimensions } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

type Props = {
  completions: CompletionMap;
  habits: Habit[];
};

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getIntensity(
  completedCount: number,
  totalHabits: number,
): { bg: string; border: string } {
  if (totalHabits === 0 || completedCount === 0) {
    return { bg: "#F0F0F0", border: "#E0E0E0" };
  }
  const ratio = completedCount / totalHabits;
  if (ratio >= 1) return { bg: "#22C55E", border: "#16A34A" };
  if (ratio >= 0.75) return { bg: "#4ADE80", border: "#22C55E" };
  if (ratio >= 0.5) return { bg: "#86EFAC", border: "#4ADE80" };
  if (ratio >= 0.25) return { bg: "#BBF7D0", border: "#86EFAC" };
  return { bg: "#DCFCE7", border: "#BBF7D0" };
}

export function Heatmap({ completions, habits }: Props) {
  const { width } = useWindowDimensions();
  const weeks = getHeatmapWeeks();

  if (width === 0 || !Array.isArray(habits)) {
    return <View style={{ height: 180 }} />;
  }

  const labelWidth = 32;
  // 20px screen padding each side (40) + 16px card padding each side (32) = 72
  const horizontalPadding = 72;
  const availableWidth = Math.max(0, width - horizontalPadding - labelWidth);
  const gap = 3;
  const cellSize = Math.max(
    1,
    Math.floor((availableWidth - gap * (weeks.length - 1)) / weeks.length),
  );

  const todayKey = getDateKey(new Date());

  return (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: "row", gap }}>
        {/* Weekday labels */}
        <View style={{ width: labelWidth, gap, justifyContent: "flex-start" }}>
          {WEEKDAYS.map((day, i) => (
            <View
              key={day}
              style={{
                height: cellSize,
                justifyContent: "center",
              }}
            >
              {i % 2 === 0 ? (
                <Text
                  style={{
                    fontSize: 11,
                    color: "#999",
                    fontWeight: "500",
                  }}
                >
                  {day}
                </Text>
              ) : null}
            </View>
          ))}
        </View>

        {/* Grid */}
        {weeks.map((week, weekIdx) => (
          <View key={weekIdx} style={{ gap }}>
            {week.map((day, dayIdx) => {
              const dateKey = getDateKey(day);
              if (dateKey > todayKey) {
                // Future dates placeholder
                return (
                  <View
                    key={dateKey}
                    style={{
                      width: cellSize,
                      height: cellSize,
                    }}
                  />
                );
              }

              const count = completions[dateKey]?.length ?? 0;
              const activeCount = getActiveHabits(habits, dateKey).length;
              const { bg, border } = getIntensity(count, activeCount);
              const isToday = todayKey === dateKey;

              return (
                <Animated.View
                  key={dateKey}
                  entering={FadeIn.delay((weekIdx * 7 + dayIdx) * 15)}
                  style={{
                    width: cellSize,
                    height: cellSize,
                    borderRadius: 4,
                    borderCurve: "continuous",
                    backgroundColor: bg,
                    borderWidth: isToday ? 2 : 1,
                    borderColor: isToday ? "#3B82F6" : border,
                  }}
                />
              );
            })}
          </View>
        ))}
      </View>

      {/* Legend */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
        <Text style={{ fontSize: 12, color: "#999" }}>Less</Text>
        {["#F0F0F0", "#DCFCE7", "#BBF7D0", "#86EFAC", "#4ADE80", "#22C55E"].map(
          (color) => (
            <View
              key={color}
              style={{
                width: 14,
                height: 14,
                borderRadius: 3,
                borderCurve: "continuous",
                backgroundColor: color,
              }}
            />
          ),
        )}
        <Text style={{ fontSize: 12, color: "#999" }}>More</Text>
      </View>
    </View>
  );
}
