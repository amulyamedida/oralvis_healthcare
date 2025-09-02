import { useState } from "react";
import { uploadScan } from "../api/scans";
import Header from "../components/Header";
import "../styles/global.css";

const TechnicianPage = () => {
  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");
  const [scanType, setScanType] = useState("");
  const [region, setRegion] = useState("");
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("patientName", patientName);
      formData.append("patientId", patientId);
      formData.append("scanType", scanType);
      formData.append("region", region);
      formData.append("scanImage", file);

      const token = localStorage.getItem("token");
      const res = await uploadScan(token, formData);
      alert(res.message);
      setPatientName("");
      setPatientId("");
      setScanType("");
      setRegion("");
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed ❌");
    }
  };

  return (
    <div className="upload-page">
      <Header />
      <form onSubmit={handleUpload} className="upload-form">
        <h2>Upload Patient Scan</h2>
        <input
          type="text"
          placeholder="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Scan Type"
          value={scanType}
          onChange={(e) => setScanType(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button type="submit">Upload Scan</button>
      </form>
    </div>
  );
};

export default TechnicianPage;
