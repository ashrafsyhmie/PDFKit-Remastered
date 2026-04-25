import { AlertCircle, CheckCircle2, Info } from "lucide-react";

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

function ToastContainer({ toasts }) {
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex w-full max-w-sm flex-col gap-3">
      {toasts.map((toast) => {
        const Icon = icons[toast.type] ?? Info;
        return (
          <div
            key={toast.id}
            className="pointer-events-auto animate-fade-up rounded-2xl border border-white/60 bg-white/90 p-4 shadow-glow backdrop-blur dark:border-white/10 dark:bg-slate-900/90"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-brand-600 dark:text-brand-300">
                <Icon size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{toast.title}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{toast.message}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ToastContainer;
