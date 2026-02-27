import { Phone, Zap, Globe, Sparkles, MapPin } from "lucide-react";

export default function ContactSection() {
  return (
    <section
      className="relative z-30 w-full overflow-hidden text-white py-12 px-6"
      style={{
        backgroundColor: "#1a0b2e",
        backgroundImage: `
          radial-gradient(circle at 50% 0%, rgba(255, 180, 50, 0.12), transparent 50%),
          linear-gradient(180deg, #1e1045 0%, #0f0720 100%)
        `
      }}
    >
      {/* DOT BACKGROUND */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='40' cy='40' r='1' fill='%23fff'/%3E%3C/svg%3E")`
        }}
      />

      {/* CONTENT */}
      <div className="relative z-30 max-w-3xl mx-auto text-center bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h2 className="text-lg sm:text-2xl font-black text-yellow-400 mb-4">
          எங்களை தொடர்பு கொள்ளுங்கள்
        </h2>

        <p className="text-slate-300 mb-6 text-sm sm:text-base">
          எங்கள் கடைக்கு நேரில் வருங்கள் அல்லது WhatsApp மூலம் தொடர்பு கொள்ளுங்கள்
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Phone */}
          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
            <Phone className="text-orange-400" size={18} />
            <div>
              <p className="text-xs uppercase text-slate-400 font-bold">தொலைபேசி</p>
              <p className="text-base font-black">9790575852</p>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
            <Zap className="text-green-400" size={18} />
            <div>
              <p className="text-xs uppercase text-slate-400 font-bold">WhatsApp</p>
              <p className="text-base font-black">உடனடி தொடர்பு</p>
            </div>
          </div>

          {/* Website */}
          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
            <Globe className="text-blue-400" size={18} />
            <div>
              <p className="text-xs uppercase text-slate-400 font-bold">Website</p>
              <p className="text-base font-black">www.digicopy.in</p>
            </div>
          </div>

          {/* Hours */}
          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
            <Sparkles className="text-yellow-400" size={18} />
            <div>
              <p className="text-xs uppercase text-slate-400 font-bold">நேரம்</p>
              <p className="text-base font-black">காலை 9 - இரவு 9</p>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="mt-6 flex items-center gap-3 bg-white/5 rounded-xl p-3">
          <MapPin className="text-red-400" size={18} />
          <p className="text-sm sm:text-base font-bold text-slate-200">
            மெயின் ரோடு சக்தி புக் சென்டர் மேல் தளம், கோவில்பட்டி
          </p>
        </div>

        {/* WhatsApp CTA */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => window.open("https://wa.me/9790575852", "_blank")}
            className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 font-bold shadow-[0_8px_20px_-5px_rgba(22,163,74,0.4)] transition-all hover:-translate-y-1"
          >
            இப்போதே WhatsApp செய்யுங்கள்!
          </button>
        </div>
      </div>
    </section>
  );
}
