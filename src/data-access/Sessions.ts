import axios from "axios";

export function getSessions() {
  const response = axios
    .get(`http://localhost:3000/api/session/`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNzAyNjMwODAxLCJleHAiOjE3MDI2NDUyMDF9.LvXQCTnLYppD6SQDg-elJzNNxd7Y7u5IwAqRQGpo2uo`, // replace `token` with your actual token
      },
    })
    .then((res) => console.log(res.data))
    .catch((error) => {
      console.error(error);
    });
  return response;
}
