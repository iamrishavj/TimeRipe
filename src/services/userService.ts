const signUp = async (username: string, email: string, password: string) => {
  try {
    const response = await fetch("http://localhost:4321/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    console.log(response);

    const data = await response.json();
    // Handle success (e.g., navigate to another page or show a message)

    return {
      message: data.message || "Signup failed!",
      isSuccessful: response.ok as boolean,
    };
  } catch (error) {
    // Handle error (e.g., show error message)
    console.log(error);
  }
};

export { signUp };
