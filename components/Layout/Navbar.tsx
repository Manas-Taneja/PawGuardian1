import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { PawPrint, Phone, Mail, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Page } from '../../App';

interface NavbarProps {
  currentPage: Page;
  navigate: (page: Page) => void;
  onOpenBooking: () => void;
}

const NAV_LINKS: { label: string; page: Page | null }[] = [
  { label: 'Home', page: 'home' },
  { label: 'About Us', page: 'about' },
  { label: 'Services', page: 'services' },
  { label: 'For Vets', page: 'vets' },
];

export const Navbar: React.FC<NavbarProps> = ({ currentPage, navigate, onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
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
            className="flex items-center gap-2.5 cursor-pointer w-fit bg-transparent border-none p-0"
          >
            <motion.div
              whileHover={{ rotate: [0, -15, 15, -10, 10, 0], transition: { duration: 0.5, ease: 'easeInOut' } }}
              className="text-white p-2 rounded-xl shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #6272E8, #7B93F0)',
                boxShadow: '0 6px 16px rgba(98,114,232,0.35)',
              }}
            >
              <PawPrint size={24} />
            </motion.div>
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
                  className={`relative text-sm font-medium transition-colors whitespace-nowrap bg-transparent border-none cursor-pointer p-0 pb-1 ${!page ? 'cursor-default opacity-50' : ''}`}
                  style={{
                    color: isActive ? '#1e3470' : '#4a4a6a',
                    fontWeight: isActive ? 700 : 500,
                  }}
                  onMouseEnter={(e) => {
                    if (page) (e.currentTarget as HTMLButtonElement).style.color = '#1e3470';
                  }}
                  onMouseLeave={(e) => {
                    if (page)
                      (e.currentTarget as HTMLButtonElement).style.color = isActive ? '#1e3470' : '#4a4a6a';
                  }}
                >
                  {label}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#FFE66D' }} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: CTA */}
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => navigate('vets')}
              className="hidden md:flex items-center text-sm font-semibold rounded-full px-5 py-2 transition-colors cursor-pointer bg-transparent"
              style={{
                border: '1px solid #1e3470',
                color: '#1e3470',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(30,52,112,0.06)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
              }}
            >
              Are you a Vet?
            </button>
            <Button
              size="sm"
              className="hidden md:flex text-white border-none rounded-full px-5"
              style={{
                backgroundColor: '#6272E8',
                boxShadow: '0 4px 14px rgba(98,114,232,0.35)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#5060D8';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#6272E8';
              }}
              onClick={onOpenBooking}
            >
              Book a Slot
            </Button>
          </div>
        </div>
      </motion.nav>
  );
};