import { For, Show, createSignal } from "solid-js";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";
import { Task, TaskPlanner } from "../types/Task";

interface TaskListProps {
  ListType: keyof TaskPlanner;
  tasks: Task[];
  updateTasks: (taskId: string, newStatus: keyof TaskPlanner) => void;
  handleAddTask?: (task: Task, status: keyof TaskPlanner) => void;
}

export default function TaskList(props: TaskListProps) {
  const [dragging, setDragging] = createSignal<string | null>(null);

  const listStyle =
    props.ListType === "Active"
      ? "bg-blue-100 border-blue-500"
      : "bg-gray-100 border-gray-300";

  const handleDragStart = (e: DragEvent, task: Task) => {
    setDragging(task.id);
    e.dataTransfer?.setData("application/solidjs-task", JSON.stringify(task));
    e.dataTransfer!.effectAllowed = "move";
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer!.dropEffect = "move";
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer?.getData("application/solidjs-task");
    if (data) {
      const droppedTask: Task = JSON.parse(data);
      props.updateTasks(droppedTask.id, props.ListType);
    }
    setDragging(null);
  };

  return (
    <div
      class={`flex flex-col h-full ${listStyle}}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h2 class="sticky top-0 z-10 text-lg font-bold w-full p-2 shadow-md">
        {props.ListType}
      </h2>
      <div class="flex-1 p-3 overflow-y-scroll no-scrollbar">
        <For each={props.tasks}>
          {(task, index) => (
            <div
              draggable
              onDragStart={(e) => handleDragStart(e as DragEvent, task)}
              classList={{
                "bg-blue-100":
                  props.ListType === "Active" && dragging() === task.id,
              }}
            >
              <TaskCard
                priority={task.priority}
                isCompleted={props.ListType === "Finished"}
                title={task.title}
                isActive={props.ListType === "Active" && index() === 0}
              >
                <Show when={props.ListType === "Active"}>
                  {task.description}
                </Show>
              </TaskCard>
            </div>
          )}
        </For>
        <Show when={props.ListType !== "Finished"}>
          {props.handleAddTask !== undefined && (
            <AddTask
              handleAddTask={props.handleAddTask}
              ListType={props.ListType}
            />
          )}
        </Show>
      </div>
    </div>
  );
}
