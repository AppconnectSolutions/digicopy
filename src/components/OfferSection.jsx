import { Gift, FileText, Printer, Star, Sparkles, Zap } from "lucide-react";

export default function OfferSection() {
  return (
    <section id="offer" className="py-20 bg-background">
        <div className="container mx-auto px-4"></div>
      {/* SECTION HEADER */}
      <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
            சிறப்பு <span className="text-gradient-hero">சலுகை</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            நீங்கள் எங்களிடம் எடுக்கும் ஒவ்வொரு ஜெராக்ஸ் மற்றும் பிரிண்ட் அவுட்டிலும் சிறப்பு சலுகை பெறுங்கள்
          </p>
        </div>

      {/* MAIN OFFER CARD */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Glow Background Effect */}
        <div className="absolute -inset-4 bg-orange-600/20 blur-3xl rounded-[3rem] opacity-50" />
        
        <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-16 overflow-hidden shadow-2xl">
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* LEFT SIDE: THE VISUAL */}
       <div className="relative group">
  {/* Gradient glow behind */}
  <div className="absolute -inset-1 bg-gradient-to-tr from-orange-600 to-yellow-400 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
  
  {/* Image container */}
  <div className="relative rounded-3xl overflow-hidden border border-white/10">
    <img
      src="/assets/offer-image.jpg"
      alt="Special Offer"
      className="w-full h-[250px] md:h-[400px] object-cover rounded-3xl shadow-lg"
    />

    {/* Floating Badge on Image */}
    <div className="absolute top-4 right-4 bg-orange-600 text-white px-6 py-3 rounded-2xl font-black text-base shadow-xl animate-bounce">
      🎁 BONUS
    </div>
  </div>
</div>



            {/* RIGHT SIDE: THE CONTENT */}
           <div className="text-center md:text-left">
  {/* Offer Badge */}
  <div className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full mb-6 shadow-md">
    <Gift className="w-5 h-5" />
    <span className="font-bold">🎁 சிறப்பு ஆஃபர்</span>
  </div>

  {/* Heading */}
  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
    ஒவ்வொரு
  </h3>

  {/* Big 100 Number */}
  <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
    <span className="text-6xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-orange-500 to-red-600 drop-shadow-lg">
      100
    </span>
    <span className="text-xl md:text-2xl font-bold text-gray-900">
      பக்கங்கள்<br />Xerox
    </span>
  </div>

  {/* Stars */}
  <div className="flex items-center justify-center md:justify-start gap-1 mb-6">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
    ))}
  </div>



                  {/* Free Pages Badge */}
           <div className="relative inline-block">
  {/* Glow effect behind the card */}
  <div className="absolute -inset-6 bg-green-500 rounded-3xl opacity-30 blur-2xl animate-pulse" />
  
  {/* Main free pages card */}
  <div className="relative bg-green-500 text-white rounded-3xl p-6 md:p-8 shadow-2xl">
    <p className="text-base font-bold mb-1">இலவசமாக பெறுங்கள்</p>
    <div className="flex items-baseline justify-center gap-2">
      <span className="text-7xl md:text-8xl font-black leading-none">20</span>
      <span className="text-2xl font-bold">பக்கங்கள்</span>
    </div>
    <p className="text-2xl font-black mt-2 tracking-wider">🎉 FREE! 🎉</p>
  </div>
</div>

                </div>
              </div>


          {/* BOTTOM STATS STRIP */}
          {/* BOTTOM STATS STRIP */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 pt-8 border-t border-gray-200">
  {/* 100 Pages */}
  <div className="text-center p-6 bg-gray-100 rounded-2xl shadow-md">
    <FileText className="w-10 h-10 text-orange-500 mx-auto mb-3" />
    <p className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-orange-500 to-red-600">
      100
    </p>
    <p className="text-sm font-medium text-gray-600 mt-1">Pages</p>
  </div>

  {/* +20 Free Pages */}
  <div className="text-center p-6 bg-green-500 rounded-2xl text-white shadow-md">
    <Printer className="w-10 h-10 mx-auto mb-3" />
    <p className="text-4xl md:text-5xl font-black">+20</p>
    <p className="text-sm font-medium mt-1">Free Pages</p>
  </div>

  {/* #1 Service */}
  <div className="text-center p-6 bg-gray-100 rounded-2xl shadow-md">
    <Star className="w-10 h-10 text-yellow-400 fill-yellow-400 mx-auto mb-3" />
    <p className="text-4xl md:text-5xl font-black text-gray-900">#1</p>
    <p className="text-sm font-medium text-gray-600 mt-1">Service</p>
  </div>
</div>

        </div>
      </div>

      {/* BACKGROUND FLOATING ELEMENTS */}
      <Gift className="absolute top-10 left-[5%] text-white/5 animate-float" size={100} />
      <Sparkles className="absolute bottom-20 right-[5%] text-white/5 animate-float delay-500" size={80} />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .delay-500 { animation-delay: 4s; }
      `}</style>
    </section>
  );
}

function StatItem({ icon, val, label, isHighlight = false }) {
  return (
    <div className={`flex flex-col items-center p-4 rounded-2xl transition-all ${isHighlight ? 'bg-white/10 scale-105' : 'bg-white/5'}`}>
      <div className="mb-2">{icon}</div>
      <p className="text-3xl font-black text-white">{val}</p>
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</p>
    </div>
  );
}