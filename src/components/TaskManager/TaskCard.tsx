import { Show, createSignal } from "solid-js";

import toast from "solid-toast";

import EditTaskCard from "./EditTaskForm";
import EditButton from "./TaskButtons/EditButton";
import DeleteButton from "./TaskButtons/DeleteButton";

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
