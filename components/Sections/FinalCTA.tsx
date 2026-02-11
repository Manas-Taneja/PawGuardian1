import React from 'react';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Mesh Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 via-white to-purple-50 opacity-80" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6"
        >
          Your Pet Can’t Tell You When Something’s Wrong. <span className="text-blue-600">We Can.</span>
        </motion.h2>

        <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-xl text-gray-600 mb-12 leading-relaxed"
        >
          Stop waiting for symptoms. Stop stressing your pet with clinic visits. <br className="hidden md:block" />
          Start caring before it’s urgent.
        </motion.p>

        <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.2 }}
             className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Button size="lg" className="px-10 h-14 text-lg bg-blue-600 hover:bg-blue-700 border-none shadow-blue-500/30">Join the Waitlist</Button>
          <Button size="lg" variant="secondary" className="px-10 h-14 text-lg" icon={<ArrowRight size={20} />}>Get Early Access</Button>
        </motion.div>

        <p className="mt-8 text-sm text-gray-500">Join PawGuardian today and be part of India’s preventive pet-care movement.</p>
      </div>
    </section>
  );
};