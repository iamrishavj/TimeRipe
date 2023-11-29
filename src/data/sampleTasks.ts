interface Task {
  id: number;
  title: string;
  description: string;
  priority: "critical" | "high" | "medium" | "low";
  status: "Todo" | "Active" | "Finished";
}

export const dummyTasks: Task[] = [
  {
    id: 1,
    title: "Task 1",
    description: "This is task 1",
    priority: "high",
    status: "Todo",
  },
  {
    id: 2,
    title: "Task 2",
    description: "This is task 2",
    priority: "medium",
    status: "Active",
  },
  {
    id: 3,
    title: "Task 3",
    description: "This is task 3",
    priority: "low",
    status: "Finished",
  },
  {
    id: 4,
    title: "Task 4",
    description: "This is task 4",
    priority: "critical",
    status: "Todo",
  },
  {
    id: 5,
    title: "Task 5",
    description: "This is task 5",
    priority: "high",
    status: "Active",
  },
  // Add more dummy tasks here...I'm too lazy to do it myself
  {
    id: 6,
    title: "Task 6",
    description: "This is task 6",
    priority: "medium",
    status: "Todo",
  },
  {
    id: 7,
    title: "Task 7",
    description: "This is task 7",
    priority: "low",
    status: "Active",
  },
  {
    id: 8,
    title: "Task 8",
    description: "This is task 8",
    priority: "high",
    status: "Finished",
  },
  {
    id: 9,
    title: "Task 9",
    description: "This is task 9",
    priority: "critical",
    status: "Todo",
  },
  {
    id: 10,
    title: "Task 10",
    description: "This is task 10",
    priority: "medium",
    status: "Active",
  },
  {
    id: 11,
    title: "Task 11",
    description: "This is task 11",
    priority: "low",
    status: "Finished",
  },
  {
    id: 12,
    title: "Task 12",
    description: "This is task 12",
    priority: "high",
    status: "Todo",
  },
  {
    id: 13,
    title: "Task 13",
    description: "This is task 13",
    priority: "critical",
    status: "Active",
  },
  {
    id: 14,
    title: "Task 14",
    description: "This is task 14",
    priority: "medium",
    status: "Finished",
  },
  {
    id: 15,
    title: "Task 15",
    description: "This is task 15",
    priority: "low",
    status: "Todo",
  },
];

export default dummyTasks;
