import { Priority } from "../types/Task";

export const priorityMap: Record<Priority, number> = {
  critical: 1,
  high: 2,
  medium: 3,
  low: 4,
};

export const bgPriorityColor: Record<Priority, string> = {
  critical: "bg-red-500",
  high: "bg-orange-400",
  medium: "bg-yellow-300",
  low: "bg-green-300",
};

export const txtPriorityColor: Record<Priority, string> = {
  critical: "text-red-500",
  high: "text-orange-400",
  medium: "text-yellow-300",
  low: "text-green-300",
};
