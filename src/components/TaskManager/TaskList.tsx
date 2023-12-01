import { For, Show, createSignal } from "solid-js";
import TaskCard from "./TaskCard";
import AddTaskCard from "./AddTaskCard";
import { Task, TaskPlanner } from "../../types/Task";

type TaskListProps = {
  ListType: keyof TaskPlanner;
  tasks: Task[];
  updateTasks: (taskId: string, newStatus: keyof TaskPlanner) => void;
  handleAddTask?: (task: Task, status: keyof TaskPlanner) => void;
  handleEditTask?: (task: Task, status: keyof TaskPlanner) => void;
  handleDeleteTask: (task: Task, status: keyof TaskPlanner) => void;
};

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
                task={task}
                ListType={props.ListType}
                isActive={props.ListType === "Active" && index() === 0}
                handleCheckedTask={() => props.updateTasks(task.id, "Finished")}
                handleEditTask={props.handleEditTask}
                handleDeleteTask={props.handleDeleteTask}
              />
            </div>
          )}
        </For>
        <Show when={props.ListType !== "Finished"}>
          <AddTaskCard
            handleAddTask={(task) => {
              if (props.handleAddTask === undefined) return;
              props.handleAddTask(task, props.ListType);
            }}
          />
        </Show>
      </div>
    </div>
  );
}
