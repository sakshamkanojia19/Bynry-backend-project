import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import React from "react";

const ProfilePage = () => {
  const [requests, setRequests] = useState([]);
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      axios.get("http://127.0.0.1:8000/api/service-requests/", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching service requests:", error);
      });
    }
  }, [token]);

  if (!user) return <p className="text-center">Please login to view your profile.</p>;

  return (
    <div className="max-w-2xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <h3 className="text-lg font-bold mt-6">Your Service Requests</h3>
      <div className="space-y-4">
        {requests.length === 0 ? (
          <p>No service requests found.</p>
        ) : (
          requests.map((request) => (
            <div key={request.id} className="p-4 border rounded bg-gray-100 shadow">
              <p><strong>Type:</strong> {request.request_type}</p>
              <p><strong>Status:</strong> {request.status}</p>
              <p><strong>Created At:</strong> {new Date(request.created_at).toLocaleString()}</p>
              {request.resolved_at && (
                <p><strong>Resolved At:</strong> {new Date(request.resolved_at).toLocaleString()}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
