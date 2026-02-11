import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { PawPrint, Phone, Mail, Calendar } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-slate-900 text-white py-2 px-6 hidden md:flex justify-between items-center text-sm font-medium z-50 relative">
        <div className="flex items-center gap-6">
           <span className="flex items-center gap-2 text-blue-100"><Phone size={14} className="text-blue-400"/> +91 99887 76655</span>
           <span className="flex items-center gap-2 text-blue-100"><Mail size={14} className="text-blue-400"/> hello@pawguardian.in</span>
        </div>
        <div className="flex items-center gap-2 text-blue-100">
            <Calendar size={14} className="text-blue-400"/>
            <span>Book a vaccination slot</span>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.nav 
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
          isScrolled ? 'bg-white/90 backdrop-blur-xl border-gray-200 shadow-sm' : 'bg-white border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group">
            {/* Logo Blue */}
            <div className="bg-blue-600 text-white p-2 rounded-xl transition-transform group-hover:rotate-12 shadow-lg shadow-blue-500/30">
              <PawPrint size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tight text-gray-900">PawGuardian</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Home', 'About Us', 'Services', 'Gallery', 'Reviews'].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
             {/* Button removed as per request */}
          </div>
        </div>
      </motion.nav>
    </>
  );
};