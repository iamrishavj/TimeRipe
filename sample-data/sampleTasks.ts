import { TaskPlanner } from "../src/types/Task";

export const dummyTasks: TaskPlanner = {
  Todo: [
    {
      id: 12314143,
      title: "Task 1",
      description: "This is task 1",
      priority: "high",
    },
    {
      id: 342424,
      title: "Task 4",
      description: "This is task 4",
      priority: "critical",
    },
    // Add more Todo tasks here...
  ],
  Active: [
    {
      id: 24536363,
      title: "Task 2",
      description: "This is task 2",
      priority: "medium",
    },
    {
      id: 2542442,
      title: "Task 5",
      description: "This is task 5",
      priority: "high",
    },
    // Add more Active tasks here...
  ],
  Finished: [
    {
      id: 235245245,
      title: "Task 3",
      description: "This is task 3",
      priority: "low",
    },
    // Add more Finished tasks here...
  ],
};
