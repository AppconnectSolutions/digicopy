import { Phone, MapPin, Globe, Clock, MessageCircle } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-blue-700 text-white" >
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16">
  <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">
    எங்களை <span className="text-yellow-400">தொடர்பு</span> கொள்ளுங்கள்
  </h2>
  <p className="text-lg text-white/80 max-w-2xl mx-auto">
    எங்கள் கடைக்கு நேரில் வாருங்கள் அல்லது WhatsApp மூலம் தொடர்பு கொள்ளுங்கள்
  </p>
</div>


        {/* Contact Cards */}
          {/* Contact Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          
          {/* Phone */}
          <a href="tel:+919790575852" className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all border border-white/20" >
            <div className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-7 h-7 text-blue-900" />
            </div>
            <h3 className="font-bold text-lg mb-2">தொலைபேசி</h3>
            <p className="text-white/80">9790575852</p>
          </a>

          {/* WhatsApp */}
          <a href="https://wa.me/919790575852" target="_blank" rel="noopener noreferrer" className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all border border-white/20" >
            <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2">WhatsApp</h3>
            <p className="text-white/80">உடனடி தொடர்பு</p>
          </a>

          {/* Website */}
          <a href="https://www.digicopy.in" target="_blank" rel="noopener noreferrer" className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all border border-white/20" >
            <div className="w-14 h-14 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2">Website</h3>
            <p className="text-white/80">www.digicopy.in</p>
          </a>

          {/* Timing */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
            <div className="w-14 h-14 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2">நேரம்</h3>
            <p className="text-white/80">காலை 9 - இரவு 9</p>
          </div>
        </div>

        {/* Address */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-4 border border-white/20">
            <MapPin className="w-6 h-6 text-yellow-400" />
            <p className="text-lg font-medium">
              மெயின் ரோடு சக்தி புக் சென்டர் மேல்தளம், கோவில்பட்டி
            </p>
          </div>
        </div>

        {/* Big CTA */}
        <div className="mt-16 text-center">
  <a 
    href="https://wa.me/919790575852"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-3 bg-yellow-500 text-black px-10 py-5 rounded-full font-bold text-xl hover:opacity-90 transition-all shadow-button animate-pulse-glow"
  >
    <MessageCircle className="w-6 h-6" />
    இப்போதே WhatsApp செய்யுங்கள்!
  </a>
</div>

      </div>
    </section>
  );
};

export default ContactSection;
