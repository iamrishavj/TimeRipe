import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { setUser } from "../store/user";
import {
  createNewSession,
  getAllSessions,
  getSessionTasks,
} from "../data-access/SessionAccess";
import { setSessionList } from "../store/sessionsList";
import { setCurrentSession, setTasks } from "../store/tasks";
import { transformTasks } from "../utils/helper";

const signUp = async (username: string, email: string, password: string) => {
  try {
    const response = await axios.post("http://localhost:3000/api/user/signup", {
      username,
      email,
      password,
    });

    console.log(response);

    const data = response.data;
    // Handle success (e.g., navigate to another page or show a message)

    return {
      message: data.message || "Signup failed!",
      isSuccessful: response.status === 200,
    };
  } catch (error: AxiosError<any> | any) {
    console.log(error);
    return {
      message: error.response.data.message || "Signup failed!",
      isSuccessful: false,
    };
  }
};

const logIn = async (username: string, password: string) => {
  try {
    const response = await axios.post("http://localhost:3000/api/user/login", {
      username,
      password,
    });

    const data = response.data;
    // Handle success (e.g., navigate to another page or show a message)

    console.log(data.message);

    return {
      message: data.message || "Login failed!",
      isSuccessful: response.status === 200,
      token: data.accessToken, // Return the login token
    };
  } catch (error: AxiosError<any> | any) {
    console.log(error);
    return {
      message: error.response.data.message || "Login failed!",
      isSuccessful: false,
      token: null,
    };
  }
};

const logOut = () => {
  setUser({
    isLoggedIn: false,
    token: null,
  });
  Cookies.remove("accessToken");
};

const onLogIn = (token: string) => {
  // Fetch all sessions and set the latest one as the current session
  getAllSessions(token).then((sessions) => {
    setSessionList(sessions);
    const latestSession = sessions[0];
    if (latestSession) {
      console.log("Latest session: ", latestSession);
      setCurrentSession(latestSession.session_id);

      // Fetch and set the tasks for the latest session
      getSessionTasks(token, latestSession.session_id).then((tasks) => {
        console.log("Latest session tasks: ", tasks);
        setTasks(transformTasks(tasks));
      });
    } else {
      createNewSession(token).then((session) => {
        setSessionList([session]);
        setCurrentSession(session.session_id);
        setTasks((previousState) => {
          return {
            ...previousState,
            Active: [],
            Finished: [],
            Todo: [],
          };
        });
      });
    }
  });
};

const onLogOut = () => {
  setSessionList([]);
  setTasks(JSON.parse(localStorage.getItem("tasks") || "[]"));
};

export { signUp, logIn, logOut, onLogIn, onLogOut };
