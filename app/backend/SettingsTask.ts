interface TaskStatus {
  hasChangedAccent: boolean;
  hasChangedBackground: boolean;
  hasChangedTheme: boolean;
}

export function checkSettingsTask(taskType: keyof TaskStatus): boolean {
  const userId = localStorage.getItem('userId');
  if (!userId) return false;

  const taskKey = `settings_tasks_${userId}`;
  const savedTasks = localStorage.getItem(taskKey);
  const tasks: TaskStatus = savedTasks ? JSON.parse(savedTasks) : {
    hasChangedAccent: false,
    hasChangedBackground: false,
    hasChangedTheme: false
  };

  // If task was already completed, return false
  if (tasks[taskType]) return false;

  // Mark task as completed
  tasks[taskType] = true;
  localStorage.setItem(taskKey, JSON.stringify(tasks));
  return true;
}

export function getCompletedTasks(): TaskStatus {
  const userId = localStorage.getItem('userId');
  if (!userId) return {
    hasChangedAccent: false,
    hasChangedBackground: false,
    hasChangedTheme: false
  };

  const taskKey = `settings_tasks_${userId}`;
  const savedTasks = localStorage.getItem(taskKey);
  return savedTasks ? JSON.parse(savedTasks) : {
    hasChangedAccent: false,
    hasChangedBackground: false,
    hasChangedTheme: false
  };
}
