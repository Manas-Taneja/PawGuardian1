import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import type { Page } from '../../App';
import { HeartPulse, Activity, ShieldCheck } from 'lucide-react';

const stages = [
    {
        title: "Young Pet",
        subtitle: "The Foundation",
        desc: "Build a strong immune system and establish healthy baselines.",
        features: ["Core vaccinations & boosters", "Deworming schedules", "Spay/neuter guidance", "Nutritional counselling"],
        icon: ShieldCheck,
        color: '#FF8E00'
    },
    {
        title: "Adult Pet",
        subtitle: "Maintenance & Prevention",
        desc: "Keep them active, healthy, and catch minor issues early.",
        features: ["Annual comprehensive panels", "Dental health monitoring", "Parasite prevention", "Weight management"],
        icon: Activity,
        color: '#FD7702'
    },
    {
        title: "Senior Pet",
        subtitle: "Monitoring & Comfort",
        desc: "Ensure quality of life with proactive chronic disease management.",
        features: ["Advanced organ screening", "Mobility & arthritis care", "Pain management", "Cognitive monitoring"],
        icon: HeartPulse,
        color: '#FF5003'
    }
];

interface PlansProps {
    navigate: (page: Page) => void;
}

export const Plans: React.FC<PlansProps> = ({ navigate }) => {
    return (
        <section id="plans" className="py-24 relative overflow-hidden" style={{ backgroundColor: '#002347' }}>
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#003366] rounded-full blur-[120px] opacity-50" />
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#003F7D] rounded-full blur-[100px] opacity-30" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6"
                    >
                        One Subscription. Every Life Stage.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-300 max-w-2xl mx-auto"
                    >
                        Whether they're taking their first steps or enjoying their golden years, our proactive care scales with your pet's exact needs.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {stages.map((stage, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15 }}
                            viewport={{ once: true }}
                            className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-white/30 transition-all flex flex-col h-full group"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="p-4 rounded-2xl bg-white/10" style={{ color: stage.color }}>
                                    <stage.icon size={32} />
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-1">{stage.title}</h3>
                            <h4 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: stage.color }}>
                                {stage.subtitle}
                            </h4>
                            <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                                {stage.desc}
                            </p>

                            <ul className="space-y-3 mb-8">
                                {stage.features.map((feature, j) => (
                                    <li key={j} className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ backgroundColor: stage.color }} />
                                        <span className="text-gray-300 text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Button
                        size="lg"
                        className="text-white border-none shadow-lg px-12"
                        style={{ backgroundColor: '#FF8E00', boxShadow: '0 4px 14px rgba(255,142,0,0.35)' }}
                        onClick={() => navigate('services')}
                    >
                        View Detailed Plans
                    </Button>
                </div>
            </div>
        </section>
    );
};

