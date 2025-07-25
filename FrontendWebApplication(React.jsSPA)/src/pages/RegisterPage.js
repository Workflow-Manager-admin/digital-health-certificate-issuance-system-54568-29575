import React, { useState, useContext } from "react";
import { AuthContext } from "../state/AuthContext";
import { useNavigate } from "react-router-dom";

// PUBLIC_INTERFACE
function RegisterPage() {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await register(name, email, password);
    if (ok) navigate("/login");
  };

  return (
    <div>
      <h2>Patient Registration</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div>
          <label>Name:</label>
          <input required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
        </div>
        <div>
          <label>Password:</label>
          <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
export default RegisterPage;
