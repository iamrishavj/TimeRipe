import { For, Show } from "solid-js";
import TaskCard from "./TaskCard";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: "critical" | "high" | "medium" | "low";
  status: "Todo" | "Active" | "Finished";
}

interface TaskListProps {
  ListType: "Todo" | "Active" | "Finished";
  tasks: Task[];
}

export default function TaskList(props: TaskListProps) {
  const listStyle =
    props.ListType === "Active"
      ? "bg-blue-100 border-blue-500"
      : "bg-gray-100 border-gray-300";
  return (
    <div class={`flex flex-col h-full ${listStyle}`}>
      <h2 class="sticky top-0 z-10 text-lg font-bold w-full p-2 shadow-md">
        {props.ListType}
      </h2>
      <div class="flex-1 p-3 overflow-y-scroll no-scrollbar">
        <For each={props.tasks}>
          {(task) => (
            <TaskCard
              priority={task.priority}
              isCompleted={props.ListType === "Finished"}
              title={task.title}
            >
              <Show when={props.ListType === "Active"}>{task.description}</Show>
            </TaskCard>
          )}
        </For>
      </div>
    </div>
  );
}
