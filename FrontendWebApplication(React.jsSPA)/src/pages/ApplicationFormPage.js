import React, { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

// PUBLIC_INTERFACE
function ApplicationFormPage() {
  const [type, setType] = useState("vaccination");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData();
    formData.append("type", type);
    formData.append("description", description);
    if (file) formData.append("file", file);
    try {
      await api.post("/applications/new", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSubmitting(false);
      navigate("/patient/dashboard");
    } catch {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Submit Health Certificate Application</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
        <div>
          <label>Certificate Type:</label>
          <select value={type} onChange={e => setType(e.target.value)}>
            <option value="vaccination">Vaccination Proof</option>
            <option value="fitness">Medical Fitness</option>
            <option value="sick-leave">Sick Leave</option>
          </select>
        </div>
        <div>
          <label>Description / Notes:</label>
          <input value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Supporting Document (PDF/JPG/PNG):</label>
          <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => setFile(e.target.files[0])} />
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default ApplicationFormPage;
