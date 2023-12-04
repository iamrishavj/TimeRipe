import { createSignal } from "solid-js";
import toast from "solid-toast";

import { signUp } from "../../services/userService";

export default function SignupForm() {
  const [username, setUsername] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [confirmPassword, setConfirmPassword] = createSignal("");

  const handleSignUp = async (event: any) => {
    event.preventDefault();
    if (
      username() === "" ||
      email() === "" ||
      password() === "" ||
      confirmPassword() === ""
    ) {
      toast.error("All fields are required!");
      return;
    }

    if (password() !== confirmPassword()) {
      toast.error("Passwords do not match!");
      setPassword("");
      setConfirmPassword("");
      return;
    }

    const result = await signUp(username(), email(), password());

    console.log(result);

    if (result?.isSuccessful) toast.success(result.message);
    else toast.error(result?.message);
  };

  return (
    <form onSubmit={handleSignUp}>
      <input
        type="text"
        placeholder="Username"
        value={username()}
        onChange={(e) => setUsername(e.target.value)}
        required
        class="border p-2 rounded mb-3 w-full"
      />
      <input
        type="email"
        placeholder="Email"
        value={email()}
        onChange={(e) => setEmail(e.target.value)}
        required
        class="border p-2 rounded mb-3 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password()}
        onChange={(e) => setPassword(e.target.value)}
        required
        class="border p-2 rounded mb-3 w-full"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword()}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        class="border p-2 rounded mb-3 w-full"
      />
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
        Signup
      </button>
    </form>
  );
}
