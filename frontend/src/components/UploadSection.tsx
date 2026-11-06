import { useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
import axios from "axios";
import api from "../services/api";
import type { AnalysisResult } from "../types/analysis";
import Icon from "./Icon";

interface UploadSectionProps {
  onAnalysisComplete: (data: AnalysisResult) => void;
}

export default function UploadSection({ onAnalysisComplete }: UploadSectionProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const chooseFile = (selectedFile?: File) => {
    if (!selectedFile) return;
    const validExtensions = [".csv", ".xlsx", ".xls"];
    const isValid = validExtensions.some((extension) =>
      selectedFile.name.toLowerCase().endsWith(extension)
    );

    if (!isValid) {
      setError("Please choose a CSV, XLSX or XLS file.");
      setFile(null);
      return;
    }

    setError("");
    setFile(selectedFile);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    chooseFile(event.target.files?.[0]);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    chooseFile(event.dataTransfer.files?.[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Choose a dataset before starting the analysis.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setError("");
      const response = await api.post<AnalysisResult>("/upload", formData);
      onAnalysisComplete(response.data);
    } catch (uploadError) {
      console.error(uploadError);
      if (axios.isAxiosError(uploadError)) {
        setError(
          uploadError.response?.data?.detail ||
            uploadError.message ||
            "Upload failed. Please check that the backend is running and try again."
        );
      } else {
        setError("Something went wrong while analyzing the dataset.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`rounded-2xl border-2 border-dashed px-5 py-9 text-center transition sm:px-8 ${
          dragging
            ? "border-blue-500 bg-blue-50"
            : "border-slate-200 bg-slate-50/70 hover:border-blue-300 hover:bg-blue-50/40"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
          <Icon name="upload" size={26} />
        </div>

        <h3 className="mt-5 text-lg font-semibold text-slate-900">
          {file ? "Dataset ready to analyze" : "Upload your dataset"}
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          Drag and drop your file here, or{" "}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="font-semibold text-blue-700 hover:text-blue-800"
          >
            browse files
          </button>
        </p>
        <p className="mt-2 text-xs text-slate-400">
          Supported formats: CSV, XLSX and XLS
        </p>

        {file && (
          <div className="mx-auto mt-6 flex max-w-md items-center justify-between gap-3 rounded-xl border border-blue-100 bg-white px-4 py-3 text-left shadow-sm">
            <div className="flex min-w-0 items-center gap-3">
              <div className="rounded-lg bg-emerald-50 p-2 text-emerald-700">
                <Icon name="file" size={19} />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800">{file.name}</p>
                <p className="text-xs text-slate-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setFile(null);
                if (inputRef.current) inputRef.current.value = "";
              }}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Remove selected file"
            >
              <Icon name="x" size={17} />
            </button>
          </div>
        )}

        {error && (
          <p className="mx-auto mt-4 max-w-lg rounded-lg bg-rose-50 px-3 py-2 text-left text-sm text-rose-700">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleUpload}
          disabled={loading || !file}
          className="mt-7 inline-flex min-w-48 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Analyzing dataset...
            </>
          ) : (
            <>
              Analyze dataset
              <Icon name="arrow-up-right" size={17} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
