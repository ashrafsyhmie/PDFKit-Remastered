import {
  BadgePercent,
  Files,
  Hash,
  RotateCw,
  Scissors,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import ToolCard from "../components/ToolCard";
import { useFileUpload } from "../hooks/useFileUpload";

const tools = [
  {
    title: "Merge PDF",
    description: "Combine multiple PDFs into one polished file in a few clicks.",
    icon: Files,
    to: "/merge",
    accent: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
  },
  {
    title: "Split PDF",
    description: "Extract page ranges for reports, contracts, and handouts.",
    icon: Scissors,
    to: "/split",
    accent: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
  },
  {
    title: "Compress PDF",
    description: "Reduce PDF weight for uploads, sharing, and faster storage.",
    icon: BadgePercent,
    to: "/compress",
    accent: "bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300",
  },
  {
    title: "Convert PDF",
    description: "Prepare documents for DOCX, JPG, or text conversion pipelines.",
    icon: Sparkles,
    to: "/convert",
    accent: "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300",
  },
  {
    title: "Rotate PDF",
    description: "Placeholder card for the next tool in your product roadmap.",
    icon: RotateCw,
    to: "/merge",
    accent: "bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300",
  },
  {
    title: "Add Page Numbers",
    description: "Plan-ready surface for branding, pagination, and annotations.",
    icon: Hash,
    to: "/split",
    accent: "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-300",
  },
];

function Home() {
  const { recentFiles } = useFileUpload();

  return (
    <div className="space-y-12">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="glass-panel p-8 sm:p-10">
          <div className="mb-4 inline-flex rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-brand-700 dark:border-brand-500/20 dark:bg-brand-500/10 dark:text-brand-300">
            Browser-first PDF toolkit
          </div>
          <h1 className="section-title max-w-3xl">
            Edit, organize, and ship PDF files from a fast client-side workspace.
          </h1>
          <p className="section-copy mt-6 max-w-2xl">
            PDFKit gives you the core building blocks of an iLovePDF-style experience with modern routing,
            reusable upload flows, and a service layer ready for backend expansion.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/merge" className="primary-button">
              Start with Merge PDF
            </Link>
            <Link to="/compress" className="secondary-button">
              Explore tools
            </Link>
          </div>
        </div>

        <div className="glass-panel p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
            Why this starter works
          </p>
          <div className="mt-6 space-y-4">
            {[
              "Drag-and-drop uploads with reusable file state.",
              "Working merge, split, and client-side compression logic.",
              "Conversion flow already shaped for a future API.",
              "Responsive SaaS-style interface with dark mode and toasts.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/70 bg-white/60 p-4 text-sm text-slate-700 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Popular tools</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Each card routes into a focused workflow page with upload, progress, and download actions.
            </p>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.title} {...tool} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="glass-panel p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
            Suggested backend path
          </p>
          <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            <p>Use signed uploads to object storage, queue long-running jobs, and process conversions in workers.</p>
            <p>Keep merge and split in-browser for smaller files, but move OCR, DOCX conversion, and image rendering to an API.</p>
            <p>Deploy the frontend to Vercel, and connect serverless endpoints or a queue-backed worker service as scale grows.</p>
          </div>
        </div>

        <div className="glass-panel p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
            Recent files
          </p>
          <div className="mt-5 space-y-3">
            {recentFiles.length === 0 ? (
              <p className="text-sm text-slate-500 dark:text-slate-400">Your recent uploads will appear here after you use a tool.</p>
            ) : (
              recentFiles.map((file) => (
                <div
                  key={`${file.name}-${file.lastModified}`}
                  className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-900/70"
                >
                  <p className="font-semibold text-slate-900 dark:text-white">{file.name}</p>
                  <p className="mt-1 text-slate-500 dark:text-slate-400">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
