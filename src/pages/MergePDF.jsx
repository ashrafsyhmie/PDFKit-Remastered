import { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import UploadZone from "../components/UploadZone";
import { useFileUpload } from "../hooks/useFileUpload";
import { downloadBlob, mergePdfFiles } from "../services/pdfService";

function MergePDF({ pushToast }) {
  const { files, addFiles, removeFile, clearFiles } = useFileUpload({ maxFiles: 20 });
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMerge = async () => {
    if (files.length < 2) {
      pushToast({
        type: "error",
        title: "Need more files",
        message: "Upload at least two PDF files to merge them.",
      });
      return;
    }

    try {
      setIsProcessing(true);
      setProgress(25);
      const result = await mergePdfFiles(files.map((item) => item.file));
      setProgress(100);
      downloadBlob(result.blob, result.fileName);
      pushToast({
        type: "success",
        title: "Merge complete",
        message: `Created ${result.fileName} from ${files.length} PDFs.`,
      });
    } catch (error) {
      pushToast({
        type: "error",
        title: "Merge failed",
        message: error.message || "The selected files could not be merged.",
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
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700 dark:text-brand-300">Merge PDF</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Combine multiple files into one clean PDF</h1>
        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
          Reorder support can be added next, but this starter already merges uploads in the sequence you add them.
        </p>
      </div>

      <UploadZone files={files} onDrop={addFiles} onRemove={removeFile} helperText="Upload two or more PDFs. The final file keeps pages in upload order." />

      {isProcessing && <ProgressBar progress={progress} label="Merging PDF files..." />}

      <div className="flex flex-wrap gap-3">
        <button type="button" className="primary-button" onClick={handleMerge}>
          Merge files
        </button>
        <button type="button" className="secondary-button" onClick={clearFiles}>
          Clear list
        </button>
      </div>
    </section>
  );
}

export default MergePDF;
