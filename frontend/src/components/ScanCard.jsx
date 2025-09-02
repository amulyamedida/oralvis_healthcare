import { jsPDF } from "jspdf";

const ScanCard = ({ scan }) => {
  const handleDownloadPDF = async () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("OralVis Healthcare Scan Report", 10, 20);

    doc.setFontSize(12);
    doc.text(`Patient Name: ${scan.patientName}`, 10, 40);
    doc.text(`Patient ID: ${scan.patientId}`, 10, 50);
    doc.text(`Scan Type: ${scan.scanType}`, 10, 60);
    doc.text(`Region: ${scan.region}`, 10, 70);
    doc.text(
      `Upload Date: ${new Date(scan.uploadDate).toLocaleString()}`,
      10,
      80
    );

    try {
      const img = new Image();
      img.crossOrigin = "anonymous"; 
      img.src = scan.imageUrl;

      img.onload = function () {
        const imgProps = doc.getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 20;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(img, "JPEG", 10, 90, pdfWidth, pdfHeight);

        doc.save(`Scan_${scan.patientId}.pdf`);
      };
    } catch (err) {
      console.error("PDF generation error:", err);
      alert("Failed to generate PDF ❌");
    }
  };

  return (
    <div className="scan-card">
      <h3>
        {scan.patientName} ({scan.patientId})
      </h3>
      <p>Type: {scan.scanType}</p>
      <p>Region: {scan.region}</p>
      <p>Date: {new Date(scan.uploadDate).toLocaleString()}</p>
      <img src={scan.imageUrl} alt="scan" />
      <button
        onClick={handleDownloadPDF}
        className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
      >
        Download Report
      </button>
    </div>
  );
};

export default ScanCard;
