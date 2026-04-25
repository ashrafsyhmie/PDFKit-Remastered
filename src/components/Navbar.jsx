import { FileStack, MoonStar, SunMedium } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Merge", to: "/merge" },
  { label: "Compress", to: "/compress" },
  { label: "Split", to: "/split" },
  { label: "Convert", to: "/convert" },
];

function Navbar({ theme, onToggleTheme }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/40 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-brand-400 dark:text-slate-950">
            <FileStack size={20} />
          </div>
          <div>
            <p className="text-lg font-bold tracking-tight">PDFKit</p>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Online PDF tools</p>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-slate-950 text-white dark:bg-brand-400 dark:text-slate-950"
                    : "text-slate-600 hover:bg-white hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={onToggleTheme}
          className="secondary-button px-4 py-2"
          aria-label="Toggle color theme"
        >
          {theme === "dark" ? <SunMedium size={18} /> : <MoonStar size={18} />}
          <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"} mode</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
