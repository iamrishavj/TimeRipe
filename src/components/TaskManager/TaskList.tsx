import { For, Show, createSignal } from "solid-js";
import { tasks } from "../../store/tasks";

import TaskCard from "./TaskCard";
import AddTaskCard from "./AddTaskForm";
import ClearButton from "./TaskButtons/ClearButton";

import { Task, TaskPlanner } from "../../types/Task";

type TaskListProps = {
  ListType: keyof TaskPlanner;
  updateTasks: (
    taskId: number,
    currentStatus: keyof TaskPlanner,
    newStatus: keyof TaskPlanner
  ) => void;
  handleAddTask?: (task: Task, status: keyof TaskPlanner) => void;
  handleEditTask?: (task: Task, status: keyof TaskPlanner) => void;
  handleDeleteTask: (task: Task, status: keyof TaskPlanner) => void;
  handleClearTasks: () => void;
};

export default function TaskList(props: TaskListProps) {
  const [dragging, setDragging] = createSignal<string | null>(null);

  const listStyle =
    props.ListType === "Active"
      ? "bg-blue-100 border-blue-500"
      : "bg-gray-100 border-gray-300";

  const handleDragStart = (e: DragEvent, task: Task) => {
    setDragging(task.id.toString());
    e.dataTransfer?.setData("application/solidjs-task", JSON.stringify(task));
    e.dataTransfer!.effectAllowed = "move";
    e.dataTransfer!.setData("sourceListType", props.ListType);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer!.dropEffect = "move";
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer?.getData("application/solidjs-task");
    const sourceListType = e.dataTransfer?.getData("sourceListType");
    if (data && sourceListType) {
      const droppedTask: Task = JSON.parse(data);
      props.updateTasks(
        droppedTask.id,
        sourceListType as keyof TaskPlanner,
        props.ListType
      );
    }
    setDragging(null);
  };

  return (
    <div
      class={`flex flex-col h-full ${listStyle}}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div class="flex justify-between items-center w-full p-2 shadow-md pl-4 pr-4">
        <h2 class="text-lg font-bold">{props.ListType}</h2>
        <ClearButton
          onClick={() => {
            if (confirm("Are you sure you want to clear tasks?")) {
              props.handleClearTasks();
            }
          }}
        />
      </div>

      <div class="flex-1 p-3 overflow-y-scroll no-scrollbar">
        <For each={tasks[props.ListType]}>
          {(task, index) => (
            <div
              draggable
              onDragStart={(e) => handleDragStart(e as DragEvent, task)}
              classList={{
                "bg-blue-100":
                  props.ListType === "Active" &&
                  dragging() === task.id.toString(),
              }}
            >
              <TaskCard
                task={task}
                ListType={props.ListType}
                isActive={props.ListType === "Active" && index() === 0}
                handleCheckedTask={() =>
                  props.updateTasks(task.id, props.ListType, "Finished")
                }
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
