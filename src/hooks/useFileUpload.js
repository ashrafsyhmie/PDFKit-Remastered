import { useMemo, useState } from "react";

const RECENT_FILES_KEY = "pdfkit-recent-files";

function createFileRecord(file) {
  return {
    id: crypto.randomUUID(),
    file,
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
  };
}

export function useFileUpload({ maxFiles = 10 } = {}) {
  const [files, setFiles] = useState([]);

  const addFiles = (incomingFiles) => {
    setFiles((current) => {
      const next = [...current, ...incomingFiles.map(createFileRecord)].slice(0, maxFiles);
      const recentFiles = next.map(({ name, size, lastModified }) => ({
        name,
        size,
        lastModified,
        touchedAt: Date.now(),
      }));
      localStorage.setItem(RECENT_FILES_KEY, JSON.stringify(recentFiles.slice(0, 6)));
      return next;
    });
  };

  const removeFile = (id) => {
    setFiles((current) => current.filter((file) => file.id !== id));
  };

  const clearFiles = () => {
    setFiles([]);
  };

  const recentFiles = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem(RECENT_FILES_KEY) ?? "[]");
    } catch {
      return [];
    }
  }, [files]);

  return {
    files,
    addFiles,
    removeFile,
    clearFiles,
    recentFiles,
  };
}
