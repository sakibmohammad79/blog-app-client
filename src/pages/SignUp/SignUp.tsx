/* eslint-disable @typescript-eslint/no-explicit-any */

import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

const SIGN_UP = gql`
  mutation signUp(
    $name: String!
    $email: String!
    $password: String!
    $bio: String!
  ) {
    signUp(name: $name, email: $email, password: $password, bio: $bio) {
      token
      message
    }
  }
`;
const SignUp = () => {
  const [signUp, { data, loading, error }] = useMutation(SIGN_UP);
  const [message, setMessage] = useState("");

  const handleRegister = (e: any) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      bio: e.target.bio.value,
    };
    signUp({ variables: data });
  };
  console.log(data);
  useEffect(() => {
    if (data && data?.signUp?.tokan) {
      localStorage.setItem("token", data?.signUp?.tokan);
    }
    if (data && data?.signUp?.message) {
      setMessage(data?.signUp?.message);
    }
  }, [data]);
  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;
  return (
    <form
      onSubmit={handleRegister}
      className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md space-y-4 justify-center items-center"
    >
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          name="email"
          type="email"
          className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          name="password"
          type="password"
          className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your password"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Bio</label>
        <textarea
          name="bio"
          className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Tell us about yourself"
          rows={4}
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Register
      </button>
      {message && <p className="text-center">{message}</p>}
    </form>
  );
};

export default SignUp;
