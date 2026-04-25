import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function bytesToBlob(bytes, type = "application/pdf") {
  return new Blob([bytes], { type });
}

export async function getPdfMetadata(file) {
  const buffer = await file.arrayBuffer();
  const task = pdfjsLib.getDocument({ data: buffer });
  const pdf = await task.promise;
  return {
    pageCount: pdf.numPages,
    size: file.size,
    name: file.name,
  };
}

export async function mergePdfFiles(files) {
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const sourcePdf = await PDFDocument.load(bytes);
    const pages = await mergedPdf.copyPages(sourcePdf, sourcePdf.getPageIndices());
    pages.forEach((page) => mergedPdf.addPage(page));
  }

  const mergedBytes = await mergedPdf.save();
  return {
    blob: bytesToBlob(mergedBytes),
    fileName: `merged-${Date.now()}.pdf`,
  };
}

export async function splitPdfFile(file, startPage, endPage) {
  const bytes = await file.arrayBuffer();
  const sourcePdf = await PDFDocument.load(bytes);
  const pageIndices = sourcePdf.getPageIndices().slice(startPage - 1, endPage);
  const outputPdf = await PDFDocument.create();
  const copiedPages = await outputPdf.copyPages(sourcePdf, pageIndices);
  copiedPages.forEach((page) => outputPdf.addPage(page));

  const splitBytes = await outputPdf.save();
  return {
    blob: bytesToBlob(splitBytes),
    fileName: `${file.name.replace(/\.pdf$/i, "")}-pages-${startPage}-${endPage}.pdf`,
  };
}

export async function compressPdfFile(file) {
  const bytes = await file.arrayBuffer();
  const sourcePdf = await PDFDocument.load(bytes);
  const compressedBytes = await sourcePdf.save({
    useObjectStreams: true,
    addDefaultPage: false,
    updateFieldAppearances: false,
  });

  return {
    blob: bytesToBlob(compressedBytes),
    fileName: `${file.name.replace(/\.pdf$/i, "")}-compressed.pdf`,
    originalSize: file.size,
    compressedSize: compressedBytes.length,
  };
}

export async function convertPdfFile(file, targetFormat) {
  const metadata = await getPdfMetadata(file);
  const content = JSON.stringify(
    {
      status: "mock-conversion",
      source: file.name,
      targetFormat,
      pageCount: metadata.pageCount,
      generatedAt: new Date().toISOString(),
      nextStep:
        "Connect this service to a backend conversion provider such as LibreOffice, CloudConvert, or a dedicated OCR/document pipeline.",
    },
    null,
    2,
  );

  return {
    blob: new Blob([content], { type: "application/json" }),
    fileName: `${file.name.replace(/\.pdf$/i, "")}.${targetFormat}.json`,
  };
}

export function downloadBlob(blob, fileName) {
  saveAs(blob, fileName);
}
