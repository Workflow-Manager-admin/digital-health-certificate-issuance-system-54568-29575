import React, { useEffect, useState } from "react";
import { api } from "../api";

// PUBLIC_INTERFACE
function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [apps, setApps] = useState([]);

  useEffect(() => {
    api.get("/users").then(res => setUsers(res.data));
    api.get("/applications").then(res => setApps(res.data));
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Users</h3>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>All Applications</h3>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Status</th>
            <th>Patient</th>
          </tr>
        </thead>
        <tbody>
          {apps.map(app => (
            <tr key={app.id}>
              <td>{app.id}</td>
              <td>{app.type}</td>
              <td>{app.status}</td>
              <td>{app.patientName || app.patientId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default AdminDashboard;
