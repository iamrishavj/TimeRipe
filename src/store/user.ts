import { createStore } from "solid-js/store";
import { loggedInUser } from "../types/user";

const [user, setUser] = createStore<loggedInUser>({
  isLoggedIn: false,
  username: undefined,
  token: null,
});

export { user, setUser };
