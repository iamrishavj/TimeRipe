export type Priority = "critical" | "high" | "medium" | "low";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
}

export interface TaskPlanner {
  Todo: Task[];
  Active: Task[];
  Finished: Task[];
}
