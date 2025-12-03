'use client';

import { useState, useEffect } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Plus, Trash2, Zap, Trophy, Star, Flame, Crown } from 'lucide-react';

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

  const [newTaskText, setNewTaskText] = useState('');
  const [showAchievements, setShowAchievements] = useState(false);
  const [particles, setParticles] = useState([]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      addTask({ text: newTaskText.trim() });
      setNewTaskText('');
      spawnParticles(5);
    }
  };

  const handleToggleTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
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
    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 1000);
  };

  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasksList = tasks.filter(t => t.completed);
  const currentLevel = getCurrentLevel();
  const nextLevel = getNextLevel();
  const unlockedAchievements = achievements.filter(a => a.unlocked);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute pointer-events-none animate-float-up"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            transform: `rotate(${particle.rotation}deg) scale(${particle.scale})`,
          }}
        >
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        </div>
      ))}

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header with stats */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                Quest Board
              </h1>
              <p className="text-purple-300 text-sm">Level up your productivity</p>
            </div>
            <button
              onClick={() => setShowAchievements(!showAchievements)}
              className="relative"
            >
              <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-full p-4 shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-110">
                <Trophy className="w-6 h-6 text-yellow-400" />
                {unlockedAchievements.length > 0 && (
                  <div className="absolute -top-1 -right-1 bg-yellow-400 text-purple-900 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    {unlockedAchievements.length}
                  </div>
                )}
              </div>
            </button>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            <Card className="bg-gradient-to-br from-purple-800/50 to-purple-900/50 border-purple-500/30 backdrop-blur-sm p-4">
              <div className="flex items-center gap-2 mb-1">
                <Crown className="w-4 h-4 text-yellow-400" />
                <span className="text-xs text-purple-300">Level</span>
              </div>
              <p className="text-2xl font-bold text-white">{level}</p>
              <p className="text-xs text-purple-400">{currentLevel.name}</p>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-800/50 to-cyan-900/50 border-cyan-500/30 backdrop-blur-sm p-4">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span className="text-xs text-cyan-300">XP</span>
              </div>
              <p className="text-2xl font-bold text-white">{xp}</p>
              {nextLevel && (
                <p className="text-xs text-cyan-400">{nextLevel.xpRequired - xp} to next</p>
              )}
            </Card>

            <Card className="bg-gradient-to-br from-orange-800/50 to-orange-900/50 border-orange-500/30 backdrop-blur-sm p-4">
              <div className="flex items-center gap-2 mb-1">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="text-xs text-orange-300">Streak</span>
              </div>
              <p className="text-2xl font-bold text-white">{streak}</p>
              <p className="text-xs text-orange-400">in a row</p>
            </Card>

            <Card className="bg-gradient-to-br from-green-800/50 to-green-900/50 border-green-500/30 backdrop-blur-sm p-4">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-4 h-4 text-green-400" />
                <span className="text-xs text-green-300">Done</span>
              </div>
              <p className="text-2xl font-bold text-white">{completedTasks}</p>
              <p className="text-xs text-green-400">completed</p>
            </Card>
          </div>

          {/* XP Progress */}
          {nextLevel && (
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-purple-300">Progress to Level {nextLevel.level}</span>
                <span className="text-sm text-purple-300">{Math.floor(getXpProgress())}%</span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 transition-all duration-500 rounded-full shadow-lg shadow-purple-500/50"
                  style={{ width: `${getXpProgress()}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Achievements panel */}
        {showAchievements && (
          <Card className="bg-slate-800/90 border-purple-500/30 backdrop-blur-sm p-6 mb-6 animate-fade-in">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              Achievements
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border transition-all ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-yellow-900/30 to-yellow-800/30 border-yellow-500/50'
                      : 'bg-slate-900/50 border-slate-700/50 opacity-50'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <div className={`p-2 rounded-full ${achievement.unlocked ? 'bg-yellow-500/20' : 'bg-slate-700/50'}`}>
                      <Trophy className={`w-4 h-4 ${achievement.unlocked ? 'text-yellow-400' : 'text-slate-500'}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold text-sm ${achievement.unlocked ? 'text-white' : 'text-slate-400'}`}>
                        {achievement.name}
                      </h3>
                      <p className={`text-xs ${achievement.unlocked ? 'text-purple-300' : 'text-slate-500'}`}>
                        {achievement.desc}
                      </p>
                      <p className={`text-xs mt-1 ${achievement.unlocked ? 'text-yellow-400' : 'text-slate-600'}`}>
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
              placeholder="What quest shall you embark on?"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              className="flex-1 bg-slate-800/50 border-purple-500/30 text-white placeholder:text-purple-400/50 focus:border-purple-500 backdrop-blur-sm h-12 text-lg"
            />
            <Button
              type="submit"
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Quest
            </Button>
          </div>
        </form>

        {/* Active tasks */}
        <div className="space-y-3 mb-8">
          {activeTasks.length === 0 && completedTasksList.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-block p-6 bg-slate-800/50 rounded-full mb-4">
                <Zap className="w-12 h-12 text-purple-400" />
              </div>
              <p className="text-purple-300 text-lg">Your quest board awaits</p>
              <p className="text-purple-400/70 text-sm">Add your first quest to begin your journey</p>
            </div>
          )}

          {activeTasks.map((task, index) => (
            <Card
              key={task.id}
              className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-sm p-5 hover:border-purple-500/60 transition-all hover:scale-[1.02] animate-slide-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-4">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => handleToggleTask(task.id)}
                  className="border-purple-500 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 w-6 h-6"
                />
                <span className="flex-1 text-white text-lg">{task.text}</span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-purple-400 hover:text-red-400 transition-colors p-2 hover:bg-red-500/10 rounded-lg"
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
            <h2 className="text-sm uppercase tracking-wider text-purple-400/70 mb-4 flex items-center gap-2">
              <Star className="w-4 h-4 fill-purple-400/70" />
              Conquered Quests ({completedTasksList.length})
            </h2>
            <div className="space-y-3">
              {completedTasksList.map((task, index) => (
                <Card
                  key={task.id}
                  className="bg-slate-900/50 border-green-500/20 backdrop-blur-sm p-5 animate-fade-in"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => handleToggleTask(task.id)}
                      className="border-green-500 bg-green-600 border-green-600 w-6 h-6"
                    />
                    <span className="flex-1 text-green-400/70 text-lg line-through">{task.text}</span>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-purple-400/50 hover:text-red-400 transition-colors p-2 hover:bg-red-500/10 rounded-lg"
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
