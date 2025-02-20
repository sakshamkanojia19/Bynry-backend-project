import { Provider, useSelector, useDispatch } from "react-redux";
import { store } from "./store";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import React from "react";
import ServiceRequestForm from "./components/ServiceRequestForm";
import ServiceRequestList from "./components/ServiceRequestList";
import ProfilePage from "./components/ProfilePage";
import AdminDashboard from "./components/AdminDashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import { logout } from "./store/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="mb-6 flex justify-center space-x-6">
      <Link to="/" className="text-blue-500">Home</Link>
      {user ? (
        <>
          <Link to="/profile" className="text-blue-500">Profile</Link>
          <Link to="/admin" className="text-blue-500">Admin Dashboard</Link>
          <button onClick={handleLogout} className="text-red-500">Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" className="text-blue-500">Login</Link>
          <Link to="/register" className="text-blue-500">Signup</Link>
        </>
      )}
    </nav>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100 p-6">
          <Navbar />

          <Routes>
            <Route path="/" element={
              <>
                <h1 className="text-3xl font-bold text-center mb-6">Gas Utility Service Requests</h1>
                <ServiceRequestForm />
                <ServiceRequestList />
              </>
            } />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
