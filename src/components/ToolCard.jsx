import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function ToolCard({ title, description, icon: Icon, to, accent }) {
  return (
    <Link
      to={to}
      className="group glass-panel flex h-full flex-col justify-between p-6 transition duration-300 hover:-translate-y-2"
    >
      <div>
        <div className={`mb-5 inline-flex rounded-2xl p-4 ${accent}`}>
          <Icon size={24} />
        </div>
        <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
        <p className="section-copy text-sm">{description}</p>
      </div>
      <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-brand-700 transition group-hover:gap-3 dark:text-brand-300">
        Open tool <ArrowRight size={16} />
      </div>
    </Link>
  );
}

export default ToolCard;
