import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#0f111a] text-white py-10 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* LOGO SECTION */}
          <div className="flex items-center gap-3">
            {/* The Orange Rounded Box for 'DIGI' */}
            <div className="bg-gradient-to-b from-orange-400 to-orange-600 px-3 py-1.5 rounded-xl shadow-lg">
              <span className="text-xl md:text-2xl font-black tracking-tighter text-white">
                DIGI
              </span>
            </div>
            {/* The 'COPY.IN' Text */}
            <span className="text-xl md:text-2xl font-black tracking-tighter text-white">
              COPY.IN
            </span>
          </div>

          {/* COPYRIGHT TEXT (Tamil & English) */}
          <div className="text-center">
            <p className="text-slate-400 text-sm md:text-base font-medium">
              © 2025 <span className="text-slate-200">DigiCopy.in</span> அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.
            </p>
          </div>

          {/* DEVELOPER & WEBSITE LINKS */}
          <div className="flex flex-col items-center md:items-end gap-1">
            <a 
              href="https://www.digicopy.in" 
              className="text-slate-200 hover:text-orange-400 transition-colors font-bold tracking-wide"
            >
              www.digicopy.in
            </a>
            <p className="text-slate-500 text-xs">
              Developed by {" "}
              <a 
                href="https://www.appconnectsolutions.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white font-bold transition-colors"
              >
                Appconnectsolutions
              </a>
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;