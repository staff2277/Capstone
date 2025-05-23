import React, { useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "./AuthContext";
import { API_BASE_URL } from "../src/config";

const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, register, error: authError } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.username, formData.email, formData.password);
      }

      // Clear all form fields after successful login/registration
      setFormData({
        username: "",
        email: "",
        password: "",
      });

      onAuthSuccess();
      onClose();
    } catch (err) {
      console.error("Auth error:", err);
      if (err.message.includes("Failed to fetch")) {
        setError(
          "Unable to connect to the server. Please check if the server is running."
        );
      } else {
        setError(
          err.message || "Failed to connect to server. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#202020] p-8 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {isLogin ? "Sign In" : "Sign Up"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        {(error || authError) && (
          <div className="mb-4 p-3 bg-red-500 text-white rounded">
            {error || authError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-gray-300 mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 bg-[#2c2c2c] text-white rounded"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 bg-[#2c2c2c] text-white rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 bg-[#2c2c2c] text-white rounded"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="text-gray-400 hover:text-white"
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

AuthModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAuthSuccess: PropTypes.func.isRequired,
};

export default AuthModal;
