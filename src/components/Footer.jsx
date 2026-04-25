function Footer() {
  return (
    <footer className="border-t border-slate-200/70 bg-white/60 py-8 backdrop-blur dark:border-slate-800 dark:bg-slate-950/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 text-sm text-slate-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 dark:text-slate-400">
        <p>PDFKit keeps everyday PDF work in the browser for quick edits and simple downloads.</p>
        <p>Built with React, Vite, Tailwind CSS, pdf-lib, and pdfjs-dist.</p>
      </div>
    </footer>
  );
}

export default Footer;
