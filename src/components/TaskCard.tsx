import { Show } from "solid-js";

import { bgPriorityColor } from "../utils/priorityConfig";

import { Priority } from "../types/Task";

type TaskCardProps = {
  title: string;
  isCompleted?: boolean;
  isActive?: boolean;
  priority: Priority;
  children?: any;
  handleCheckedTask: () => void;
};

export default function TaskCard(props: TaskCardProps) {
  return (
    <div
      draggable="true"
      class={`bg-white shadow-md rounded-lg p-4 mb-2 ${
        props.isActive ? "border-l-4 border-blue-600" : ""
      } cursor-move
      ${props.isCompleted ? "scratch" : ""}
      `}
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <Show when={props.isCompleted === false}>
            <input
              type="checkbox"
              onClick={() => props.handleCheckedTask()}
              class="form-checkbox h-5 w-5 text-blue-600 mr-2"
            />
          </Show>
          <span class="font-semibold">{props.title}</span>
        </div>
        <Show when={props.isCompleted === false}>
          <span
            class={`text-xs font-semibold text-white px-2 py-1 rounded-full ${
              bgPriorityColor[props.priority]
            }`}
          >
            {props.priority.toUpperCase()}
          </span>
        </Show>
      </div>
      <div class="mt-2">{props.children}</div>
    </div>
  );
}
