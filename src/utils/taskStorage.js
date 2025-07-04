const TASKS_KEY = "tasks";

export function loadTasks() {
  try {
    const tasksJson = localStorage.getItem(TASKS_KEY);
    if (!tasksJson) return [];
    return JSON.parse(tasksJson);
  } catch (error) {
    console.error("Failed to load tasks from localStorage", error);
    return [];
  }
}

export function saveTasks(tasks) {
  try {
    const tasksJson = JSON.stringify(tasks);
    localStorage.setItem(TASKS_KEY, tasksJson);
  } catch (error) {
    console.error("Failed to save tasks to localStorage", error);
  }
}
