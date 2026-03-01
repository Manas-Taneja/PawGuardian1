import React from 'react';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import { ArrowRight, PawPrint, Stethoscope, UserRound, Wallet } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {/* Animated Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/animated_hero_bg.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-slate-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
        {/* Decorative paw print — bottom left */}
        <div className="absolute bottom-8 left-8 opacity-10 pointer-events-none select-none z-0">
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
          className="flex items-center justify-center gap-2 mb-10"
        >
          <span
            className="flex items-center gap-2 text-xs font-light tracking-[0.2em] uppercase px-5 py-2"
            style={{ color: '#ffffff', borderBottom: '1px solid rgba(255,255,255,0.3)' }}
          >
            Accepting Early Access
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-light tracking-[0.15em] uppercase mb-8 drop-shadow-xl"
        >
          Revolutionising <br />
          <span className="font-semibold" style={{ color: '#fff' }}>
            Pet Care.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base md:text-lg text-gray-300 max-w-xl mx-auto mb-12 leading-[2] font-light tracking-wide"
        >
          India's first at-home, subscription-based preventive care ecosystem. Managed healthcare for your pet, for every stage of their life.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          {/* Join Waitlist Button */}
          <Button
            size="lg"
            onClick={onOpenBooking}
            className="text-white bg-transparent border border-white hover:bg-white/10 px-8 py-6 rounded-none flex items-center gap-4 transition-all duration-300 uppercase tracking-[0.15em] text-xs font-medium group"
          >
            <span>Join the Waitlist</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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
              className="text-white/70 bg-transparent hover:text-white px-8 py-6 rounded-none flex items-center transition-all duration-300 uppercase tracking-[0.15em] text-xs font-light"
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
          className="mt-20 flex flex-wrap justify-center gap-10 text-[10px] sm:text-xs font-light tracking-[0.2em] uppercase"
        >
          {([
            { label: 'At-home Diagnostics' },
            { label: 'Expert Vets' },
            { label: 'No Hidden Costs' },
          ] as { label: string }[]).map(({ label }) => (
            <span
              key={label}
              className="text-white/60 hover:text-white transition-colors"
            >
              {label}
            </span>
          ))}
        </motion.div>
      </div>

    </section>
  );
};