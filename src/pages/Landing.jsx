import {
  Printer,
  Copy,
  FileText,
  Scan,
  Globe,
  Phone,
  MapPin,
  Zap,
  IndianRupee,
  Sparkles
} from "lucide-react";
import { useEffect, useState } from "react";



export default function Landing() {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (stage === 0) {
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(interval);
            setTimeout(() => setStage(1), 600);
            return 100;
          }
          return p + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }
    if (stage === 1) setTimeout(() => setStage(2), 800);
    if (stage === 2) {
      setTimeout(() => {
        setProgress(0);
        setStage(0);
      }, 4500);
    }
  }, [stage]);

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      className="relative min-h-screen w-full text-white overflow-hidden font-sans"
      style={{
        backgroundColor: "#1a0b2e",
        backgroundImage: `
          radial-gradient(circle at 50% 0%, rgba(255, 180, 50, 0.12), transparent 50%),
          linear-gradient(180deg, #1e1045 0%, #0f0720 100%)
        `
      }}
    >
      {/* BACKGROUND DECORATION */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='40' cy='40' r='1' fill='%23fff'/%3E%3C/svg%3E")`,
        }}
      />

      {/* TOP CONTACT BAR */}
     <div className="absolute top-2 left-0 right-0 px-4 flex flex-col sm:flex-row justify-between items-center gap-2 z-50 text-xs">
  {/* Location */}
  <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md py-1 px-3 rounded-full border border-white/10">
    <MapPin size={12} className="text-orange-400" />
    <span className="font-medium">Near Bus Stand, Kovilpatti</span>
  </div>

  {/* Phone */}
  <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md py-1 px-3 rounded-full border border-white/10">
    <Phone size={12} className="text-orange-400" />
    <span className="font-bold tracking-widest">97905 75852</span>
  </div>
</div>


      {/* THE STUDENT - Absolute Position (Doesn't affect center layout) */}
     <img
  src="/assets/student-boy.png"
  alt="Student"
  className="
    absolute
    bottom-0 left-[-40px]
    md:bottom-auto md:top-32 md:left-10
    w-[180px] sm:w-[240px] 
    md:w-[420px] lg:w-[520px] xl:w-[620px]
    object-contain z-20
    pointer-events-none select-none
  "
/>


     <img
  src="/assets/student-girl.png"
  alt="Student Right"
  className="
    absolute
    bottom-0 right-[-40px]
    md:bottom-auto md:top-32 md:right-10
    w-[180px] sm:w-[240px] 
    md:w-[420px] lg:w-[520px] xl:w-[620px]
    object-contain z-20
    pointer-events-none select-none
  "
/>




      {/* CENTERED MAIN CONTENT */}
      <div className="relative z-30 flex flex-col items-center justify-center min-h-screen text-center px-6 py-20 max-w-4xl mx-auto">
        
        {/* BRAND */}
        <div className="relative mb-2">
          <Sparkles className="absolute -top-6 -right-6 text-yellow-400 animate-pulse" />
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter">
            Digi
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-yellow-300 via-orange-500 to-red-500">
              Copy
            </span>
          </h1>
          <div className="flex items-center justify-center gap-2 mt-2 text-orange-200/60 text-xs sm:text-sm font-medium uppercase tracking-[0.2em]">
            <Globe size={12} />
            <span>www.digicopy.in</span>
          </div>
        </div>
        <img
  src="/assets/logo.jpeg"
  alt="DigiCopy Logo"
  className="
    w-50 h-auto
    md:w-72 md:h-40
    lg:w-96 lg:h-52
    object-contain
    mx-auto mb-6
  "
/>


        {/* --- NEW REQUESTED CONTENT --- */}
        <div className="mt-6 mb-4 animate-bounce">
          <h2 className="text-yellow-400 text-xl sm:text-3xl font-black italic tracking-tight">
            Perfect for Students!
          </h2>
          <p className="text-white text-sm sm:text-lg font-bold opacity-90">
            Save More on Your Xerox Copies!
          </p>
        </div>
        {/* ----------------------------- */}

        <p className="max-w-md text-sm sm:text-lg text-slate-300 leading-relaxed mb-8">
          High-quality printing and digital documentation.
          <span className="block text-orange-400 font-bold mt-1">FAST • ACCURATE • RELIABLE</span>
        </p>

        {/* TRUST STRIP */}
        <div className="flex gap-2 sm:gap-4 flex-wrap justify-center mb-10">
          <TrustBadge icon={<Zap size={16} />} text="Fast" color="text-yellow-400" />
          <TrustBadge icon={<Printer size={16} />} text="Quality" color="text-orange-400" />
          <TrustBadge icon={<IndianRupee size={16} />} text="Best Price" color="text-green-400" />
        </div>

        {/* OFFERS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mb-10">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 transition-all hover:bg-white/10">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Limited Offer</p>
            <p className="text-xl font-black text-green-400 mt-1">Buy 100, Get 20 FREE</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 transition-all hover:bg-white/10">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">சலுகை</p>
            <p className="text-xl font-black text-green-400 mt-1">100 Xerox - 20 இலவசம்</p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md mb-12">
          <button
            onClick={() => window.location.href = "/customer"}
            className="flex-1 px-8 py-4 rounded-2xl bg-orange-600 hover:bg-orange-500 font-bold shadow-[0_10px_30px_-5px_rgba(234,88,12,0.4)] transition-all hover:-translate-y-1"
          >
            CUSTOMER LOGIN
          </button>
          <button
            onClick={() => window.location.href = "admin/login"}
            className="flex-1 px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 font-bold backdrop-blur-md border border-white/10 transition-all"
          >
            STAFF LOGIN
          </button>
        </div>

        {/* PROGRESS CIRCLE */}
        <div className="relative w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-orange-500/20 to-purple-500/20 backdrop-blur-xl border border-white/10">
          <svg width="100%" height="100%" viewBox="0 0 220 220" className="-rotate-90">
            <circle cx="110" cy="110" r={radius} stroke="rgba(255,255,255,0.05)" strokeWidth="12" fill="none" />
            <circle
              cx="110" cy="110" r={radius}
              stroke={stage === 2 ? "#22c55e" : "#f97316"}
              strokeWidth="12" fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-2xl font-black ${stage === 2 ? 'text-green-400' : ''}`}>
              {stage === 2 ? '20' : '100'}
            </div>
            <div className="text-[8px] uppercase font-bold text-slate-500">
              {stage === 2 ? 'Free' : 'Pages'}
            </div>
          </div>
          
        </div>
      </div>

     
     


      {/* FLOATING ICONS (Background only) */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        <Printer className="absolute top-1/4 right-1/4 animate-float" size={40} />
        <Copy className="absolute bottom-1/4 left-1/4 animate-float delay-200" size={36} />
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .delay-200 { animation-delay: 2s; }
      `}</style>
    </div>
  );
}



function TrustBadge({ icon, text, color }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] sm:text-xs">
      <span className={color}>{icon}</span>
      <span className="font-bold uppercase tracking-widest">{text}</span>
    </div>

    
  );
}