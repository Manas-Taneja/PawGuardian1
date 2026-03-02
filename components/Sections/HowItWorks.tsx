import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Truck, Smartphone, PiggyBank, Sparkles } from 'lucide-react';

const pillars = [
  {
    icon: Layers,
    title: "Smart Subscription",
    desc: "Personalised plans with regular diagnostics, baseline tracking, and AI-assisted health insights.",
    iconStyle: { backgroundColor: 'rgba(255,142,0,0.12)', color: '#FF8E00' },
    ghostColor: 'rgba(255,142,0,0.15)',
  },
  {
    icon: Truck,
    title: "Doorstep Veterinary Care",
    desc: "At-home sample collection, vaccinations, and tele-consults based on real test results.",
    iconStyle: { backgroundColor: 'rgba(0,51,102,0.12)', color: '#003366' },
    ghostColor: 'rgba(78,205,196,0.15)',
  },
  {
    icon: Smartphone,
    title: "Digital Health Platform",
    desc: "All records, reminders, reports, and vet guidance—accessible in one place.",
    iconStyle: { backgroundColor: 'rgba(255,142,0,0.12)', color: '#FF8E00' },
    ghostColor: 'rgba(255,159,127,0.15)',
  },
  {
    icon: PiggyBank,
    title: "Affordable by Design",
    desc: "Early intervention means fewer emergencies, no transport costs, and lower lifetime spend.",
    iconStyle: { backgroundColor: 'rgba(196,181,253,0.20)', color: '#9B6DFF' },
    ghostColor: 'rgba(196,181,253,0.15)',
  }
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 border-t" style={{ backgroundColor: '#f8f4e8', borderColor: 'rgba(0,35,71,0.10)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span
            className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-2"
            style={{ backgroundColor: '#FD7702', color: '#7a5c00' }}
          >
            <Sparkles size={12} className="inline mr-1" /> The 4-Pillar Model
          </span>
          <h2 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
            A Complete Preventive Care Ecosystem
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden"
              style={{ '--tw-shadow-color': 'rgba(0,35,71,0.08)' } as React.CSSProperties}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                style={pillar.iconStyle}
              >
                <pillar.icon size={28} strokeWidth={1.5} />
              </div>
              <div
                className="text-7xl font-black absolute -top-2 -right-1 pointer-events-none select-none leading-none"
                style={{ color: pillar.ghostColor }}
              >
                {index + 1}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{pillar.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};