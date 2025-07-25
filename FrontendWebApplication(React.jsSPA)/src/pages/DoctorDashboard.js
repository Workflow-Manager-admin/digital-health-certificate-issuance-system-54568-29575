import React, { useEffect, useState } from "react";
import { api } from "../api";

// PUBLIC_INTERFACE
function DoctorDashboard() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApps = () => {
    api.get("/applications/pending").then(res => {
      setApps(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const updateStatus = (id, status) => {
    api.post(`/applications/${id}/${status}`).then(() => fetchApps());
  };

  return (
    <div>
      <h2>Pending Applications Review</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1" cellPadding="6">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Type</th>
              <th>Submitted</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {apps.map(app => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.patientName}</td>
                <td>{app.type}</td>
                <td>{new Date(app.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => updateStatus(app.id, "approve")}>Approve</button>
                  <button onClick={() => updateStatus(app.id, "reject")}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DoctorDashboard;
