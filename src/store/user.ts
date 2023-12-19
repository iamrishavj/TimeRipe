import { createStore } from "solid-js/store";
import { loggedInUser } from "../types/user";

import Cookies from "js-cookie";

const accessToken = Cookies.get("accessToken") || null;
const initialState: loggedInUser = {
  isLoggedIn: !!accessToken,
  token: accessToken,
};

const [user, setUser] = createStore<loggedInUser>(initialState);

export { user, setUser };
