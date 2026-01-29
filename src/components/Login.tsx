import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../config";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      // בדיקה באמצעות backend
      const response = await fetch(`${SERVER_URL}/api/check-admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || data.role !== "admin") {
        setError("Only admins can access this system");
        return;
      }

      // אם הוא admin - שמור ולעבור ל-users
      localStorage.setItem("loggedInUser", email);
      navigate("/users");
    } catch (error) {
      setError("Error during login");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 p-6">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Login
        </h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-2 px-8 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-600 text-white font-bold py-2 px-8 rounded-lg hover:bg-gray-700 transition"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
