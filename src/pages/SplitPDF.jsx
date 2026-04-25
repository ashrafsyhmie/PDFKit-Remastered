import { useEffect, useState } from "react";
import ProgressBar from "../components/ProgressBar";
import UploadZone from "../components/UploadZone";
import { useFileUpload } from "../hooks/useFileUpload";
import { downloadBlob, getPdfMetadata, splitPdfFile } from "../services/pdfService";

function SplitPDF({ pushToast }) {
  const { files, addFiles, removeFile, clearFiles } = useFileUpload({ maxFiles: 1 });
  const [pageCount, setPageCount] = useState(0);
  const [range, setRange] = useState({ start: 1, end: 1 });
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    async function loadMetadata() {
      if (files.length !== 1) {
        setPageCount(0);
        setRange({ start: 1, end: 1 });
        return;
      }

      try {
        const metadata = await getPdfMetadata(files[0].file);
        setPageCount(metadata.pageCount);
        setRange({ start: 1, end: metadata.pageCount });
      } catch {
        pushToast({
          type: "error",
          title: "Could not read PDF",
          message: "This file could not be analyzed for page metadata.",
        });
      }
    }

    loadMetadata();
  }, [files, pushToast]);

  const handleSplit = async () => {
    if (files.length !== 1) {
      pushToast({
        type: "error",
        title: "Upload one file",
        message: "Select a single PDF before splitting pages.",
      });
      return;
    }

    if (range.start < 1 || range.end > pageCount || range.start > range.end) {
      pushToast({
        type: "error",
        title: "Invalid range",
        message: "Choose a valid page range inside the document bounds.",
      });
      return;
    }

    try {
      setIsProcessing(true);
      setProgress(35);
      const result = await splitPdfFile(files[0].file, Number(range.start), Number(range.end));
      setProgress(100);
      downloadBlob(result.blob, result.fileName);
      pushToast({
        type: "success",
        title: "Split complete",
        message: `Downloaded pages ${range.start}-${range.end}.`,
      });
    } catch (error) {
      pushToast({
        type: "error",
        title: "Split failed",
        message: error.message || "The PDF pages could not be exported.",
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
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700 dark:text-brand-300">Split PDF</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Export only the pages you need</h1>
        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
          PDFKit reads page count with `pdfjs-dist`, then hands the selected range to `pdf-lib` for extraction.
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
        helperText="Upload a single PDF to inspect the page count and export a focused range."
      />

      {pageCount > 0 && (
        <div className="glass-panel grid gap-5 p-6 sm:grid-cols-3">
          <div className="sm:col-span-3">
            <p className="text-sm text-slate-500 dark:text-slate-400">Detected {pageCount} pages in this PDF.</p>
          </div>
          <label className="space-y-2">
            <span className="text-sm font-medium">Start page</span>
            <input
              type="number"
              min="1"
              max={pageCount}
              value={range.start}
              onChange={(event) => setRange((current) => ({ ...current, start: event.target.value }))}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">End page</span>
            <input
              type="number"
              min="1"
              max={pageCount}
              value={range.end}
              onChange={(event) => setRange((current) => ({ ...current, end: event.target.value }))}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900"
            />
          </label>
          <div className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300">
            Select any contiguous range. Multi-range exports can be added later with the same service pattern.
          </div>
        </div>
      )}

      {isProcessing && <ProgressBar progress={progress} label="Exporting selected pages..." />}

      <div className="flex flex-wrap gap-3">
        <button type="button" className="primary-button" onClick={handleSplit}>
          Export pages
        </button>
        <button type="button" className="secondary-button" onClick={clearFiles}>
          Reset
        </button>
      </div>
    </section>
  );
}

export default SplitPDF;
