import React from 'react';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import { ArrowRight, PawPrint, Stethoscope, UserRound, Wallet } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-24 md:py-0">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg-sunset.jpg"
          alt="Sunset beach with pet parent and pets"
          className="w-full h-full object-cover"
        />
        {/* Brand overlay */}
        <div className="absolute inset-0 mix-blend-multiply opacity-30" style={{ backgroundColor: '#002347' }} />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 35, 71, 0.5)' }} />
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to top, rgba(0, 35, 71, 0.95), transparent)' }} />
        {/* Decorative paw print — bottom left */}
        <div className="absolute bottom-8 left-8 opacity-10 pointer-events-none select-none z-0 hidden md:block">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="white" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="60" cy="75" rx="18" ry="22" />
            <circle cx="38" cy="50" r="10" />
            <circle cx="60" cy="42" r="10" />
            <circle cx="82" cy="50" r="10" />
            <circle cx="30" cy="68" r="8" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">

        {/* Early Access Label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <span
            className="flex items-center gap-1.5 text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full"
            style={{ backgroundColor: 'rgba(255,142,0,0.15)', color: '#FF8E00', border: '1px solid rgba(255,142,0,0.3)' }}
          >
            <PawPrint size={12} /> Accepting Early Access
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-xl"
        >
          Revolutionising <br />
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, #FF8E00, #FD7702)' }}>
            Pet Care.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
        >
          India's first at-home, subscription-based preventive care ecosystem. Managed healthcare for your pet, for every stage of their life.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* Join Waitlist Button */}
          <Button
            size="lg"
            onClick={onOpenBooking}
            className="text-white border-none px-8 rounded-full flex items-center gap-2 group"
            style={{ background: 'linear-gradient(135deg, #FF8E00, #FD7702)', boxShadow: '0 8px 24px rgba(255,142,0,0.40)' }}
          >
            <span>Join the Waitlist</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Button>

          {/* Stay Updated Button */}
          <a
            href="https://whatsapp.com/channel/0029VbC9jX1CXC3Lhz8rRv3A"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              variant="secondary"
              className="bg-white/10 text-white hover:bg-white/20 border-transparent hover:border-white/30 rounded-full px-8"
            >
              Stay Updated
            </Button>
          </a>
        </motion.div>

        {/* Footer Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex flex-wrap justify-center gap-3 text-sm font-semibold"
        >
          {([
            { icon: <Stethoscope size={14} />, label: 'At-home Diagnostics' },
            { icon: <UserRound size={14} />, label: 'Expert Vets' },
            { icon: <Wallet size={14} />, label: 'No Hidden Costs' },
          ] as { icon: React.ReactNode; label: string }[]).map(({ icon, label }) => (
            <span
              key={label}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-white/90"
              style={{ backgroundColor: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)' }}
            >
              {icon} {label}
            </span>
          ))}
        </motion.div>
      </div>

    </section>
  );
};