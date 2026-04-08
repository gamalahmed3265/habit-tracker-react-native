export type Habit = {
  id: string;
  name: string;
  icon: string;
  color: string;
  createdAt: string;
};
export type CompletionMap = {
  [date: string]: string[]; // date (YYYY-MM-DD) -> array of habit IDs completed
};
export function getTodayKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}
export function getDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function getActiveHabits(habits: Habit[], dateKey: string): Habit[] {
  if (!Array.isArray(habits)) return [];
  return habits.filter((h) => {
    if (!h?.createdAt) return false;
    const createdAtKey = getDateKey(new Date(h.createdAt));
    return createdAtKey <= dateKey;
  });
}

export function getHeatmapWeeks(): Date[][] {
  const today = new Date();
  let todayIndex = today.getDay() - 1; // 0 = Mon, 6 = Sun
  if (todayIndex < 0) todayIndex = 6;
  
  const daysAgo = 6 * 7 + todayIndex;
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - daysAgo);

  const weeks: Date[][] = [];
  let currentDate = new Date(startDate);
  
  for (let w = 0; w < 7; w++) {
    const week: Date[] = [];
    for (let d = 0; d < 7; d++) {
      week.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}

export const HABIT_ICONS = [
  "run",
  "book-open-variant",
  "water",
  "bed",
  "leaf",
  "dumbbell",
  "brain",
  "heart",
  "coffee",
  "pencil",
  "music",
  "pill",
  "food-apple",
  "moon-waning-crescent",
  "weather-sunny",
  "bike",
  "laptop",
  "meditation",
  "code-tags",
] as const;

export const READY_HABITS = [
  { name: "Morning Run", icon: "run", color: "#FF6B6B" },
  { name: "Read 30m", icon: "book-open-variant", color: "#4ECDC4" },
  { name: "Drink Water", icon: "water", color: "#45B7D1" },
  { name: "Exercise", icon: "dumbbell", color: "#96CEB4" },
  { name: "Meditate", icon: "brain", color: "#DDA0DD" },
  { name: "Deep Work", icon: "laptop", color: "#FF8C42" },
  { name: "Coding", icon: "code-tags", color: "#98D8C8" },
  { name: "Early Sleep", icon: "bed", color: "#BB8FCE" },
] as const;

export const HABIT_COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEAA7",
  "#DDA0DD",
  "#FF8C42",
  "#98D8C8",
  "#F7DC6F",
  "#BB8FCE",
  "#85C1E9",
  "#F1948A",
] as const;
