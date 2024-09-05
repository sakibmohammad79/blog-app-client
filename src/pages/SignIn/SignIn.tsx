/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

const SIGN_IN = gql`
  mutation signIn($password: String!, $email: String!) {
    logIn(password: $password, email: $email) {
      message
      token
    }
  }
`;
const SignIn = () => {
  const [signIn, { data, loading, error }] = useMutation(SIGN_IN);
  const [message, setMessage] = useState("");
  const handleSignIn = (e: any) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(data);
    signIn({ variables: data });
  };

  useEffect(() => {
    if (data && data?.logIn?.token) {
      localStorage.setItem("token", data?.logIn?.token);
    }
    if (data && data?.logIn?.message) {
      setMessage(data?.logIn?.message);
    }
  }, [data]);

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <form
      onSubmit={handleSignIn}
      className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="name"
        >
          Password
        </label>
        <input
          type="password"
          id="name"
          name="password"
          className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your name"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Login
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default SignIn;
