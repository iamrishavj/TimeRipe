export type Priority = "critical" | "high" | "medium" | "low";

export type Task = {
  id: number;
  title: string;
  description: string;
  priority: Priority;
};

export type TaskPlanner = {
  Todo: Task[];
  Active: Task[];
  Finished: Task[];
};
