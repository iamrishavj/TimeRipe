import axios from "axios";

export function getAllSessions(token: string) {
  const response = axios
    .get(`http://localhost:3000/api/session/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error(error);
    });
  return response;
}

export function createNewSession(token: string) {
  const response = axios
    .post(
      `http://localhost:3000/api/session/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      console.error(error);
    });
  return response;
}

export function getSessionTasks(token: string, sessionId: number) {
  const response = axios
    .get(`http://localhost:3000/api/session/${sessionId}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error(error);
    });
  return response;
}
