import { ShoppingCart, LayoutGrid, Package, Users,Tag, LogOut } from "lucide-react";

export default function AdminSidebar({ activeTab, setActiveTab, onLogout }) {
  const sidebarItems = [
    { key: "pos", icon: <ShoppingCart size={22} />, label: "New Bill" },          // ✅ Added back
    { key: "dashboard", icon: <LayoutGrid size={22} />, label: "Owner Dashboard" },
    { key: "products", icon: <Package size={22} />, label: "Product Manager" },
    { key: "customers", icon: <Users size={22} />, label: "Customer List" },
    { key: "offers", icon: <Tag size={22} />, label: "Offer Management" },
  ];

  return (
    <aside className="w-20 lg:w-64 bg-slate-900 text-white flex flex-col z-20 shadow-xl transition-all">
      {/* Brand */}
      <div className="p-4 lg:p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shrink-0 shadow-lg">
          KB
        </div>
        <div className="hidden lg:block">
          <span className="text-lg font-bold tracking-tight block leading-tight">K.B. Online</span>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">POS System</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 lg:p-4 space-y-2">
        {sidebarItems.map(item => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`w-full flex items-center gap-3 px-3 lg:px-4 py-3 rounded-xl transition-all font-medium ${
              activeTab === item.key
                ? "bg-indigo-600 text-white shadow-md"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {item.icon}
            <span className="hidden lg:block">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-2 lg:p-4 border-t border-slate-800">
        <div
          className="flex items-center gap-3 px-2 lg:px-4 py-3 hover:bg-red-500/10 hover:text-red-400 rounded-xl cursor-pointer transition-colors group"
          onClick={onLogout}
        >
          <LogOut size={20} className="text-slate-500 group-hover:text-red-400" />
          <span className="hidden lg:block text-sm font-bold text-slate-400 group-hover:text-red-400">
            Logout
          </span>
        </div>
      </div>
    </aside>
  );
}
