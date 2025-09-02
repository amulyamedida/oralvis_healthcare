import { useEffect, useState } from "react";
import { fetchScans } from "../api/scans";
import Header from "../components/Header";
import ScanCard from "../components/ScanCard";

const DentistPage = () => {
  const [scans, setScans] = useState([]);

  useEffect(() => {
    const loadScans = async () => {
      const token = localStorage.getItem("token");
      try {
        const data = await fetchScans(token);
        setScans(data);
      } catch {
        alert("Failed to fetch scans ❌");
      }
    };
    loadScans();
  }, []);

  return (
    <div>
      <Header />
      <div className="scan-grid">
  {scans.map((scan) => (
    <ScanCard key={scan.id} scan={scan} />
  ))}
</div>

    </div>
  );
};

export default DentistPage;
