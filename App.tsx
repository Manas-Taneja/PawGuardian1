import React from 'react';
import { Navbar } from './components/Layout/Navbar';
import { Footer } from './components/Layout/Footer';
import { Hero } from './components/Sections/Hero';
import { ValueProp } from './components/Sections/ValueProp';
import { HowItWorks } from './components/Sections/HowItWorks';
import { Plans } from './components/Sections/Plans';
import { FinalCTA } from './components/Sections/FinalCTA';
import { motion } from 'framer-motion';

function App() {
  return (
    <div className="bg-white min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900 relative">
      {/* Global Animated Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
         <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [-100, 100, -100],
              y: [-50, 50, -50]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-[800px] h-[800px] bg-sky-200/30 rounded-full blur-[100px] mix-blend-multiply"
         />
         <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
              x: [100, -100, 100],
              y: [50, -50, 50]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-[100px] mix-blend-multiply"
         />
      </div>

      <div className="relative z-10">
        <Navbar />
        
        <main>
          <Hero />
          <ValueProp />
          <HowItWorks />
          <Plans />
          <FinalCTA />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;