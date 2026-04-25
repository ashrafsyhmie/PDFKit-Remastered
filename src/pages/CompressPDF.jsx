import { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import UploadZone from "../components/UploadZone";
import { useFileUpload } from "../hooks/useFileUpload";
import { compressPdfFile, downloadBlob } from "../services/pdfService";

function CompressPDF({ pushToast }) {
  const { files, addFiles, removeFile, clearFiles } = useFileUpload({ maxFiles: 1 });
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultStats, setResultStats] = useState(null);

  const handleCompress = async () => {
    if (files.length !== 1) {
      pushToast({
        type: "error",
        title: "Upload one file",
        message: "Compression works with a single PDF at a time in this starter.",
      });
      return;
    }

    try {
      setIsProcessing(true);
      setProgress(30);
      const result = await compressPdfFile(files[0].file);
      setProgress(100);
      setResultStats(result);
      downloadBlob(result.blob, result.fileName);
      pushToast({
        type: "success",
        title: "Compression complete",
        message: `Downloaded ${result.fileName}.`,
      });
    } catch (error) {
      pushToast({
        type: "error",
        title: "Compression failed",
        message: error.message || "The PDF could not be compressed.",
      });
    } finally {
      window.setTimeout(() => {
        setProgress(0);
        setIsProcessing(false);
      }, 700);
    }
  };

  const savedBytes = resultStats ? resultStats.originalSize - resultStats.compressedSize : 0;

  return (
    <section className="mx-auto max-w-4xl space-y-6">
      <div className="glass-panel p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700 dark:text-brand-300">Compress PDF</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Create lighter PDFs for faster sharing</h1>
        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
          Client-side compression is intentionally basic here. It is a great UX win for modest files, and a clean handoff point for more advanced server-side optimization later.
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
        helperText="Upload one PDF and PDFKit will re-save it using lighter object streams when possible."
      />

      {isProcessing && <ProgressBar progress={progress} label="Compressing PDF..." />}

      {resultStats && (
        <div className="glass-panel grid gap-4 p-6 sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Original</p>
            <p className="mt-2 text-lg font-semibold">{(resultStats.originalSize / 1024).toFixed(1)} KB</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Compressed</p>
            <p className="mt-2 text-lg font-semibold">{(resultStats.compressedSize / 1024).toFixed(1)} KB</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Saved</p>
            <p className="mt-2 text-lg font-semibold">{(savedBytes / 1024).toFixed(1)} KB</p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button type="button" className="primary-button" onClick={handleCompress}>
          Compress file
        </button>
        <button type="button" className="secondary-button" onClick={clearFiles}>
          Reset
        </button>
      </div>
    </section>
  );
}

export default CompressPDF;
