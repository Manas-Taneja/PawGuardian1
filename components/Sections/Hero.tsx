import React from 'react';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
            src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=2070&auto=format&fit=crop" 
            alt="Veterinarian with Cat" 
            className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        
        {/* Early Access Label */}
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-8"
        >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-200">Accepting Early Access</span>
        </motion.div>

        {/* Heading */}
        <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-xl"
        >
          Revolutionising <br/> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
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
                className="bg-black text-white hover:bg-gray-900 border-none px-8 rounded-full shadow-lg flex items-center gap-2 group" 
             >
                <span>Join the Waitlist</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
             </Button>

             {/* How it works Button */}
             <Button 
                size="lg" 
                variant="secondary"
                className="bg-white/10 text-white hover:bg-white/20 border-transparent hover:border-white/30 backdrop-blur-sm rounded-full px-8"
             >
                How it works
             </Button>
        </motion.div>

        {/* Footer Features */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex flex-wrap justify-center gap-6 md:gap-12 text-sm font-medium text-gray-300"
        >
            <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-gray-300" />
                <span>At-home Diagnostics</span>
            </div>
            <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-gray-300" />
                <span>Expert Vets</span>
            </div>
            <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-gray-300" />
                <span>No Hidden Costs</span>
            </div>
        </motion.div>
      </div>

      {/* Removed Health Optimized Widget */}
    </section>
  );
};