# Task Quest - Dual Mode Task Manager

A creative web application that reconciles two conflicting design philosophies through gamification and progressive enhancement.

## 🎯 Project Overview

This task management application uniquely solves the challenge of balancing **minimalist design** with **engaging, interactive experiences** by implementing a dual-mode system that users unlock through usage.

## ✨ Features

### Minimal Mode (Default)

- Clean, light color scheme with gray/white tones
- Simple, distraction-free interface
- Mobile-first responsive design
- Fast loading with minimal animations
- Focus on essential task management
- Subtle progress tracking

### Immersive Mode (Unlocked at Level 2)

- Dark, vibrant gradient backgrounds (purple/cyan/slate)
- Interactive animations and particle effects
- Rich visual feedback and hover states
- Comprehensive stats dashboard showing:
  - Current level and XP
  - Task completion streak
  - Total completed tasks
  - Achievement progress
- Gamification elements including:
  - 7 unique achievements
  - 6 progressive levels
  - XP rewards for actions
  - Visual celebration effects

## 🎮 Gamification System

### XP Rewards

- **+5 XP** - Create a task
- **+15 XP** - Complete a task
- **+10-75 XP** - Unlock achievements

### Achievements

1. **Getting Started** (10 XP) - Add your first task
2. **On Fire** (25 XP) - Complete 3 tasks in a row
3. **Productive** (50 XP) - Complete 10 tasks total
4. **Night Owl** (15 XP) - Use the app after 10 PM
5. **Speed Demon** (30 XP) - Complete a task within 1 minute of creating it
6. **Collector** (40 XP) - Have 20 tasks at once
7. **Perfectionist** (75 XP) - Complete all tasks in a single session

### Level Progression

- **Level 1 - Beginner** (0 XP)
- **Level 2 - Novice** (50 XP) - **Unlocks Immersive Mode!**
- **Level 3 - Apprentice** (150 XP)
- **Level 4 - Adept** (300 XP)
- **Level 5 - Expert** (500 XP)
- **Level 6 - Master** (800 XP)

## 🎨 Design Philosophy

The application starts users in **Minimal Mode** to ensure:

- Fast initial experience
- No overwhelming features
- Clean, professional appearance
- Accessibility and simplicity

As users engage with the app and complete tasks, they:

1. Earn XP for each action
2. Progress toward Level 2
3. Unlock **Immersive Mode** toggle
4. Can freely switch between modes based on preference

This approach satisfies both requirement sets:

- **Set 1 (Minimalist)**: Default experience, always available
- **Set 2 (Engaging)**: Unlockable reward that feels earned

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn UI
- **State Management**: React Context API
- **Persistence**: localStorage
- **Icons**: Lucide React
- **Animations**: Custom CSS keyframes

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and animations
│   ├── layout.js            # Root layout with GameProvider
│   └── page.js              # Main page with mode switching
├── components/
│   ├── ui/                  # Shadcn UI components
│   ├── MinimalMode.js       # Minimal mode interface
│   ├── ImmersiveMode.js     # Immersive mode interface
│   ├── ModeToggle.js        # Mode switching component
│   └── UnlockNotification.js # Achievement/level up notifications
└── contexts/
    └── GameContext.js       # Game state and logic
```

## 🚀 Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run development server**:

   ```bash
   npm run dev
   ```

3. **Open browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 💡 Usage Tips

1. **Start Simple**: Add your first few tasks in the clean minimal interface
2. **Earn XP**: Each task you add gives you 5 XP
3. **Complete Tasks**: Earn 15 XP per completed task
4. **Watch Progress**: A subtle progress bar shows your advancement
5. **Unlock Power**: Reach Level 2 (50 XP total) to unlock Immersive Mode
6. **Toggle Freely**: Switch between modes anytime using the top-left toggle

## 🎯 Key Interactions

### Minimal Mode

- Type task name → Click + button
- Click checkbox to complete
- Click trash icon to delete
- Completed tasks move to separate section

### Immersive Mode

- All minimal features plus:
- View stats cards (Level, XP, Streak, Completed)
- Click trophy icon to view achievements
- Watch particle effects on task completion
- Track progress bar to next level
- See animated notifications for achievements

## 🎨 Design Decisions

### Why Progressive Unlock?

- Avoids overwhelming new users
- Creates sense of progression and reward
- Makes the "rich" mode feel special and earned
- Satisfies both minimalist and engagement requirements simultaneously

### Why localStorage?

- No backend needed (per requirements)
- Instant persistence
- Works offline
- Simple implementation

### Why Two Complete Modes?

- Respects different user preferences
- Provides choice after unlocking
- Demonstrates both design philosophies
- Creates a unique, memorable experience

## 🎭 Creative Solution Summary

Instead of compromising between minimal and engaging design, this app **embraces both** by:

1. **Starting minimal** - Meeting Set 1 requirements by default
2. **Progressive enhancement** - Unlocking features through use
3. **User choice** - Allowing free switching after unlock
4. **Gamification as bridge** - Using game mechanics to transition between modes
5. **Dual implementation** - Fully realizing both design visions

This creates a unique user journey where simplicity gradually reveals depth, making both design philosophies coexist naturally.

## 📝 License

This project was created as a lab assignment for Web Engineering.

---

**Built with ❤️ using Next.js and Shadcn UI**
