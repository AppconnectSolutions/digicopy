import { ArrowRight, Sparkles, Gift, Star, BookOpen, FileText, Layers } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Fade Overlay */}
      <div className="absolute inset-0">
        <img 
          src="/assets/hero-printing.jpg" 
          alt="College Students with Projects" 
          className="w-full h-full object-cover"
        />
        {/* Fade overlay */}
        <div className="absolute inset-0 bg-black/50" /> 
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left - Main Content */}
          <div className="animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full mb-6 animate-bounce">
  <Sparkles className="w-4 h-4" />
  <span className="font-bold text-sm">🎉 சிறப்பு சலுகை!</span>
</div>

            {/* Brand Name */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight">
  <span className="bg-clip-text text-transparent bg-gradient-to-br from-yellow-300 via-orange-500 to-red-500">
    DIGICOPY
  </span>
  <span className="text-white">.IN</span>
</h1>



            {/* Main Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              <span className="text-gradient-hero">Xerox</span>
              <span className="text-white"> and Printing Shop</span>
              <br />
              <span className="text-white/90">உங்கள் நம்பகமான</span>
              <br />
              <span className="text-white">Xerox Shop</span>
            </h2>

            {/* Services */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                <Layers className="w-4 h-4" /> Project Spiral Binding
              </div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                <FileText className="w-4 h-4" /> Abstract Xerox
              </div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                <BookOpen className="w-4 h-4" /> Project Reports
              </div>
            </div>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
              மாணவர்களுக்கான சிறப்பு சேவை - Project Spiral, Abstract Xerox, Report Binding எல்லாம் ஒரே இடத்தில்!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#offer"
                className="inline-flex items-center justify-center gap-2 bg-gradient-hero text-white px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-all shadow-button"
              >
                சலுகை பாருங்கள்
                <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/919790575852"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/20 border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-all"
              >
                WhatsApp தொடர்பு
              </a>
            </div>
          </div>

          {/* Right - Offer Card */}
       {/* Right - Offer Card */}
<div className="animate-slide-up">
  <div className="relative bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-2xl text-center text-gray-900">
    {/* Offer Badge */}
    <div className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded-full font-bold shadow-lg">
      <Gift className="w-5 h-5" />
      <span>சிறப்பு ஆஃபர்</span>
    </div>

    {/* Offer Content */}
    <p className="text-lg mb-2 font-semibold">ஒவ்வொரு</p>
    <div className="flex items-center justify-center gap-3 mb-4">
      <span className="text-7xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 drop-shadow-lg animate-pulse">
        100
      </span>
      <div className="text-left">
        <span className="text-2xl font-bold">பக்கங்கள்</span><br />
        <span className="text-xl font-semibold">Xerox</span>
      </div>
    </div>

    {/* Stars */}
    <div className="flex items-center justify-center gap-1 mb-6">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
      ))}
    </div>

    {/* Free 20 Pages */}
    <div className="relative">
      <div className="absolute -inset-4 bg-green-500 rounded-2xl opacity-40 blur-xl animate-pulse" />
      <div className="relative bg-green-500 text-white rounded-2xl p-6 shadow-xl">
        <p className="text-base font-bold mb-1">இலவசமாக பெறுங்கள்</p>
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-6xl md:text-7xl font-black leading-none">20</span>
          <span className="text-xl font-bold">பக்கங்கள்</span>
        </div>
        <p className="text-xl font-black mt-2 tracking-wider">🎉 FREE! 🎉</p>
      </div>
    </div>

    <p className="text-sm mt-4 font-semibold text-gray-600">
      *ஒவ்வொரு 100 பக்கங்கள் Xerox செய்தாலும் 20 பக்கங்கள் இலவசம்
    </p>
  </div>
</div>

        </div>
      </div>
    </section>
  );
}
