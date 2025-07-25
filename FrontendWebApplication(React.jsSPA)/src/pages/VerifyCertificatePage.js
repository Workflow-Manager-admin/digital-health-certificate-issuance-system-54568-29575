import React, { useState } from "react";
import { api } from "../api";

// PUBLIC_INTERFACE
function VerifyCertificatePage() {
  const [certId, setCertId] = useState("");
  const [result, setResult] = useState(null);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await api.get(`/certificates/verify/${certId}`);
      setResult(res.data);
    } catch (e) {
      setResult({ error: "Certificate not found or invalid." });
    }
  };

  return (
    <div>
      <h2>Verify Certificate</h2>
      <form onSubmit={handleVerify} style={{ maxWidth: 400 }}>
        <input
          required
          value={certId}
          onChange={(e) => setCertId(e.target.value)}
          placeholder="Enter Certificate ID"
        />
        <button type="submit">Verify</button>
      </form>
      {result && (
        <div style={{ marginTop: 20 }}>
          {result.error ? (
            <div style={{ color: "red" }}>{result.error}</div>
          ) : (
            <div>
              <h4>Certificate is valid</h4>
              <p>ID: {result.id}</p>
              <p>Type: {result.type}</p>
              <p>Issued To: {result.patientName || result.patientId}</p>
              <p>Status: {result.status}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default VerifyCertificatePage;
