import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import type { Page } from '../../App';

const dogPlans = [
    {
        title: "Puppy Care",
        range: "0–1.5 years",
        features: ["Core vaccinations", "Deworming schedule", "Socialisation guidance", "Nutritional counselling"]
    },
    {
        title: "Adult Dog",
        range: "2–7 years",
        features: ["Annual blood panels", "Parasite prevention", "Booster vaccines", "Mobility & joint checks"]
    },
    {
        title: "Senior Dog",
        range: "7+ years",
        features: ["Advanced bloodwork", "Cardiac & renal screening", "Arthritis management", "Cognitive health monitoring"]
    }
];

const catPlans = [
    {
        title: "Kitten Care",
        range: "0–1.5 years",
        features: ["FVRCP & Rabies vaccines", "Deworming", "Spay / neuter guidance", "Microchipping"]
    },
    {
        title: "Adult Cat",
        range: "2–7 years",
        features: ["Annual wellness exams", "Dental health checks", "Parasite prevention", "Weight management"]
    },
    {
        title: "Senior Cat",
        range: "7+ years",
        features: ["Renal & liver monitoring", "Thyroid screening", "Cancer markers", "Pain & comfort assessment"]
    }
];

interface PlansProps {
  navigate: (page: Page) => void;
}

export const Plans: React.FC<PlansProps> = ({ navigate }) => {
    return (
        <section id="plans" className="py-0 bg-white relative">
            <div className="grid md:grid-cols-2 min-h-[800px]">
                {/* Dog Section */}
                <div className="relative overflow-hidden group">
                    {/* Background Image / Color */}
                    <div className="absolute inset-0 z-0 transition-colors duration-500" style={{ backgroundColor: 'rgba(255,159,127,0.06)' }} />

                    <div className="relative z-10 p-12 md:p-24 flex flex-col h-full justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-6xl md:text-8xl font-black tracking-tighter absolute top-10 left-10 select-none" style={{ color: 'rgba(255,159,127,0.5)' }}>DOG</h2>
                            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 relative z-10">
                                For <span style={{ color: '#FF9F7F' }}>Dogs</span>
                            </h3>
                            <p className="text-lg text-gray-600 mb-8 max-w-md">Comprehensive care plans tailored for canine physiology and lifestyle needs.</p>

                            <div className="space-y-6">
                                {dogPlans.map((plan, i) => (
                                    <div
                                        key={i}
                                        className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm transition-shadow"
                                        style={{ border: '1px solid rgba(255,159,127,0.25)' }}
                                        onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = '#FF9F7F'; }}
                                        onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,159,127,0.25)'; }}
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-bold text-gray-900">{plan.title}</h4>
                                            <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ backgroundColor: 'rgba(255,159,127,0.18)', color: '#b85a30' }}>{plan.range}</span>
                                        </div>
                                        <p className="text-sm text-gray-500">{plan.features.join(", ")}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8">
                                <Button className="text-white border-none shadow-lg" style={{ backgroundColor: '#6272E8', boxShadow: '0 4px 14px rgba(98,114,232,0.35)' }} onClick={() => navigate('services')}>View Dog Plans</Button>
                            </div>
                        </motion.div>
                    </div>
                    <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1974&auto=format&fit=crop" alt="Dog" loading="lazy" className="absolute bottom-0 right-0 w-2/3 h-2/3 object-cover object-center opacity-30 mix-blend-multiply pointer-events-none" />
                </div>

                {/* Cat Section */}
                <div className="relative overflow-hidden group border-l border-gray-100">
                    {/* Background Image / Color */}
                    <div className="absolute inset-0 z-0 transition-colors duration-500" style={{ backgroundColor: 'rgba(196,181,253,0.06)' }} />

                    <div className="relative z-10 p-12 md:p-24 flex flex-col h-full justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-6xl md:text-8xl font-black tracking-tighter absolute top-10 right-10 select-none" style={{ color: 'rgba(196,181,253,0.5)' }}>CAT</h2>
                            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 relative z-10">
                                For <span style={{ color: '#C4B5FD' }}>Cats</span>
                            </h3>
                            <p className="text-lg text-gray-600 mb-8 max-w-md">Stress-free, at-home care specifically designed for sensitive felines.</p>

                            <div className="space-y-6">
                                {catPlans.map((plan, i) => (
                                    <div
                                        key={i}
                                        className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm transition-shadow"
                                        style={{ border: '1px solid rgba(196,181,253,0.3)' }}
                                        onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = '#C4B5FD'; }}
                                        onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(196,181,253,0.3)'; }}
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-bold text-gray-900">{plan.title}</h4>
                                            <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ backgroundColor: 'rgba(196,181,253,0.20)', color: '#6B21A8' }}>{plan.range}</span>
                                        </div>
                                        <p className="text-sm text-gray-500">{plan.features.join(", ")}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8">
                                <Button className="text-white border-none shadow-lg" style={{ backgroundColor: '#6272E8', boxShadow: '0 4px 14px rgba(98,114,232,0.35)' }} onClick={() => navigate('services')}>View Cat Plans</Button>
                            </div>
                        </motion.div>
                    </div>
                    <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop" alt="Cat" loading="lazy" className="absolute bottom-0 right-0 w-2/3 h-2/3 object-cover object-center opacity-30 mix-blend-multiply pointer-events-none" />
                </div>
            </div>

            {/* Unified Banner */}
            <div className="mt-12 py-4 text-center text-white text-sm font-medium relative z-20" style={{ backgroundColor: '#282239' }}>
                All plans include at-home care + digital records + expert consultations.
            </div>
        </section>
    );
};
