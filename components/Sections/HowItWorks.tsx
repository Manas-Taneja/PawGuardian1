import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Truck, Smartphone, PiggyBank } from 'lucide-react';

const pillars = [
  {
    icon: Layers,
    title: "Smart Subscription",
    desc: "Personalised plans with regular diagnostics, baseline tracking, and AI-assisted health insights.",
    color: "text-blue-600 bg-blue-50"
  },
  {
    icon: Truck,
    title: "Doorstep Veterinary Care",
    desc: "At-home sample collection, vaccinations, and tele-consults based on real test results.",
    color: "text-purple-600 bg-purple-50"
  },
  {
    icon: Smartphone,
    title: "Digital Health Platform",
    desc: "All records, reminders, reports, and vet guidance—accessible in one place.",
    color: "text-blue-600 bg-blue-50"
  },
  {
    icon: PiggyBank,
    title: "Affordable by Design",
    desc: "Early intervention means fewer emergencies, no transport costs, and lower lifetime spend.",
    color: "text-green-600 bg-green-50"
  }
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-white/80 border-t border-gray-100 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm">The 4-Pillar Model</span>
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
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-100/50 transition-all group"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${pillar.color} group-hover:scale-110 transition-transform`}>
                <pillar.icon size={28} strokeWidth={1.5} />
              </div>
              <div className="mb-4 text-3xl font-black text-gray-100 absolute top-4 right-6 pointer-events-none select-none group-hover:text-gray-50 transition-colors">
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