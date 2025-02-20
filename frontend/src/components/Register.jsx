import { useState } from "react";
import { registerUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import React from "react";

const Register = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(credentials.username, credentials.password);
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="username" placeholder="Username" value={credentials.username} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} className="w-full p-2 border rounded" required />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;
