import { FileText, UploadCloud, X } from "lucide-react";
import { useDropzone } from "react-dropzone";

function formatSize(size) {
  if (!size) return "0 KB";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(size) / Math.log(1024)), units.length - 1);
  const value = size / 1024 ** index;
  return `${value.toFixed(value >= 10 || index === 0 ? 0 : 1)} ${units[index]}`;
}

function UploadZone({
  files,
  onDrop,
  onRemove,
  multiple = true,
  accept = { "application/pdf": [".pdf"] },
  helperText = "Drag and drop PDF files here, or click to browse.",
}) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    multiple,
    onDrop,
  });

  return (
    <div className="space-y-5">
      <div
        {...getRootProps()}
        className={`glass-panel cursor-pointer border-2 border-dashed p-8 text-center transition sm:p-10 ${
          isDragActive
            ? "border-brand-500 bg-brand-50/80 dark:bg-brand-500/10"
            : "border-slate-300/80 hover:border-brand-400 dark:border-slate-700"
        }`}
      >
        <input {...getInputProps()} />
        <div className="mx-auto flex h-20 w-20 animate-float items-center justify-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
          <UploadCloud size={34} />
        </div>
        <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-white">
          {isDragActive ? "Drop files to start" : "Upload your PDFs"}
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">{helperText}</p>
      </div>

      {files.length > 0 && (
        <div className="glass-panel divide-y divide-slate-200/70 overflow-hidden dark:divide-slate-800">
          {files.map((file) => (
            <div key={file.id} className="flex items-center justify-between gap-4 px-5 py-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="rounded-2xl bg-slate-100 p-3 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  <FileText size={18} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{file.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{formatSize(file.size)}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onRemove(file.id)}
                className="rounded-full p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
                aria-label={`Remove ${file.name}`}
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UploadZone;
