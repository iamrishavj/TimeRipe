import { createSignal } from "solid-js";
import toast from "solid-toast";

import { logIn } from "../../services/userService";
import { setUser } from "../../store/user";

import Cookies from "js-cookie";

export default function LoginForm(props: { onClose: () => void }) {
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");

  const handleLogin = async (event: Event) => {
    event.preventDefault();
    if (username() === "" || password() === "") {
      toast.error("All fields are required!");
      return;
    }

    const result = await logIn(username(), password());

    const { message, isSuccessful, token } = result;

    if (!isSuccessful) {
      toast.error(message);
      return;
    }

    setUser({
      isLoggedIn: true,
      username: username(),
      token,
    });

    Cookies.set("accessToken", token);

    toast.success(message);

    props.onClose();
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Username"
        value={username()}
        onChange={(e) => setUsername(e.currentTarget.value)}
        required
        class="border p-2 rounded mb-3 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password()}
        onChange={(e) => setPassword(e.currentTarget.value)}
        required
        class="border p-2 rounded mb-3 w-full"
      />
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
        Login
      </button>
    </form>
  );
}
