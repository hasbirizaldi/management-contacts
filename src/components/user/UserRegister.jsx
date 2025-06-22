import { useState } from "react";
import { alertError, alertSuccess } from "../../lib/alert";
import { userRegister } from "../../lib/api/UserApi";
import { Link, useNavigate } from "react-router";

export default function UserRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (username.length < 6) {
      await alertError("Username must be at least 6 characters");
      return;
    }
    if (password.length < 6) {
      await alertError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      await alertError("Password do not match!");
      return;
    }

    try {
      const response = await userRegister({
        username,
        password,
        name,
      });

      const responseBody = await response.json();
      console.log(response.status);

      if (response.status === 201) {
        await alertSuccess("User created successfully");
        navigate("/login");
      } else if (response.status === 400 && responseBody.errors) {
        // Gabungkan semua pesan error dari setiap field
        const allErrors = Object.entries(responseBody.errors)
          .flatMap(([field, messages]) => messages.map((msg) => `${field}: ${msg}`))
          .join("\n");
        await alertError(allErrors);
      } else {
        await alertError("Registration failed");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      await alertError("An unexpected error occurred");
    }
  }

  return (
    <div className="animate-fade-in bg-gray-800 bg-opacity-80 p-8 rounded-xl shadow-custom border border-gray-700 backdrop-blur-sm w-full max-w-md">
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-gradient rounded-full mb-4">
          <i className="fas fa-user-plus text-3xl text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white">Contact Management</h1>
        <p className="text-gray-300 mt-2">Create a new account</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-300 text-sm font-medium mb-2">
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-user text-gray-500" />
            </div>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
              name="username"
              className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Choose a username"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-id-card text-gray-500" />
            </div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              name="name"
              className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Enter your full name"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-lock text-gray-500" />
            </div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Create a password"
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="confirm_password" className="block text-gray-300 text-sm font-medium mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-check-double text-gray-500" />
            </div>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              id="confirm_password"
              name="confirm_password"
              className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Confirm your password"
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <button
            type="submit"
            className="cursor-pointer w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5"
          >
            <i className="fas fa-user-plus mr-2" /> Register
          </button>
        </div>
        <div className="text-center text-sm text-gray-400 ">
          Already have an account?
          <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 ml-2">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
