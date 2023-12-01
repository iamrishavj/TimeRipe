import { createSignal } from "solid-js";
import toast from "solid-toast";

import { Task, Priority } from "../../types/Task";

interface EditTaskCardProps {
  task: Task;
  handleFinishEditing: () => void;
  handleEditTask: (task: Task) => void;
}

export default function EditTaskCard(props: EditTaskCardProps) {
  const [title, setTitle] = createSignal<string>(props.task.title);
  const [description, setDescription] = createSignal<string>(
    props.task.description
  );
  const [priority, setPriority] = createSignal<Priority>(props.task.priority);

  const handleCancelTaskClick = () => {
    props.handleFinishEditing();
  };

  const handleSaveTask = () => {
    // Validate the form
    if (!title() && title() === "") {
      toast.error("Please enter a title");
      return;
    }
    const editedTask: Task = {
      id: props.task.id,
      title: title(),
      description: description(),
      priority: priority() as Task["priority"],
    };
    // Call the passed in handleAddTask function with the new task and status
    props.handleEditTask(editedTask);
    props.handleFinishEditing();
  };

  return (
    <div class="mt-4">
      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <input
            value={title()}
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </div>
        <div class="mb-4">
          <textarea
            value={description()}
            class="no-scrollbar shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
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
            onClick={handleSaveTask}
          >
            Save
          </button>
          <button
            class="flex-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleCancelTaskClick}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
