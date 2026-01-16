import { NavLink } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/", icon: "🏠" },
  { name: "Organizations", path: "/organizations", icon: "🏢" },
  { name: "Transactions", path: "/transactions", icon: "📦" },
  { name: "Settings", path: "/settings", icon: "⚙️" },
];

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-2xl z-40">
      <div className="h-full flex flex-col">
        {/* Brand */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow overflow-hidden">
            <img src="/logo.jpeg" alt="Logo" className="h-7 object-contain" />
          </div>

          <div className="leading-tight">
            <h1 className="text-lg font-extrabold tracking-wide">
              Brand Crest <span className="text-indigo-400">Digital</span>
            </h1>
            <p className="text-xs text-white/60">Organization</p>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg"
                    : "hover:bg-white/10"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 text-xs text-white/60">
          © 2026 Brand Crest Digital
        </div>
      </div>
    </aside>
  );
}
