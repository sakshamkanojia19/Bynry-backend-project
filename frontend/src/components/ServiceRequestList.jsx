import { useEffect } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceRequests } from "../store/serviceRequestSlice";

const ServiceRequestList = () => {
  const dispatch = useDispatch();
  const { list, status } = useSelector((state) => state.serviceRequests);

  useEffect(() => {
    dispatch(fetchServiceRequests());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error loading requests.</p>;

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Service Requests</h2>
      <div className="space-y-4">
        {list.map((request) => (
          <div key={request.id} className="p-4 border rounded bg-white shadow">
            <h3 className="font-bold">{request.customer_name}</h3>
            <p><strong>Type:</strong> {request.request_type}</p>
            <p><strong>Status:</strong> {request.status}</p>
            <p><strong>Details:</strong> {request.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceRequestList;
