import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import type { Page } from '../../App';

interface FinalCTAProps {
  onOpenBooking: () => void;
  navigate: (page: Page) => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenBooking, navigate }) => {
  return (
    <section className="py-32 relative overflow-hidden" style={{ backgroundColor: '#f8f4e8' }}>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[80px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(98,114,232,0.12) 0%, rgba(123,147,240,0.08) 50%, transparent 80%)' }}
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        {/* Decorative paw divider */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {['#6272E8', '#7B93F0', '#6272E8', '#7B93F0', '#6272E8'].map((color, i) => (
            <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.7 }}>
              <ellipse cx="12" cy="16" rx="5" ry="5.5" />
              <circle cx="7" cy="9" r="2.5" />
              <circle cx="11" cy="6" r="2.5" />
              <circle cx="15" cy="7" r="2.5" />
              <circle cx="18" cy="10" r="2" />
            </svg>
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6"
        >
          Your Pet Can&apos;t Tell You When Something&apos;s Wrong.{' '}
          <span>
            <span style={{ color: '#1e3470' }}>We Can</span>
            <span style={{ color: '#6272E8' }}>.</span>
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 mb-10 leading-relaxed"
        >
          Stop waiting for symptoms. Stop stressing your pet with clinic visits.{' '}
          <br className="hidden md:block" />
          Start caring before it&apos;s urgent.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            className="text-white border-none shadow-lg"
            style={{ backgroundColor: '#6272E8', boxShadow: '0 4px 14px rgba(98,114,232,0.35)' }}
            onClick={onOpenBooking}
          >
            Join the Waitlist
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('services')}
          >
            View Plans
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
