import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceRequests } from "../store/serviceRequestSlice";
import axios from "axios";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { list, status } = useSelector((state) => state.serviceRequests);

  useEffect(() => {
    dispatch(fetchServiceRequests());
  }, [dispatch]);

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/service-requests/${id}/update_status/`, 
        { status: newStatus },
        { headers: { "Content-Type": "application/json" } }
      );
      alert(`Request status updated to ${newStatus}`);
      dispatch(fetchServiceRequests()); 
    } catch (error) {
      console.error("Error updating request status:", error);
      alert("Failed to update status");
    }
  };

  if (status === "loading") return <p className="text-center">Loading...</p>;
  if (status === "failed") return <p className="text-center text-red-500">Failed to load requests.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
      {list.length === 0 ? (
        <p className="text-center">No service requests found.</p>
      ) : (
        list.map((req) => (
          <div key={req.id} className="p-4 border rounded-lg bg-gray-100 shadow mb-4">
            <h3 className="font-bold">{req.request_type}</h3>
            <p><strong>Status:</strong> {req.status}</p>
            <p><strong>Customer:</strong> {req.customer_name}</p>
            <p><strong>Created At:</strong> {new Date(req.created_at).toLocaleString()}</p>
            {req.resolved_at && <p><strong>Resolved At:</strong> {new Date(req.resolved_at).toLocaleString()}</p>}
            <div className="mt-3">
              <button 
                onClick={() => updateStatus(req.id, "In Progress")} 
                className="bg-yellow-500 text-white px-4 py-2 mr-2 rounded">
                Mark In Progress
              </button>
              <button 
                onClick={() => updateStatus(req.id, "Resolved")} 
                className="bg-green-500 text-white px-4 py-2 rounded">
                Mark Resolved
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminDashboard;
