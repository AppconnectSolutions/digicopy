import { Phone, User, Users } from "lucide-react";

export default function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-md"
      style={{
        backgroundColor: "#1a0b2e",
        backgroundImage: `
          radial-gradient(circle at 50% 0%, rgba(255, 180, 50, 0.12), transparent 50%),
          linear-gradient(180deg, #1e1045 0%, #0f0720 100%)
        `,
      }}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between text-white">
        
        {/* BRAND */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="text-xl md:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-br from-yellow-300 via-orange-500 to-red-500">
              DIGICOPY
            </span>
            <span className="text-xl md:text-2xl font-bold">.IN</span>
          </div>
          <span className="text-xs text-orange-200/70">Xerox and Printing Shop</span>
        </div>

        {/* NAVIGATION */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-slate-300 hover:text-orange-400 transition-colors font-medium">
            சேவைகள்
          </a>
          <a href="#offer" className="text-slate-300 hover:text-orange-400 transition-colors font-medium">
            சிறப்பு சலுகை
          </a>
          <a href="#contact" className="text-slate-300 hover:text-orange-400 transition-colors font-medium">
            தொடர்பு
          </a>
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Customer Login */}
          <button
            onClick={() => (window.location.href = "/customer")}
            className="hidden sm:flex items-center gap-2 border border-orange-400/40 hover:bg-orange-500/20 rounded px-3 py-1 text-sm font-medium transition-all"
          >
            <User className="w-4 h-4 text-orange-400" />
            <span className="hidden lg:inline">Customer Login</span>
            <span className="lg:hidden">Customer</span>
          </button>

          {/* Staff Login */}
          <button
            onClick={() => (window.location.href = "/admin/login")}
            className="hidden sm:flex items-center gap-2 border border-purple-400/40 hover:bg-purple-500/20 rounded px-3 py-1 text-sm font-medium transition-all"
          >
            <Users className="w-4 h-4 text-purple-400" />
            <span className="hidden lg:inline">Staff Login</span>
            <span className="lg:hidden">Staff</span>
          </button>

          {/* WhatsApp Contact */}
          <a
            href="https://wa.me/919790575852"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-lg"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">9790575852</span>
          </a>
        </div>
      </div>
    </header>
  );
}
