'use client';

import { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

export default function MinimalMode() {
  const { tasks, addTask, toggleTask, deleteTask, streak, getXpProgress, isImmersiveModeUnlocked } = useGame();
  const [newTaskText, setNewTaskText] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      addTask({ text: newTaskText.trim() });
      setNewTaskText('');
    }
  };

  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasksList = tasks.filter(t => t.completed);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-light text-gray-800 mb-2">Tasks</h1>
          <p className="text-sm text-gray-500">Keep it simple, stay focused</p>
        </div>

        {/* Subtle progress indicator */}
        {isImmersiveModeUnlocked && (
          <div className="mb-6">
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-400 transition-all duration-500"
                style={{ width: `${getXpProgress()}%` }}
              />
            </div>
          </div>
        )}

        {/* Add task form */}
        <form onSubmit={handleAddTask} className="mb-8">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Add a task..."
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              className="flex-1 bg-white border-gray-200 focus:border-gray-300 text-gray-800"
            />
            <Button
              type="submit"
              size="icon"
              className="bg-gray-800 hover:bg-gray-700 text-white"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </form>

        {/* Active tasks */}
        <div className="space-y-2 mb-6">
          {activeTasks.length === 0 && completedTasksList.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p className="text-sm">No tasks yet. Start by adding one above.</p>
            </div>
          )}
          
          {activeTasks.map((task) => (
            <Card
              key={task.id}
              className="p-4 bg-white border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                  className="border-gray-300"
                />
                <span className="flex-1 text-gray-800 text-sm">{task.text}</span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Completed tasks */}
        {completedTasksList.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xs uppercase tracking-wide text-gray-400 mb-3">Completed</h2>
            <div className="space-y-2">
              {completedTasksList.map((task) => (
                <Card
                  key={task.id}
                  className="p-4 bg-gray-100 border-gray-200"
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                      className="border-gray-300"
                    />
                    <span className="flex-1 text-gray-500 text-sm line-through">{task.text}</span>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Subtle hint about progress */}
        {!isImmersiveModeUnlocked && tasks.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">Keep going... {Math.floor(getXpProgress())}%</p>
          </div>
        )}
      </div>
    </div>
  );
}
