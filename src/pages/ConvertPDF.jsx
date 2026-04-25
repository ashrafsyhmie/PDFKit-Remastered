import { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import UploadZone from "../components/UploadZone";
import { useFileUpload } from "../hooks/useFileUpload";
import { convertPdfFile, downloadBlob } from "../services/pdfService";

const targetFormats = [
  { value: "docx", label: "DOCX" },
  { value: "jpg", label: "JPG" },
  { value: "txt", label: "TXT" },
];

function ConvertPDF({ pushToast }) {
  const { files, addFiles, removeFile, clearFiles } = useFileUpload({ maxFiles: 1 });
  const [targetFormat, setTargetFormat] = useState("docx");
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConvert = async () => {
    if (files.length !== 1) {
      pushToast({
        type: "error",
        title: "Upload one file",
        message: "Select a single PDF to generate the conversion payload.",
      });
      return;
    }

    try {
      setIsProcessing(true);
      setProgress(40);
      const result = await convertPdfFile(files[0].file, targetFormat);
      setProgress(100);
      downloadBlob(result.blob, result.fileName);
      pushToast({
        type: "info",
        title: "Mock conversion created",
        message: `Downloaded a ${targetFormat.toUpperCase()} conversion stub. Wire this step to your backend next.`,
      });
    } catch (error) {
      pushToast({
        type: "error",
        title: "Conversion failed",
        message: error.message || "The mock conversion payload could not be generated.",
      });
    } finally {
      window.setTimeout(() => {
        setProgress(0);
        setIsProcessing(false);
      }, 700);
    }
  };

  return (
    <section className="mx-auto max-w-4xl space-y-6">
      <div className="glass-panel p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700 dark:text-brand-300">Convert PDF</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Conversion-ready workflow for a future document API</h1>
        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
          This page is intentionally structured as a frontend handoff. It packages the selected file and export target so you can later swap the mock function for a backend endpoint.
        </p>
      </div>

      <UploadZone
        files={files}
        onDrop={(accepted) => {
          clearFiles();
          addFiles(accepted);
        }}
        onRemove={removeFile}
        multiple={false}
        helperText="Upload one PDF, choose the destination format, and test the frontend conversion flow."
      />

      <div className="glass-panel p-6">
        <label className="space-y-2">
          <span className="text-sm font-medium">Target format</span>
          <select
            value={targetFormat}
            onChange={(event) => setTargetFormat(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900"
          >
            {targetFormats.map((format) => (
              <option key={format.value} value={format.value}>
                {format.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {isProcessing && <ProgressBar progress={progress} label="Preparing conversion payload..." />}

      <div className="flex flex-wrap gap-3">
        <button type="button" className="primary-button" onClick={handleConvert}>
          Convert file
        </button>
        <button type="button" className="secondary-button" onClick={clearFiles}>
          Reset
        </button>
      </div>
    </section>
  );
}

export default ConvertPDF;
