import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { setUser } from "../store/user";

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
      message: error.message || "Signup failed!",
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
    username: undefined,
    token: null,
  });
  Cookies.remove("token");
};

export { signUp, logIn, logOut };
