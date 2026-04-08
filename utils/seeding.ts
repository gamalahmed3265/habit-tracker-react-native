import { storage } from "@/utils/storage";
import { type CompletionMap, getDateKey, type Habit, generateId, HABIT_COLORS } from "@/utils/habits";

const MOCK_HABITS: Habit[] = [
  { id: generateId(), name: "Early Rising", icon: "weather-sunny", color: HABIT_COLORS[0], createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString() },
  { id: generateId(), name: "Daily Reading", icon: "book-open-variant", color: HABIT_COLORS[1], createdAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString() },
  { id: generateId(), name: "Mindful Eating", icon: "food-apple", color: HABIT_COLORS[2], createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() },
  { id: generateId(), name: "Regular Exercise", icon: "run", color: HABIT_COLORS[3], createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() },
  { id: generateId(), name: "Positive Thinking", icon: "brain", color: HABIT_COLORS[4], createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString() },
  { id: generateId(), name: "Time Blocking", icon: "pencil", color: HABIT_COLORS[5], createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString() },
  { id: generateId(), name: "Goal Setting", icon: "check", color: HABIT_COLORS[6], createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString() },
  { id: generateId(), name: "Deep Work", icon: "laptop", color: HABIT_COLORS[7], createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString() },
  { id: generateId(), name: "Skill Building", icon: "dumbbell", color: HABIT_COLORS[8], createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString() },
  { id: generateId(), name: "Healthy Sleeping", icon: "bed", color: HABIT_COLORS[9], createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() },
];

export function seedIfEmpty() {
  const currentHabits = storage.get<Habit[]>("habits", []);
  if (currentHabits.length > 0) return;

  // 1. Seed Habits
  storage.set("habits", MOCK_HABITS);

  // 2. Seed Completions (last 30 days)
  const completions: CompletionMap = {};
  const today = new Date();
  
  for (let i = 0; i < 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = getDateKey(d);
    
    // Select which habits were completed today (70% probability)
    const dayCompletions: string[] = [];
    MOCK_HABITS.forEach(habit => {
      const habitCreated = new Date(habit.createdAt);
      if (d >= habitCreated && Math.random() > 0.3) {
        dayCompletions.push(habit.id);
      }
    });

    if (dayCompletions.length > 0) {
      completions[key] = dayCompletions;
    }
  }

  storage.set("completions", completions);
  console.log("Seeding complete: 10 habits and 30 days of data added.");
}
