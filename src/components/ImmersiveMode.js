"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useGame } from "@/contexts/GameContext";
import { Crown, Flame, Plus, Star, Trash2, Trophy, Zap } from "lucide-react";
import { useState } from "react";

export default function ImmersiveMode() {
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    xp,
    level,
    streak,
    achievements,
    completedTasks,
    getCurrentLevel,
    getNextLevel,
    getXpProgress,
  } = useGame();

  const [newTaskText, setNewTaskText] = useState("");
  const [showAchievements, setShowAchievements] = useState(false);
  const [particles, setParticles] = useState([]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      addTask({ text: newTaskText.trim() });
      setNewTaskText("");
      spawnParticles(5);
    }
  };

  const handleToggleTask = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task && !task.completed) {
      spawnParticles(10);
    }
    toggleTask(taskId);
  };

  const spawnParticles = (count) => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      scale: Math.random() * 0.5 + 0.5,
    }));
    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) =>
        prev.filter((p) => !newParticles.find((np) => np.id === p.id))
      );
    }, 1000);
  };

  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasksList = tasks.filter((t) => t.completed);
  const currentLevel = getCurrentLevel();
  const nextLevel = getNextLevel();
  const unlockedAchievements = achievements.filter((a) => a.unlocked);

  return (
    <div className="min-h-screen bg-black py-8 px-4 relative overflow-hidden">
      {/* XP Display - Top Right */}
      <div className="fixed top-4 right-4 z-40">
        <div className="bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 shadow-lg">
          <span className="text-xs font-medium text-zinc-400">XP: </span>
          <span className="text-sm font-bold text-white">{xp}</span>
        </div>
      </div>

      {/* Animated background - removed colorful blobs */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 to-black" />

      {/* Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute pointer-events-none animate-float-up"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            transform: `rotate(${particle.rotation}deg) scale(${particle.scale})`,
          }}
        >
          <Star className="w-4 h-4 text-white fill-white" />
        </div>
      ))}

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header with stats */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-1">Tasks</h1>
              <p className="text-zinc-400 text-sm">
                Level up your productivity
              </p>
            </div>
            <button
              onClick={() => setShowAchievements(!showAchievements)}
              className="relative"
            >
              <div className="bg-zinc-900 border border-zinc-800 rounded-full p-4 shadow-lg hover:bg-zinc-800 transition-all hover:scale-110">
                <Trophy className="w-6 h-6 text-white" />
                {unlockedAchievements.length > 0 && (
                  <div className="absolute -top-1 -right-1 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    {unlockedAchievements.length}
                  </div>
                )}
              </div>
            </button>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            <Card className="bg-zinc-900 border-zinc-800 p-4 hover:bg-zinc-800/50 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <Crown className="w-4 h-4 text-zinc-400" />
                <span className="text-xs text-zinc-500">Level</span>
              </div>
              <p className="text-2xl font-bold text-white">{level}</p>
              <p className="text-xs text-zinc-600">{currentLevel.name}</p>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800 p-4 hover:bg-zinc-800/50 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-zinc-400" />
                <span className="text-xs text-zinc-500">XP</span>
              </div>
              <p className="text-2xl font-bold text-white">{xp}</p>
              {nextLevel && (
                <p className="text-xs text-zinc-600">
                  {nextLevel.xpRequired - xp} to next
                </p>
              )}
            </Card>

            <Card className="bg-zinc-900 border-zinc-800 p-4 hover:bg-zinc-800/50 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <Flame className="w-4 h-4 text-zinc-400" />
                <span className="text-xs text-zinc-500">Streak</span>
              </div>
              <p className="text-2xl font-bold text-white">{streak}</p>
              <p className="text-xs text-zinc-600">in a row</p>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800 p-4 hover:bg-zinc-800/50 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-4 h-4 text-zinc-400" />
                <span className="text-xs text-zinc-500">Done</span>
              </div>
              <p className="text-2xl font-bold text-white">{completedTasks}</p>
              <p className="text-xs text-zinc-600">completed</p>
            </Card>
          </div>

          {/* XP Progress */}
          {nextLevel && (
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-zinc-400">
                  Progress to Level {nextLevel.level}
                </span>
                <span className="text-sm text-zinc-400">
                  {Math.floor(getXpProgress())}%
                </span>
              </div>
              <div className="h-3 bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-500 rounded-full"
                  style={{ width: `${getXpProgress()}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Achievements panel */}
        {showAchievements && (
          <Card className="bg-zinc-900 border-zinc-800 p-6 mb-6 animate-fade-in">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-white" />
              Achievements
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border transition-all ${
                    achievement.unlocked
                      ? "bg-zinc-800 border-zinc-700"
                      : "bg-zinc-950 border-zinc-900 opacity-50"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <div
                      className={`p-2 rounded-full ${
                        achievement.unlocked ? "bg-zinc-700" : "bg-zinc-900"
                      }`}
                    >
                      <Trophy
                        className={`w-4 h-4 ${
                          achievement.unlocked ? "text-white" : "text-zinc-700"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`font-semibold text-sm ${
                          achievement.unlocked ? "text-white" : "text-zinc-600"
                        }`}
                      >
                        {achievement.name}
                      </h3>
                      <p
                        className={`text-xs ${
                          achievement.unlocked
                            ? "text-zinc-400"
                            : "text-zinc-700"
                        }`}
                      >
                        {achievement.desc}
                      </p>
                      <p
                        className={`text-xs mt-1 ${
                          achievement.unlocked
                            ? "text-zinc-500"
                            : "text-zinc-800"
                        }`}
                      >
                        +{achievement.xp} XP
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Add task form */}
        <form onSubmit={handleAddTask} className="mb-8">
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder="Add a task..."
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              className="flex-1 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-zinc-700 h-12 text-lg"
            />
            <Button
              type="submit"
              size="lg"
              className="bg-white hover:bg-zinc-200 text-black transition-all hover:scale-105"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add
            </Button>
          </div>
        </form>

        {/* Active tasks */}
        <div className="space-y-3 mb-8">
          {activeTasks.length === 0 && completedTasksList.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-block p-6 bg-zinc-900 border border-zinc-800 rounded-full mb-4">
                <Zap className="w-12 h-12 text-zinc-600" />
              </div>
              <p className="text-zinc-400 text-lg">No tasks yet</p>
              <p className="text-zinc-600 text-sm">
                Add your first task to get started
              </p>
            </div>
          )}

          {activeTasks.map((task, index) => (
            <Card
              key={task.id}
              className="bg-zinc-900 border-zinc-800 p-5 hover:border-zinc-700 transition-all hover:scale-[1.01] animate-slide-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-4">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => handleToggleTask(task.id)}
                  className="border-zinc-700 data-[state=checked]:bg-white data-[state=checked]:border-white w-6 h-6"
                />
                <span className="flex-1 text-white text-lg">{task.text}</span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-zinc-600 hover:text-zinc-400 transition-colors p-2 hover:bg-zinc-800 rounded-lg"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Completed tasks */}
        {completedTasksList.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm uppercase tracking-wider text-zinc-600 mb-4 flex items-center gap-2">
              <Star className="w-4 h-4 fill-zinc-600" />
              Completed ({completedTasksList.length})
            </h2>
            <div className="space-y-3">
              {completedTasksList.map((task, index) => (
                <Card
                  key={task.id}
                  className="bg-zinc-950 border-zinc-900 p-5 animate-fade-in"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => handleToggleTask(task.id)}
                      className="border-zinc-700 bg-white border-white w-6 h-6"
                    />
                    <span className="flex-1 text-zinc-600 text-lg line-through">
                      {task.text}
                    </span>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-zinc-700 hover:text-zinc-500 transition-colors p-2 hover:bg-zinc-900 rounded-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
