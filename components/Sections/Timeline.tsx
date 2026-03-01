import React from 'react';
import { motion } from 'framer-motion';
import { Syringe, Stethoscope, Video, HeartPulse } from 'lucide-react';

const steps = [
    {
        icon: Syringe,
        title: "1) Complete Vaccination Plan",
        desc: "At-home vet administered vaccinations to onboard pet parents onto the subscription plan and get a first-hand experience with the added convenience. Includes Booster Vaccination, Deworming & Tick/Flea Treatment.",
    },
    {
        icon: Stethoscope,
        title: "2) Annual At-Home Vet Visits",
        desc: "Annual visits with a focus on early detection to address the 72% survival rate gap in conditions like kidney disease. Includes Complete Physical Examination & Sample Collection for Diagnostics.",
    },
    {
        icon: Video,
        title: "3) Integrated Teleconsultation",
        desc: "Seamless integration of at-home diagnostics with scheduled vet teleconsultations for expert review. Eliminate unnecessary clinic visits with General Query and Diagnostic Review teleconsults.",
    },
    {
        icon: HeartPulse,
        title: "4) Predictable Surgery Costs",
        desc: "Transparent pricing for common surgeries (spaying, neutering, dental extractions) through partnered vets. Know the costs upfront, plan financially with confidence, and benefit from lower-than-market rates.",
    }
];

export const Timeline: React.FC = () => {
    return (
        <section className="py-24" style={{ backgroundColor: '#f8f4e8' }}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                        Product & Strategy
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        A seamless journey blending at-home convenience with continuous, proactive care.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[60px] left-10 right-10 h-1" style={{ backgroundColor: 'rgba(0,63,125,0.1)' }} />

                    <div className="grid lg:grid-cols-4 gap-12 lg:gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className="relative"
                            >
                                {/* Node */}
                                <div
                                    className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 relative z-10 shadow-xl transition-transform hover:scale-110"
                                    style={{ backgroundColor: '#003F7D' }}
                                >
                                    <step.icon size={32} style={{ color: '#FF8E00' }} />

                                    {/* Step Number Badge */}
                                    <div
                                        className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-md"
                                        style={{ backgroundColor: '#FD7702' }}
                                    >
                                        {index + 1}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
