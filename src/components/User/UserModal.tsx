import { createSignal } from "solid-js";

function UserModal(props: { onClose: () => void }) {
  const [isLogin, setIsLogin] = createSignal(true);

  // Click handler for the modal wrapper
  const closeModalOnOutsideClick = (event: any) => {
    // Check if the clicked element is the modal container itself, not its children
    if (event.target === event.currentTarget) {
      props.onClose(); // Call the function passed via props to close the modal
    }
  };

  return (
    <div
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center"
      onClick={closeModalOnOutsideClick}
    >
      <div class="bg-white p-5 rounded-lg shadow-lg w-96">
        <div class="flex justify-around mb-4">
          <h2
            class={`text-lg font-semibold cursor-pointer ${
              isLogin() ? "text-blue-600" : "text-gray-400"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </h2>
          <h2
            class={`text-lg font-semibold cursor-pointer ${
              !isLogin() ? "text-blue-600" : "text-gray-400"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </h2>
        </div>
        <div class="border-b-2 border-blue-600 mb-4"></div>
        {isLogin() ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
}

function LoginForm() {
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

function SignupForm() {
  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        required
        class="border p-2 rounded mb-3 w-full"
      />
      <input
        type="email"
        placeholder="Email"
        required
        class="border p-2 rounded mb-3 w-full"
      />
      <input
        type="password"
        required
        placeholder="Password"
        class="border p-2 rounded mb-3 w-full"
      />
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
        Signup
      </button>
    </div>
  );
}

export default UserModal;
