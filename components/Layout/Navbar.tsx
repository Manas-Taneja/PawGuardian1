import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { PawPrint, Phone, Mail, Calendar, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <>
    <motion.nav
      className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${isScrolled
        ? 'backdrop-blur-xl border-[#003F7D]/20 shadow-sm'
        : 'border-transparent'
        }`}
      style={{
        backgroundColor: isScrolled ? 'rgba(248,244,232,0.93)' : '#f8f4e8',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between md:grid md:grid-cols-3">
        {/* Left: Logo */}
        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-2.5 cursor-pointer w-fit bg-transparent border-none p-0"
        >
          <motion.div
            whileHover={{ rotate: [0, -15, 15, -10, 10, 0], transition: { duration: 0.5, ease: 'easeInOut' } }}
            className="text-white p-2 rounded-xl shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #FF8E00, #FF8E00)',
              boxShadow: '0 6px 16px rgba(255,142,0,0.35)',
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
                  color: isActive ? '#003F7D' : '#4a4a6a',
                  fontWeight: isActive ? 700 : 500,
                }}
                onMouseEnter={(e) => {
                  if (page) (e.currentTarget as HTMLButtonElement).style.color = '#003F7D';
                }}
                onMouseLeave={(e) => {
                  if (page)
                    (e.currentTarget as HTMLButtonElement).style.color = isActive ? '#003F7D' : '#4a4a6a';
                }}
              >
                {label}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#FD7702' }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: CTA */}
        <div className="flex items-center justify-end gap-3">
          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-lg bg-transparent border-none cursor-pointer"
            aria-label="Open menu"
          >
            <Menu size={24} style={{ color: '#282239' }} />
          </button>
          <button
            onClick={() => navigate('vets')}
            className="hidden md:flex items-center text-sm font-semibold rounded-full px-5 py-2 transition-colors cursor-pointer bg-transparent"
            style={{
              border: '1px solid #003F7D',
              color: '#003F7D',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(0,35,71,0.06)';
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
              backgroundColor: '#FF8E00',
              boxShadow: '0 4px 14px rgba(255,142,0,0.35)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#5060D8';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#FF8E00';
            }}
            onClick={onOpenBooking}
          >
            Are you a Pet Parent?
          </Button>
        </div>
      </div>
    </motion.nav>

    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-72 shadow-2xl flex flex-col"
            style={{ backgroundColor: '#f8f4e8' }}
          >
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'rgba(0,35,71,0.10)' }}>
              <span className="text-lg font-bold" style={{ color: '#282239' }}>Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg bg-transparent border-none cursor-pointer"
                aria-label="Close menu"
              >
                <X size={24} style={{ color: '#282239' }} />
              </button>
            </div>

            <nav className="flex flex-col gap-1 p-4 flex-1">
              {NAV_LINKS.map(({ label, page }) => {
                const isActive = page !== null && currentPage === page;
                return (
                  <button
                    key={label}
                    onClick={() => {
                      if (page) {
                        navigate(page);
                        setIsMobileMenuOpen(false);
                      }
                    }}
                    className="text-left px-4 py-3 rounded-xl text-base font-medium bg-transparent border-none cursor-pointer transition-colors"
                    style={{
                      color: isActive ? '#003F7D' : '#4a4a6a',
                      fontWeight: isActive ? 700 : 500,
                      backgroundColor: isActive ? 'rgba(0,63,125,0.08)' : 'transparent',
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </nav>

            <div className="p-4 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(0,35,71,0.10)' }}>
              <button
                onClick={() => { navigate('vets'); setIsMobileMenuOpen(false); }}
                className="w-full text-center text-sm font-semibold rounded-full px-5 py-3 cursor-pointer bg-transparent transition-colors"
                style={{ border: '1px solid #003F7D', color: '#003F7D' }}
              >
                Are you a Vet?
              </button>
              <button
                onClick={() => { onOpenBooking(); setIsMobileMenuOpen(false); }}
                className="w-full text-center text-sm font-semibold text-white rounded-full px-5 py-3 cursor-pointer border-none"
                style={{ backgroundColor: '#FF8E00', boxShadow: '0 4px 14px rgba(255,142,0,0.35)' }}
              >
                Are you a Pet Parent?
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
};