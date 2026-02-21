import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { PawPrint, Phone, Mail, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Page } from '../../App';

interface NavbarProps {
  currentPage: Page;
  navigate: (page: Page) => void;
}

const NAV_LINKS: { label: string; page: Page | null }[] = [
  { label: 'Home', page: 'home' },
  { label: 'About Us', page: 'about' },
  { label: 'Services', page: 'services' },
  { label: 'Gallery', page: 'gallery' },
  { label: 'Reviews', page: 'reviews' },
];

export const Navbar: React.FC<NavbarProps> = ({ currentPage, navigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);

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
      <div
        className="text-white py-2 px-6 hidden md:flex justify-between items-center text-sm font-medium z-50 relative"
        style={{ backgroundColor: '#282239' }}
      >
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2" style={{ color: '#f8f4e8cc' }}>
            <Phone size={14} style={{ color: '#a8b4d8' }} /> +91 99887 76655
          </span>
          <span className="flex items-center gap-2" style={{ color: '#f8f4e8cc' }}>
            <Mail size={14} style={{ color: '#a8b4d8' }} /> hello@pawguardian.in
          </span>
        </div>
        <div className="flex items-center gap-2" style={{ color: '#f8f4e8cc' }}>
          <Calendar size={14} style={{ color: '#a8b4d8' }} />
          <span>Book a vaccination slot</span>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.nav
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${isScrolled
          ? 'backdrop-blur-xl border-[#1e3470]/20 shadow-sm'
          : 'border-transparent'
          }`}
        style={{
          backgroundColor: isScrolled ? 'rgba(248,244,232,0.93)' : '#f8f4e8',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 grid grid-cols-3 items-center">
          {/* Left: Logo */}
          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-2.5 cursor-pointer group w-fit bg-transparent border-none p-0"
          >
            <div
              className="text-white p-2 rounded-xl transition-transform group-hover:rotate-12 shadow-lg"
              style={{ backgroundColor: '#1e3470', boxShadow: '0 6px 16px rgba(30,52,112,0.28)' }}
            >
              <PawPrint size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tight" style={{ color: '#282239' }}>
              PawGuardian
            </span>
          </button>

          {/* Center: Nav Links */}
          <div className="hidden md:flex items-center justify-center gap-6">
            {NAV_LINKS.map(({ label, page }) => {
              const isActive = page !== null && currentPage === page;
              return (
                <button
                  key={label}
                  onClick={() => page && navigate(page)}
                  className={`text-sm font-medium transition-colors whitespace-nowrap bg-transparent border-none cursor-pointer p-0 ${!page ? 'cursor-default opacity-50' : ''
                    }`}
                  style={{
                    color: isActive ? '#1e3470' : '#4a4a6a',
                    fontWeight: isActive ? 700 : 500,
                  }}
                  onMouseEnter={(e) => {
                    if (page) (e.target as HTMLButtonElement).style.color = '#1e3470';
                  }}
                  onMouseLeave={(e) => {
                    if (page)
                      (e.target as HTMLButtonElement).style.color = isActive ? '#1e3470' : '#4a4a6a';
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Right: CTA */}
          <div className="flex items-center justify-end gap-4">
            <Button
              size="sm"
              className="hidden md:flex text-white border-none rounded-full px-5"
              style={
                {
                  backgroundColor: '#1e3470',
                  boxShadow: '0 4px 14px rgba(30,52,112,0.30)',
                } as React.CSSProperties
              }
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#19296a';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#1e3470';
              }}
            >
              Book a Slot
            </Button>
          </div>
        </div>
      </motion.nav>
    </>
  );
};