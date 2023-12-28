import axios from "axios";
import { Task, TaskPlanner } from "../types/Task";

export const addTaskInSession = async (
  token: string,
  sessionId: number,
  task: Task,
  status: keyof TaskPlanner
) => {
  console.log("addTaskInSession", {
    title: task.title,
    description: task.description,
    status: status,
    order_index: task.id,
    priority: task.priority as string,
  });
  try {
    const response = await axios.post(
      `http://localhost:3000/api/session/${sessionId}/tasks`,
      {
        title: task.title,
        description: task.description,
        status: status,
        order_index: task.id,
        priority: task.priority as string,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editTaskInSession = async (
  token: string,
  sessionId: number,
  taskId: number,
  updatedTask: Task,
  status: keyof TaskPlanner
) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/session/${sessionId}/tasks/${taskId}`,
      {
        title: updatedTask.title,
        description: updatedTask.description,
        status: status,
        order_index: updatedTask.id,
        priority: updatedTask.priority as string,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteTaskInSession = async (
  token: string,
  sessionId: number,
  taskId: number
) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/session/${sessionId}/tasks/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteAllStatusTasksInSession = async (
  token: string,
  sessionId: number,
  status: keyof TaskPlanner
) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/session/${sessionId}/tasks`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          status: status,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
