import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Home, Smartphone, Video, ShieldCheck } from 'lucide-react';
import { Card } from '../ui/Card';

const roadmapSteps = [
    {
        title: "The Smart Subscription",
        subtitle: "Onboarding & Foundation",
        desc: "Join our ecosystem with personalised plans. We start with at-home vaccinations, deworming, and setting your pet's healthy baseline.",
        icon: Layers,
        color: "#FF8E00",
        bg: "rgba(255,142,0,0.12)"
    },
    {
        title: "Doorstep Veterinary Care",
        subtitle: "Annual Proactive Exams",
        desc: "Complete physical exams and diagnostic sample collection right in your living room. Catching issues early for a longer, healthier life.",
        icon: Home,
        color: "#003F7D",
        bg: "rgba(0,63,125,0.12)"
    },
    {
        title: "Digital Health Platform",
        subtitle: "Always-on Insights",
        desc: "All health records, reminders, and AI-assisted insights in one place. Seamlessly tied to your pet's ongoing care plan.",
        icon: Smartphone,
        color: "#FD7702",
        bg: "rgba(253,119,2,0.12)"
    },
    {
        title: "Integrated Teleconsult",
        subtitle: "Guidance on Demand",
        desc: "Review diagnostic results with expert vets via video. Multiple opinions without the stress of multiple clinic visits.",
        icon: Video,
        color: "#003366",
        bg: "rgba(0,51,102,0.12)"
    },
    {
        title: "Predictable Healthcare",
        subtitle: "Lower Lifetime Spend",
        desc: "Early intervention lowers lifetime spend. Plus, enjoy transparent, partnered pricing for surgeries.",
        icon: ShieldCheck,
        color: "#FF5003",
        bg: "rgba(255,80,3,0.12)"
    }
];

export const Timeline: React.FC = () => {
    return (
        <section className="py-12 md:py-24 relative overflow-hidden" style={{ backgroundColor: '#f8f4e8' }}>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-12 md:mb-20 max-w-3xl mx-auto">
                    <span
                        className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4"
                        style={{ backgroundColor: '#FD7702', color: '#fff' }}
                    >
                        THE PAWGUARDIAN JOURNEY
                    </span>
                    <h2 className="text-2xl sm:text-4xl md:text-6xl font-black tracking-tight text-gray-900 mb-6 leading-tight">
                        A Complete Preventive Care <span className="text-[#003F7D]">Ecosystem</span>
                    </h2>
                    <p className="text-xl text-gray-500">
                        Follow the path from reactive panic to consistent, loving, proactive at-home care.
                    </p>
                </div>

                <div className="relative max-w-5xl mx-auto pb-10">
                    {/* Wavy Path SVG (Desktop) */}
                    <div className="hidden md:block absolute top-[40px] bottom-[40px] left-1/2 -ml-[2px] w-[4px] z-0 overflow-visible">
                        <svg className="absolute left-[-50px] top-0 w-[100px] h-full" preserveAspectRatio="none">
                            <path
                                d="M 50 0 C 150 150, -50 250, 50 400 C 150 550, -50 650, 50 800 C 150 950, -50 1050, 50 1200 C 150 1350, -50 1450, 50 1600"
                                stroke="rgba(255,142,0,0.3)"
                                strokeWidth="4"
                                strokeDasharray="8 8"
                                fill="none"
                                vectorEffect="non-scaling-stroke"
                            />
                        </svg>
                    </div>

                    {/* Straight Path (Mobile) */}
                    <div className="md:hidden absolute top-[24px] bottom-[24px] left-[32px] w-[2px] bg-orange-200/50 z-0" />

                    <div className="space-y-16 md:space-y-0 relative z-10">
                        {roadmapSteps.map((step, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <div key={index} className={`relative w-full flex flex-col md:flex-row items-center md:min-h-[220px] ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                                    {/* Mobile Node */}
                                    <div className="md:hidden absolute left-[12px] top-[14px]">
                                        <div
                                            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md shadow-orange-500/20"
                                            style={{ backgroundColor: step.color }}
                                        >
                                            {index + 1}
                                        </div>
                                    </div>

                                    {/* Desktop Content Left/Right */}
                                    <div className={`w-full md:w-5/12 pl-16 pr-4 md:px-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'} flex flex-col justify-center`}>
                                        <motion.div
                                            initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <Card className="hover:-translate-y-2 transition-transform duration-300 relative border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden group">
                                                {/* Decorative background glow */}
                                                <div className="absolute inset-0 bg-gradient-to-tr opacity-0 transition-opacity duration-300 group-hover:opacity-10 pointer-events-none" style={{ backgroundImage: `linear-gradient(to top right, ${step.color}, transparent)` }} />

                                                <div className={`flex flex-col md:flex-row gap-5 items-start ${isEven ? 'md:flex-row-reverse' : ''}`}>
                                                    <div
                                                        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                                                        style={{ backgroundColor: step.bg, color: step.color }}
                                                    >
                                                        <step.icon size={28} />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: step.color }}>{step.subtitle}</h4>
                                                        <h3 className="text-xl font-black text-gray-900 mb-3">{step.title}</h3>
                                                        <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                                                    </div>
                                                </div>
                                            </Card>
                                        </motion.div>
                                    </div>

                                    {/* Desktop Node Center */}
                                    <div className="hidden md:flex w-2/12 justify-center relative z-20">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-black shadow-xl shadow-orange-500/30 border-4 border-[#f8f4e8] relative"
                                            style={{ backgroundColor: step.color }}
                                        >
                                            {index + 1}
                                            {/* Pulse effect rings */}
                                            <div className="absolute inset-0 rounded-full border-2 border-orange-400 opacity-20 animate-ping" />
                                        </motion.div>
                                    </div>

                                    {/* Empty Spacer */}
                                    <div className="hidden md:block w-full md:w-5/12" />

                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
