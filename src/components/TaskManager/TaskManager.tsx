import {
  currentSessionId,
  setCurrentSession,
  tasks,
  setTasks,
} from "../../store/tasks";

import TaskList from "./TaskList";

import { Task, TaskPlanner } from "../../types/Task";
import { priorityMap } from "../../config/taskPriorityConfig";

import { dummyTasks } from "../../../sample-data/sampleTasks";
import { user } from "../../store/user";
import {
  addTaskInSession,
  deleteTaskInSession,
  editTaskInSession,
} from "../../data-access/TaskAccess";
import toast from "solid-toast";
import { logOut } from "../../services/userService";
import { createNewSession } from "../../data-access/SessionAccess";
import { transformTask } from "../../utils/helper";

export default function TaskManager() {
  setTasks(dummyTasks);

  //Order the stored tasks in the Active queue for the first time
  CustomOrderingForActiveQueue();
  return (
    <>
      <div class="md:w-1/4 overflow-auto hidden md:block rounded-tr-xl">
        <TaskList
          ListType="Todo"
          updateTasks={updateTasks}
          handleAddTask={handleAddTask}
          handleEditTask={handleEditTask}
          handleDeleteTask={handleDeleteTask}
          handleClearTasks={() => handleClearTasks("Todo")}
        />
      </div>
      <div class="w-full md:w-1/2 overflow-auto rounded-t-xl">
        <TaskList
          ListType="Active"
          updateTasks={updateTasks}
          handleAddTask={handleAddTask}
          handleEditTask={handleEditTask}
          handleDeleteTask={handleDeleteTask}
          handleClearTasks={() => handleClearTasks("Active")}
        />
      </div>
      <div class="md:w-1/4 overflow-auto hidden md:block rounded-tl-xl">
        <TaskList
          ListType="Finished"
          updateTasks={updateTasks}
          handleDeleteTask={handleDeleteTask}
          handleClearTasks={() => handleClearTasks("Finished")}
        />
      </div>
    </>
  );
}
function CustomOrderingForActiveQueue() {
  setTasks((prevTasks) => {
    return {
      ...prevTasks,
      Active: [...prevTasks.Active].sort(
        (a, b) => priorityMap[a.priority] - priorityMap[b.priority]
      ),
    };
  });
}

const handleAddTask = async (task: Task, status: keyof TaskPlanner) => {
  if (user.isLoggedIn) {
    if (user.token === null) {
      toast.error("Token Expired!");
      logOut();
      return;
    }

    if (currentSessionId() === null) {
      const newSession = await createNewSession(user.token);
      setCurrentSession(newSession.session_id);
    }

    const sessionId = currentSessionId();
    if (sessionId !== undefined) {
      // Optimistic update: Add the task to the local state first
      setTasks((prevTasks) => ({
        ...prevTasks,
        [status]: [...prevTasks[status], task],
      }));

      // Send the task to the server
      try {
        const newTask = await addTaskInSession(
          user.token,
          sessionId,
          task,
          status
        );

        // Update the internal_id of the task with the id returned by the server
        const updatedTask = transformTask(newTask);

        // Update the local state with the updated task
        setTasks((prevTasks) => ({
          ...prevTasks,
          [status]: prevTasks[status].map((t) =>
            t.id === task.id ? updatedTask : t
          ),
        }));

        console.log("Task added successfully", updatedTask.internal_id);
      } catch (error) {
        // Revert the local state if there's an error
        setTasks((prevTasks) => ({
          ...prevTasks,
          [status]: prevTasks[status].filter((t) => t.id !== task.id),
        }));
        toast.error("Failed to add task. Please try again.");
      }
    }
  } else {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [status]: [...prevTasks[status], task],
    }));
  }

  if (status === "Active") CustomOrderingForActiveQueue();

  // Todo: Store the added tasks
};

