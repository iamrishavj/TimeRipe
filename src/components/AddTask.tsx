import { createSignal } from "solid-js";

import { txtPriorityColor } from "../utils/priorityConfig";

export default function AddTask() {
  const [showForm, setShowForm] = createSignal(false);

  const handleAddTaskClick = () => {
    setShowForm(true);
  };

  const handleSaveTask = () => {
    // Logic to save the task
    setShowForm(false);
    // You would also need to collect and use the values from the inputs
  };

  return (
    <div class="mt-4">
      {showForm() ? (
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Title"
            />
          </div>
          <div class="mb-4">
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Description"
            />
          </div>
          <div class="mb-4">
            <select
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              name="Priority"
            >
              <option class={`${txtPriorityColor["low"]}`} value="low">
                Low
              </option>
              <option class={`${txtPriorityColor["medium"]}`} value="medium">
                Medium
              </option>
              <option class={`${txtPriorityColor["high"]}`} value="high">
                High
              </option>
              <option
                class={`${txtPriorityColor["critical"]}`}
                value="critical"
              >
                Critical
              </option>
            </select>
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSaveTask}
            >
              Add Task
            </button>
          </div>
        </div>
      ) : (
        <div class="flex items-center justify-center">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleAddTaskClick}
          >
            + Add Task
          </button>
        </div>
      )}
    </div>
  );
}
