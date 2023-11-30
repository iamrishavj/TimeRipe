import { createSignal } from "solid-js";
import toast from "solid-toast";

import { Task, TaskPlanner, Priority } from "../types/Task";

const DEFAULT_TASK_PRIORITY: Priority = "low";

interface AddTaskCardProps {
  handleAddTask: (task: Task, status: keyof TaskPlanner) => void;
  ListType: keyof TaskPlanner;
}

export default function AddTaskCard(props: AddTaskCardProps) {
  const [showForm, setShowForm] = createSignal(false);
  const [title, setTitle] = createSignal("");
  const [description, setDescription] = createSignal("");
  const [priority, setPriority] = createSignal(DEFAULT_TASK_PRIORITY);

  const handleAddTaskClick = () => {
    setShowForm(true);
  };

  const handleCancelTaskClick = () => {
    setShowForm(false);
  };

  const handleAddTask = () => {
    // Validate the form
    if (!title() && title() === "") {
      toast.error("Please enter a title");
      return;
    }
    const newTask: Task = {
      id: Date.now().toString(), // or another approach to generate unique IDs
      title: title(),
      description: description(),
      priority: priority() as Task["priority"],
    };

    // Call the passed in handleAddTask function with the new task and status
    props.handleAddTask(newTask, props.ListType);

    // Reset the form
    setTitle("");
    setDescription("");
    setPriority(DEFAULT_TASK_PRIORITY);
    setShowForm(false);
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
              onChange={(e) => setTitle(e.currentTarget.value)}
            />
          </div>
          <div class="mb-4">
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Description"
              onChange={(e) => setDescription(e.currentTarget.value)}
            />
          </div>
          <div class="mb-4">
            <select
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              name="Priority"
              value={priority()}
              onChange={(e) => setPriority(e.currentTarget.value as Priority)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          <div class="flex items-center justify-between gap-1">
            <button
              class="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleAddTask}
            >
              Add Task
            </button>
            <button
              class="flex-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleCancelTaskClick}
            >
              Cancel
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
