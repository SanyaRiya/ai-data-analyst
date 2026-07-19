import { useState } from "react";
import api from "../services/api";

interface UploadSectionProps {
  onAnalysisComplete: (data: any) => void;
}

function UploadSection({ onAnalysisComplete }: UploadSectionProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a dataset.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await api.post("/upload", formData);

      onAnalysisComplete(response.data);
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">

      <input
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={(e) => {
          if (e.target.files)
            setFile(e.target.files[0]);
        }}
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        {loading ? "Analyzing..." : "Analyze Dataset"}
      </button>

    </div>
  );
}

export default UploadSection;