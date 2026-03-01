import React, { useState } from 'react';
import { Navbar } from './components/Layout/Navbar';
import { Footer } from './components/Layout/Footer';
import { Hero } from './components/Sections/Hero';
import { ValueProp } from './components/Sections/ValueProp';
import { HowItWorks } from './components/Sections/HowItWorks';
import { Plans } from './components/Sections/Plans';
import { FinalCTA } from './components/Sections/FinalCTA';
import { AboutUs } from './components/Pages/AboutUs';
import { Services } from './components/Pages/Services';
import { Vets } from './components/Pages/Vets';
import { BookingModal } from './components/ui/BookingModal';
import { motion } from 'framer-motion';

export type Page = 'home' | 'about' | 'services' | 'vets';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);

  const openBooking = () => setIsBookingOpen(true);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans selection:bg-[#1e3470]/20 selection:text-[#1e3470] relative" style={{ backgroundColor: '#f8f4e8' }}>
      {/* Global Animated Background Layer — only shown on home */}
      {currentPage === 'home' && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              x: [-100, 100, -100],
              y: [-50, 50, -50],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full"
            style={{ backgroundColor: 'rgba(30,52,112,0.10)', willChange: 'transform' }}
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              x: [100, -100, 100],
              y: [50, -50, 50],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full"
            style={{ backgroundColor: 'rgba(40,34,57,0.08)', willChange: 'transform' }}
          />
        </div>
      )}

      <div className="relative z-10">
        <Navbar currentPage={currentPage} navigate={navigate} onOpenBooking={openBooking} />

        {currentPage === 'home' ? (
          <main>
            <Hero onOpenBooking={openBooking} />
            <ValueProp />
            <HowItWorks />
            <Plans navigate={navigate} />
            <FinalCTA />
          </main>
        ) : currentPage === 'about' ? (
          <AboutUs navigate={navigate} onOpenBooking={openBooking} />
        ) : currentPage === 'vets' ? (
          <Vets navigate={navigate} />
        ) : (
          <Services onOpenBooking={openBooking} />
        )}

        <Footer />
        <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      </div>
    </div>
  );
}

export default App;