const handleEditTask = async (task: Task, status: keyof TaskPlanner) => {
  if (user.isLoggedIn) {
    if (user.token === null) {
      toast.error("Token Expired!");
      logOut();
      return;
    }
    const sessionId = currentSessionId();

    if (sessionId === undefined) {
      toast.error("Session not selected!");
      return;
    }
    const beforeUpdate = tasks[status].find((t) => t.id === task.id);

    // Optimistic update: Update the local state first
    setTasks((prevTasks) => ({
      ...prevTasks,
      [status]: prevTasks[status].map((t) => (t.id === task.id ? task : t)),
    }));

    // Send the task to the server
    try {
      if (task.internal_id === undefined) {
        throw new Error("Internal id not found!");
      }
      await editTaskInSession(
        user.token,
        sessionId,
        task.internal_id,
        task,
        status
      );
    } catch (error) {
      console.log(error);
      // Revert the local state if there's an error
      setTasks((prevTasks) => ({
        ...prevTasks,
        [status]: prevTasks[status].map((t) =>
          t.id === task.id ? beforeUpdate : t
        ),
      }));
      toast.error("Failed to edit task. Please try again.");
    }
  } else
    setTasks((prevTasks) => ({
      ...prevTasks,
      [status]: prevTasks[status].map((t) => (t.id === task.id ? task : t)),
    }));

  if (status === "Active") CustomOrderingForActiveQueue();
};

const handleDeleteTask = async (task: Task, status: keyof TaskPlanner) => {
  if (user.isLoggedIn) {
    if (user.token === null) {
      toast.error("Token Expired!");
      logOut();
      return;
    }
    const sessionId = currentSessionId();

    if (sessionId === undefined) {
      toast.error("Session not selected!");
      return;
    }

    // Optimistic update: Delete the task from the local state first
    setTasks((prevTasks) => ({
      ...prevTasks,
      [status]: prevTasks[status].filter((t) => t.id !== task.id),
    }));

    // Send the task to the server
    try {
      if (task.internal_id === undefined) {
        throw new Error("Internal id not found!");
      }
      await deleteTaskInSession(user.token, sessionId, task.internal_id);
    } catch (error) {
      // Revert the local state if there's an error
      setTasks((prevTasks) => ({
        ...prevTasks,
        [status]: [...prevTasks[status], task],
      }));
      toast.error("Failed to delete task. Please try again.");
    }
  } else
    setTasks((prevTasks) => ({
      ...prevTasks,
      [status]: prevTasks[status].filter((t) => t.id !== task.id),
    }));
};

const updateTasks = async (
  taskId: number,
  currentStatus: keyof TaskPlanner,
  newStatus: keyof TaskPlanner
) => {
  if (currentStatus === newStatus) return;

  if (user.isLoggedIn) {
    if (user.token === null) {
      toast.error("Token Expired!");
      logOut();
      return;
    }
    const sessionId = currentSessionId();

    if (sessionId === undefined) {
      toast.error("Session not selected!");
      return;
    }
    const taskToUpdate = tasks[currentStatus].find((t) => t.id === taskId);

    // Optimistic update: Update the task from the local state first
    setTasks((prevTasks) => {
      if (taskToUpdate) {
        return {
          ...prevTasks,
          [currentStatus]: prevTasks[currentStatus].filter(
            (t) => t.id !== taskId
          ),
          [newStatus]: [...prevTasks[newStatus], { ...taskToUpdate }],
        };
      }
      return prevTasks;
    });

    try {
      if (taskToUpdate?.internal_id === undefined) {
        throw new Error("Internal id not found!");
      }
      // Send the task to the server
      await editTaskInSession(
        user.token,
        sessionId,
        taskToUpdate.internal_id,
        taskToUpdate,
        newStatus
      );
    } catch (error) {
      console.log(error);
      // Revert the local state if there's an error
      setTasks((prevTasks) => {
        if (taskToUpdate) {
          return {
            ...prevTasks,
            [currentStatus]: [...prevTasks[currentStatus], { ...taskToUpdate }],
            [newStatus]: prevTasks[newStatus].filter((t) => t.id !== taskId),
          };
        }
        return prevTasks;
      });
      toast.error("Failed to update task. Please try again.");
    }
  } else
    setTasks((prevTasks) => {
      const taskToUpdate = prevTasks[currentStatus].find(
        (t) => t.id === taskId
      );
      if (taskToUpdate) {
        return {
          ...prevTasks,
          [currentStatus]: prevTasks[currentStatus].filter(
            (t) => t.id !== taskId
          ),
          [newStatus]: [...prevTasks[newStatus], { ...taskToUpdate }],
        };
      }
      return prevTasks;
    });

  if (newStatus === "Active") CustomOrderingForActiveQueue();
};

function handleClearTasks(ListType: keyof TaskPlanner) {
  setTasks((prevTasks) => ({
    ...prevTasks,
    [ListType]: [],
  }));
}
