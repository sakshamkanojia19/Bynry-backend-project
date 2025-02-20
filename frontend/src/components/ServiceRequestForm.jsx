import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import React from "react";

const ServiceRequestForm = ({ fetchRequests }) => {
  const { user, token } = useSelector((state) => state.auth); 

  const [formData, setFormData] = useState({
    request_type: "",
    details: "",
    attachment: null,
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, attachment: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to submit a request.");
      return;
    }

    const data = new FormData();
    data.append("customer", user.id); 
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    try {
      await axios.post("http://127.0.0.1:8000/api/service-requests/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, 
        },
      });

      alert("Request submitted successfully!");
      fetchRequests();
      setFormData({ request_type: "", details: "", attachment: null });
      setError(null);
    } catch (error) {
      console.error("Error submitting request:", error.response?.data || error);
      setError(error.response?.data || "Failed to submit request.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Submit Service Request</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <p><strong>Customer:</strong> {user?.username || "Guest"}</p>

        <select
          name="request_type"
          value={formData.request_type}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Request Type</option>
          <option value="Gas Leakage">Gas Leakage</option>
          <option value="New Connection">New Connection</option>
          <option value="Billing Issue">Billing Issue</option>
        </select>

        <textarea
          name="details"
          value={formData.details}
          onChange={handleChange}
          placeholder="Request Details"
          className="w-full p-2 border rounded"
          required
        />

        <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded" />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default ServiceRequestForm;
