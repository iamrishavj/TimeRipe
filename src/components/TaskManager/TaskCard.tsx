import { Show, createSignal } from "solid-js";

import toast from "solid-toast";

import EditTaskCard from "./EditTaskForm";

import { Task, TaskPlanner } from "../../types/Task";

import { bgPriorityColor } from "../../config/taskPriorityConfig";
import { truncateDescription } from "../../utils/helper";

const MAX_LENGTH_DESCRIPTION = 250;

type TaskCardProps = {
  task: Task;
  ListType: keyof TaskPlanner;
  isActive?: boolean;
  handleCheckedTask: () => void;
  handleEditTask?: (task: Task, status: keyof TaskPlanner) => void;
  handleDeleteTask: (task: Task, status: keyof TaskPlanner) => void;
};

export default function TaskCard(props: TaskCardProps) {
  const [isEdit, setIsEdit] = createSignal(false);

  const isCompleted = props.ListType === "Finished";

  return (
    <>
      <Show when={isEdit()}>
        <EditTaskCard
          task={props.task}
          handleEditTask={(task) => {
            if (props.handleEditTask) {
              props.handleEditTask(task, props.ListType);
              setIsEdit(false); // Exit edit mode after task update
            }
          }}
          handleFinishEditing={() => setIsEdit(false)}
        />
      </Show>
      <Show when={!isEdit()}>
        <div
          draggable="true"
          class={`hover:opacity-75 relative bg-white shadow-md rounded-lg p-4 mb-2 ${
            props.isActive ? "border-l-4 border-blue-600" : ""
          } ${isCompleted ? "scratch" : ""} cursor-move`}
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <Show when={!isCompleted}>
                <input
                  type="checkbox"
                  onClick={() => {
                    props.handleCheckedTask();
                    toast.success("Task completed!!", {
                      icon: "🎉",
                      style: {
                        "background-color": "#10B981",
                        "text-decoration-color": "#fff",
                      },
                    });
                  }}
                  class="form-checkbox h-5 w-5 text-blue-600 mr-2 outline-none focus:scale-105 transition-all duration-200 focus:shadow-md hover:scale-110"
                />
              </Show>
              <span class="font-semibold">{props.task.title}</span>
            </div>
            <div class="flex items-center">
              <Show when={!isCompleted}>
                <span
                  class={`text-xs font-semibold text-white px-2 py-1 rounded-full ${
                    bgPriorityColor[props.task.priority]
                  }`}
                >
                  {props.task.priority.toUpperCase()}
                </span>
                <EditButton onClick={() => setIsEdit(true)} />
              </Show>
              <DeleteButton
                onClick={() => {
                  props.handleDeleteTask(props.task, props.ListType);
                  toast.success("Task deleted");
                }}
              />
            </div>
          </div>
          <div class="mt-2">
            <Show when={props.ListType === "Active"}>
              <div class="mt-2 text-gray-600 text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">
                {truncateDescription(
                  props.task.description,
                  MAX_LENGTH_DESCRIPTION
                )}
              </div>
            </Show>
          </div>
        </div>
      </Show>
    </>
  );
}

function EditButton(props: { onClick: () => void }) {
  return (
    <button
      class="ml-1 outline-none focus:scale-105 transition-all duration-200 hover:scale-105"
      onClick={props.onClick}
      aria-label="Edit task"
    >
      <svg
        class="feather feather-edit hover:opacity-60"
        fill="none"
        height="20"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    </button>
  );
}

function DeleteButton(props: { onClick: () => void }) {
  return (
    <button
      class="ml-1 hidden md:block outline-none focus:scale-105 hover:scale-105 transition-all duration-200"
      onClick={props.onClick}
      aria-label="Delete task"
    >
      <svg
        class="feather feather-trash-2 hover:opacity-60"
        height="24"
        viewBox="0 0 48 48"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 38c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4V14H12v24zM38 8h-7l-2-2H19l-2 2h-7v4h28V8z" />
        <path d="M0 0h48v48H0z" fill="none" />
      </svg>
    </button>
  );
}
