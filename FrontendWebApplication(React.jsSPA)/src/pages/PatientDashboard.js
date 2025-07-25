import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

// PUBLIC_INTERFACE
function PatientDashboard() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/applications/mine").then(res => {
      setApps(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h2>My Applications</h2>
      <Link to="/applications/new">Submit New Application</Link>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1" cellPadding="6">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Status</th>
              <th>Certificate</th>
            </tr>
          </thead>
          <tbody>
            {apps.map(app => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.type}</td>
                <td>{app.status}</td>
                <td>
                  {app.status === "approved" && app.certificateId ? (
                    <Link to={`/certificates/${app.certificateId}`}>Download</Link>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default PatientDashboard;
