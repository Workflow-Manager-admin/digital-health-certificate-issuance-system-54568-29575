import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../state/AuthContext";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={{ padding: 10, marginBottom: 20, borderBottom: "1px solid #ccc" }}>
      <Link to="/">Home</Link>{" | "}
      {user ? (
        <>
          {user.role === "patient" && <Link to="/patient/dashboard">Dashboard</Link>}
          {user.role === "doctor" && <Link to="/doctor/dashboard">Dashboard</Link>}
          {user.role === "admin" && <Link to="/admin/dashboard">Dashboard</Link>}
          {" | "}
          <Link to="/verify">Verify Certificate</Link>
          {" | "}
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>{" | "}
          <Link to="/register">Register</Link>{" | "}
          <Link to="/verify">Verify Certificate</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
