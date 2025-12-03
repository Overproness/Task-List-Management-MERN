'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

const ACHIEVEMENTS = [
  { id: 'first_task', name: 'Getting Started', desc: 'Add your first task', xp: 10, unlocked: false },
  { id: 'streak_3', name: 'On Fire', desc: 'Complete 3 tasks in a row', xp: 25, unlocked: false },
  { id: 'task_10', name: 'Productive', desc: 'Complete 10 tasks', xp: 50, unlocked: false },
  { id: 'night_owl', name: 'Night Owl', desc: 'Use the app after 10 PM', xp: 15, unlocked: false },
  { id: 'speed_demon', name: 'Speed Demon', desc: 'Complete a task within 1 minute of creating it', xp: 30, unlocked: false },
  { id: 'collector', name: 'Collector', desc: 'Have 20 tasks at once', xp: 40, unlocked: false },
  { id: 'perfectionist', name: 'Perfectionist', desc: 'Complete all tasks in a single session', xp: 75, unlocked: false },
];

const LEVELS = [
  { level: 1, xpRequired: 0, name: 'Beginner', reward: 'Welcome to the journey' },
  { level: 2, xpRequired: 50, name: 'Novice', reward: 'Immersive Mode Unlocked!' },
  { level: 3, xpRequired: 150, name: 'Apprentice', reward: 'Custom themes unlocked' },
  { level: 4, xpRequired: 300, name: 'Adept', reward: 'Advanced animations' },
  { level: 5, xpRequired: 500, name: 'Expert', reward: 'Particle effects unlocked' },
  { level: 6, xpRequired: 800, name: 'Master', reward: 'All features unlocked!' },
];

export function GameProvider({ children }) {
  const [mode, setMode] = useState('minimal'); // 'minimal' or 'immersive'
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [achievements, setAchievements] = useState(ACHIEVEMENTS);
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showUnlockNotification, setShowUnlockNotification] = useState(null);
  const [isImmersiveModeUnlocked, setIsImmersiveModeUnlocked] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('taskGameState');
    if (saved) {
      const data = JSON.parse(saved);
      setMode(data.mode || 'minimal');
      setXp(data.xp || 0);
      setLevel(data.level || 1);
      setAchievements(data.achievements || ACHIEVEMENTS);
      setTasks(data.tasks || []);
      setCompletedTasks(data.completedTasks || 0);
      setStreak(data.streak || 0);
      setIsImmersiveModeUnlocked(data.isImmersiveModeUnlocked || false);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    const data = {
      mode,
      xp,
      level,
      achievements,
      tasks,
      completedTasks,
      streak,
      isImmersiveModeUnlocked,
    };
    localStorage.setItem('taskGameState', JSON.stringify(data));
  }, [mode, xp, level, achievements, tasks, completedTasks, streak, isImmersiveModeUnlocked]);

  // Check level up
  useEffect(() => {
    const currentLevelData = LEVELS.find(l => l.level === level);
    const nextLevelData = LEVELS.find(l => l.level === level + 1);
    
    if (nextLevelData && xp >= nextLevelData.xpRequired) {
      setLevel(level + 1);
      setShowUnlockNotification({
        type: 'levelUp',
        message: `Level Up! You're now ${nextLevelData.name}`,
        reward: nextLevelData.reward,
      });
      
      // Unlock immersive mode at level 2
      if (level + 1 === 2) {
        setIsImmersiveModeUnlocked(true);
      }
    }
  }, [xp, level]);

  const addXp = (amount, reason) => {
    setXp(prev => prev + amount);
    return amount;
  };

  const unlockAchievement = (achievementId) => {
    const achievement = achievements.find(a => a.id === achievementId);
    if (achievement && !achievement.unlocked) {
      const updated = achievements.map(a =>
        a.id === achievementId ? { ...a, unlocked: true } : a
      );
      setAchievements(updated);
      addXp(achievement.xp, `Achievement: ${achievement.name}`);
      setShowUnlockNotification({
        type: 'achievement',
        message: achievement.name,
        desc: achievement.desc,
        xp: achievement.xp,
      });
      return true;
    }
    return false;
  };

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now(),
      createdAt: Date.now(),
      completed: false,
    };
    setTasks(prev => [...prev, newTask]);
    
    // XP for adding task
    addXp(5, 'Task created');
    
    // Check achievements
    if (tasks.length === 0) {
      unlockAchievement('first_task');
    }
    if (tasks.length + 1 >= 20) {
      unlockAchievement('collector');
    }
    
    // Check night owl
    const hour = new Date().getHours();
    if (hour >= 22 || hour < 6) {
      unlockAchievement('night_owl');
    }
    
    return newTask;
  };

  const toggleTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    const updated = tasks.map(t =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
    
    if (!task.completed) {
      // Task completed
      setCompletedTasks(prev => prev + 1);
      setStreak(prev => prev + 1);
      addXp(15, 'Task completed');
      
      // Check speed demon
      const timeToComplete = Date.now() - task.createdAt;
      if (timeToComplete < 60000) { // 1 minute
        unlockAchievement('speed_demon');
      }
      
      // Check streak
      if (streak + 1 >= 3) {
        unlockAchievement('streak_3');
      }
      
      // Check total completed
      if (completedTasks + 1 >= 10) {
        unlockAchievement('task_10');
      }
      
      // Check perfectionist
      const allCompleted = updated.every(t => t.completed);
      if (allCompleted && updated.length > 0) {
        unlockAchievement('perfectionist');
      }
    } else {
      // Task uncompleted
      setStreak(0);
    }
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    setStreak(0);
  };

  const updateTask = (taskId, updates) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, ...updates } : t));
  };

  const toggleMode = () => {
    if (isImmersiveModeUnlocked) {
      setMode(prev => prev === 'minimal' ? 'immersive' : 'minimal');
    }
  };

  const getCurrentLevel = () => {
    return LEVELS.find(l => l.level === level) || LEVELS[0];
  };

  const getNextLevel = () => {
    return LEVELS.find(l => l.level === level + 1);
  };

  const getXpProgress = () => {
    const current = getCurrentLevel();
    const next = getNextLevel();
    if (!next) return 100;
    
    const xpInCurrentLevel = xp - current.xpRequired;
    const xpNeededForNextLevel = next.xpRequired - current.xpRequired;
    return (xpInCurrentLevel / xpNeededForNextLevel) * 100;
  };

  const value = {
    mode,
    setMode,
    toggleMode,
    xp,
    addXp,
    level,
    achievements,
    unlockAchievement,
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    completedTasks,
    streak,
    showUnlockNotification,
    setShowUnlockNotification,
    isImmersiveModeUnlocked,
    getCurrentLevel,
    getNextLevel,
    getXpProgress,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
}
