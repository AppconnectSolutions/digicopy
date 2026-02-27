import { Printer, FileText, Copy, BookOpen, CreditCard, Smartphone } from "lucide-react";

const services = [
  {
    icon: Copy,
    title: "ஜெராக்ஸ் சேவை",
    titleEn: "Xerox Service",
    description: "உயர் தர ஜெராக்ஸ் பிரதிகள் மிக குறைந்த விலையில்",
    image: "/assets/xerox-service.jpg",
  },
  {
    icon: Printer,
    title: "பிரிண்ட் அவுட்",
    titleEn: "Print Out",
    description: "கலர் மற்றும் பிளாக் & ஒயிட் பிரிண்ட்கள்",
    image: "/assets/print-service.jpg",
  },
  {
    icon: BookOpen,
    title: "புத்தக பைண்டிங்",
    titleEn: "Book Binding",
    description: "தரமான புத்தக பைண்டிங் சேவை",
    image: "/assets/binding-service.jpg",
  },
];

const additionalServices = [
  {
    icon: FileText,
    title: "ஆவண சேவைகள்",
    titleEn: "Document Services",
    description: "அனைத்து வகையான ஆவண தயாரிப்பு மற்றும் பதிவு",
  },
  {
    icon: CreditCard,
    title: "லேமினேஷன்",
    titleEn: "Lamination",
    description: "ID கார்டு மற்றும் ஆவண லேமினேஷன்",
  },
  {
    icon: Smartphone,
    title: "டிஜிட்டல் சேமிப்பு",
    titleEn: "Digital Storage",
    description: "உங்கள் ஆவணங்களை டிஜிட்டல் முறையில் சேமிப்பு",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
            எங்கள் <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-600">சேவைகள்</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Digi Copy இல் நாங்கள் வழங்கும் தரமான சேவைகள்
          </p>
        </div>

        {/* Main Services with Images */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border border-gray-200"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.titleEn}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {service.title}
                </h3>
                <p className="text-sm text-orange-600 font-medium mb-2">
                  {service.titleEn}
                </p>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services Grid */}
        <div className="grid sm:grid-cols-3 gap-6">
          {additionalServices.map((service, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200"
            >
              <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {service.title}
              </h3>
              <p className="text-sm text-orange-600 font-medium mb-2">
                {service.titleEn}
              </p>
              <p className="text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
