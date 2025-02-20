import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/authSlice";
import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(credentials.username, credentials.password));
    navigate("/profile"); 
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="username" placeholder="Username" value={credentials.username} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} className="w-full p-2 border rounded" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
