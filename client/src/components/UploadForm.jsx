import { useState } from "react";
import { analyzeResume } from "../services/api";
import AnalysisResult from "./AnalysisResult";
import "./UploadForm.css";

function UploadForm() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

   const handleUpload = async () => {
     if (!file) {
       alert("Please select a PDF");
       return;
     }

     if (file.type !== "application/pdf") {
       setError("Only PDF files are allowed");
       return;
     }

     if (file.size > 5 * 1024 * 1024) {
       setError("File size should be less than 5MB");
       return;
     }

     try {

        setLoading(true);
        setError("");
        setAnalysis("");

       const formData = new FormData();

       formData.append("resume", file);

       const response = await analyzeResume(formData);

       setAnalysis(response.data.analysis);

     } catch (error) {
       console.error(error);
       setError("Failed to analyze resume");
     } finally {
    setLoading(false);
     }
   };

  return (
    <div className="upload-container">
      <h2 className="upload-title">AI Resume Analyzer</h2>

      <input
        className="file-input"
        type="file"
        accept=".pdf,.docx"
        onChange={handleFileChange}
      />

      <button className="analyze-btn" onClick={handleUpload} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {error && <p className="error-text">{error}</p>}

      {analysis && <AnalysisResult analysis={analysis} />}
    </div>
  );
}

export default UploadForm;