import { FileArchive, Layers, HardDrive } from "lucide-react";

export default function ServicesSection() {
  return (
    <section
      className="relative z-20 w-full overflow-hidden text-white py-16 px-6"
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
      <div className="relative z-30 max-w-6xl mx-auto text-center bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-black text-yellow-400 mb-4">
          எங்கள் சேவைகள்
        </h2>

        <p className="text-slate-300 mb-10 text-sm sm:text-base">
          Digi Copy இல் நாங்கள் வழங்கும் தரமான சேவைகள்
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Xerox Service */}
          <div className="bg-white/5 hover:bg-white/10 transition rounded-xl overflow-hidden shadow-lg">
            <img
              src="/assets/xerox.jpg"
              alt="Xerox Service"
              className="w-full h-40 object-cover"
            />
            <div className="p-6 flex flex-col items-center">
              <h3 className="font-bold text-lg mb-1 text-orange-400">ஜெராக்ஸ் சேவை</h3>
              <p className="text-sm text-white">Xerox Service</p>
              <p className="text-slate-400 text-sm mt-2">
                நாம் வழங்கும் பிரிண்ட் ப்ளஸ் ஜெராக்ஸ் விவரங்கள்
              </p>
            </div>
          </div>

          {/* Print Out */}
          <div className="bg-white/5 hover:bg-white/10 transition rounded-xl overflow-hidden shadow-lg">
            <img
              src="/assets/colorprint.jpg"
              alt="Color Print Service"
              className="w-full h-40 object-cover"
            />
            <div className="p-6 flex flex-col items-center">
              <h3 className="font-bold text-lg mb-1 text-orange-400">பிரிண்ட் அவுட்</h3>
              <p className="text-sm text-white">Print Out</p>
              <p className="text-slate-400 text-sm mt-2">
                கருப்பு மற்றும் வண்ணம் ஆகிய பிரிண்ட் அவுட்
              </p>
            </div>
          </div>

          {/* Book Binding */}
          <div className="bg-white/5 hover:bg-white/10 transition rounded-xl overflow-hidden shadow-lg">
            <img
              src="/assets/bookbinding.jpeg"
              alt="Binding Service"
              className="w-full h-40 object-cover"
            />
            <div className="p-6 flex flex-col items-center">
              <h3 className="font-bold text-lg mb-1 text-orange-400">புத்தக பைண்டிங்</h3>
              <p className="text-sm text-white">Book Binding</p>
              <p className="text-slate-400 text-sm mt-2">
                தரமான புத்தக பைண்டிங் சேவை
              </p>
            </div>
          </div>

          {/* Document Services */}
          <div className="bg-white/5 hover:bg-white/10 transition rounded-xl p-6 flex flex-col items-center shadow-lg">
            <FileArchive className="text-orange-400 mb-3" size={40} />
            <h3 className="font-bold text-lg mb-1 text-orange-400">ஆவண சேவைகள்</h3>
            <p className="text-sm text-white">Document Services</p>
            <p className="text-slate-400 text-sm mt-2">
              ஆவணங்களை தயாரிப்பு மற்றும் பிரதி
            </p>
          </div>

          {/* Lamination */}
          <div className="bg-white/5 hover:bg-white/10 transition rounded-xl p-6 flex flex-col items-center shadow-lg">
            <Layers className="text-orange-400 mb-3" size={40} />
            <h3 className="font-bold text-lg mb-1 text-orange-400">லேமினேஷன்</h3>
            <p className="text-sm text-white">Lamination</p>
            <p className="text-slate-400 text-sm mt-2">
              மனித காகிதம் மற்றும் லேமினேஷன்
            </p>
          </div>

          {/* Digital Storage */}
          <div className="bg-white/5 hover:bg-white/10 transition rounded-xl p-6 flex flex-col items-center shadow-lg">
            <HardDrive className="text-orange-400 mb-3" size={40} />
            <h3 className="font-bold text-lg mb-1 text-orange-400">டிஜிட்டல் சேமிப்பு</h3>
            <p className="text-sm text-white">Digital Storage</p>
            <p className="text-slate-400 text-sm mt-2">
              ஆவணங்களை டிஜிட்டல் முறையில் சேமிப்பு
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
