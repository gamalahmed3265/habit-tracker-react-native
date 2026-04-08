# Habit Tracker Expo App 👋

**Habit Tracker** is a cross-platform mobile app built with [Expo](https://expo.dev) and React Native. It helps you build and maintain good habits by tracking your daily activities, visualizing streaks, and providing motivational feedback.

---

## App Features

- Add, edit, and delete habits
- Track daily completions
- Visualize progress with streaks and heatmaps
- Color and icon customization for each habit
- Persistent storage (local, with SQLite)

---

## Setup & Installation

### Local Development

1. Install dependencies
   ```bash
   npm install
   ```
2. Start the app
   ```bash
   npx expo start
   ```

You can open the app in:

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go)

Edit files in the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction/).

---

### Docker & Docker Compose

You can run the Expo app in a Docker container for easier setup and consistency.

#### 1. Build and run with Docker

```bash
docker build -t habit-tracker .
docker run -it -p 8081:8081 habit-tracker
```

#### 2. Or use Docker Compose

```bash
docker-compose up --build
```

This will start the Expo server and expose it on port 8081.

#### 3. Accessing the app

- Open the Expo DevTools in your browser (the URL will be shown in the container logs)
- Scan the QR code with Expo Go or use an emulator/simulator

#### 4. Stopping the container

Press `Ctrl+C` in the terminal or run:

```bash
docker-compose down
```

---

---

## Screenshots

| | | |
|:---:|:---:|:---:|
| <img src="demo/d- (1).png" width="200" /> | <img src="demo/d- (2).png" width="200" /> | <img src="demo/d- (3).png" width="200" /> |
| <img src="demo/d- (4).png" width="200" /> | <img src="demo/d- (5).png" width="200" /> | <img src="demo/d- (6).png" width="200" /> |
| <img src="demo/d- (7).png" width="200" /> | <img src="demo/d- (8).png" width="200" /> | <img src="demo/d- (9).png" width="200" /> |

## Demo

You can try the app in a few ways:

### 1. Expo Go (Recommended for quick demo)

- Install [Expo Go](https://expo.dev/go) on your iOS or Android device.
- Start the project locally or in Docker (see above).
- Scan the QR code in your terminal or browser with Expo Go.

### 2. Emulator/Simulator

- Use Android Studio or Xcode to run an emulator/simulator.
- Start the project and select the device from Expo DevTools.

### 3. Web

- Run `npx expo start --web` to launch the app in your browser (limited features).

---

When you're ready, run:

```bash
npm run reset-project
```

This will move the starter code to **app-example** and create a blank **app** directory.

## Roadmap & Progress

### ✅ Completed
- [x] **Cross-Platform Compatibility**: Replaced iOS-only `SymbolView` with `MaterialCommunityIcons` & `Ionicons`.
- [x] **Heatmap Calendar**: Visual representation of completion intensity over the last 7 weeks.
- [x] **Smart Streaks**: Robust logic to calculate perfection streaks even when adding new habits.
- [x] **Ready Habit Templates**: Quick-add section for common habits like "Morning Run", "Deep Work", etc.
- [x] **Data Safety**: Robust JSON parsing and validation to prevent app crashes from corrupt data.
- [x] **Seeder Utility**: Professional mock data generation for testing and demos.
- [x] **Audio Feedback**: Completion sounds for satisfying habit tracking.

### 🟡 Pending (In Progress)
- [ ] **Edit Habits**: Ability to update names, icons, or colors of existing habits.
- [ ] **Delete Habits**: Basic deletion is in, but needs a "safe-delete" confirmation.
- [ ] **Onboarding**: A first-time user guide or introduction flow.

### 🚀 Future Tasks
- [ ] **Smart Reminders**: Local and push notifications to remind you of pending habits.
- [ ] **Dark Mode**: Premium glassmorphic dark mode experience.
- [ ] **Cloud Sync**: Optional Firebase/Supabase integration to sync habits across devices.
- [ ] **Data Export**: Export your consistency data to CSV or JSON.
- [ ] **Categories**: Group habits by "Health", "Work", "Personal", etc.

---

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
