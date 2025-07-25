import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";

// PUBLIC_INTERFACE
function CertificatePage() {
  const { id } = useParams();
  const [cert, setCert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/certificates/${id}`).then(res => {
      setCert(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!cert) return <p>Certificate not found.</p>;

  return (
    <div>
      <h2>Certificate {cert.id}</h2>
      <p>Type: {cert.type}</p>
      <p>Issued To: {cert.patientName || cert.patientId}</p>
      <p>Issued By: {cert.doctorName || cert.doctorId}</p>
      <a href={cert.downloadUrl} download target="_blank" rel="noopener noreferrer">
        Download PDF
      </a>
      <div>
        {cert.qrUrl && (
          <div>
            <p>Scan this QR to verify certificate:</p>
            <img src={cert.qrUrl} alt="QR Code" width={180} />
          </div>
        )}
      </div>
    </div>
  );
}

export default CertificatePage;
