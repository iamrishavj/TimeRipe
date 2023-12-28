import { Task, TaskPlanner } from "../types/Task";

const MAX_DEFAULT_LENGTH_DESCRIPTION = 100;

export const truncateDescription = (
  description: string,
  maxLength: number = MAX_DEFAULT_LENGTH_DESCRIPTION
) => {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + "...";
  }
  return description;
};

export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

export function transformTasks(tasks: any[]): TaskPlanner {
  const transformedTasks: TaskPlanner = {
    Todo: [],
    Active: [],
    Finished: [],
  };

  tasks.forEach((task) => {
    const transformedTask: Task = {
      internal_id: task.task_id,
      id: task.order_index,
      title: task.title,
      description: task.description || "",
      priority: task.priority,
    };

    if (task.status === "Todo") {
      transformedTasks.Todo.push(transformedTask);
    } else if (task.status === "Active") {
      transformedTasks.Active.push(transformedTask);
    } else if (task.status === "Finished") {
      transformedTasks.Finished.push(transformedTask);
    }
  });

  return transformedTasks;
}

export function transformTask(task: any): Task {
  const transformedTask: Task = {
    internal_id: task.task_id,
    id: task.order_index,
    title: task.title,
    description: task.description || "",
    priority: task.priority,
  };

  return transformedTask;
}
