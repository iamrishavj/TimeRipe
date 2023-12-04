export default function LoginForm() {
  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        required
        class="border p-2 rounded mb-3 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        required
        class="border p-2 rounded mb-3 w-full"
      />
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
        Login
      </button>
    </div>
  );
}
