import axios from "axios";
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
  } catch (error) {
    // Handle error (e.g., show error message)
    console.log(error);
  }
};

const logIn = async (username: string, password: string) => {
  try {
    const response = await axios.post("http://localhost:3000/api/user/login", {
      username,
      password,
    });

    console.log(response);

    const data = response.data;
    // Handle success (e.g., navigate to another page or show a message)

    return {
      message: data.message || "Login failed!",
      isSuccessful: response.status === 200,
      token: data.accessToken, // Return the login token
    };
  } catch (error) {
    return {
      message: "Login failed!",
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
