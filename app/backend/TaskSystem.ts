interface TaskResult {
  success: boolean;
  message: string;
  isFirstTime: boolean;
}

export async function completeTask(userId: string | null, taskType: string): Promise<TaskResult> {
  if (!userId) {
    return {
      success: false,
      message: 'No user logged in',
      isFirstTime: false
    };
  }

  try {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, taskType })
    });

    const data = await response.json();
    return {
      success: true,
      message: data.message,
      isFirstTime: data.isFirstTime
    };
  } catch (error) {
    console.error('Error completing task:', error);
    return {
      success: false,
      message: 'Error completing task',
      isFirstTime: false
    };
  }
} 