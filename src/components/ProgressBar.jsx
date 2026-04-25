function ProgressBar({ progress, label = "Working on your file..." }) {
  return (
    <div className="glass-panel p-4">
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</p>
        <p className="text-sm font-semibold text-brand-700 dark:text-brand-300">{progress}%</p>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-400 via-brand-500 to-slate-950 transition-all duration-500 dark:to-brand-200"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
