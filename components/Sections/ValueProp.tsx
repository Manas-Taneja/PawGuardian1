import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Home, Wallet, Activity, ChevronDown } from 'lucide-react';
import { Card } from '../ui/Card';

const MaskedSymptomsCard = () => {
    return (
        <div className="mt-6 space-y-4">
            <div className="bg-white p-6 rounded-2xl text-gray-900 shadow-xl" style={{ border: '1px solid rgba(0,35,71,0.08)' }}>
                <div className="flex items-start gap-4 mb-4">
                    <div className="bg-[#FF8E00]/10 p-2 rounded-xl text-[#FF8E00] shrink-0">
                        <AlertCircle size={24} />
                    </div>
                    <h4 className="text-xl font-bold text-[#003F7D]">More than 6 out of 10 pets instinctively hide their symptoms.</h4>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 font-medium">
                    By the time you notice they are sick, the condition has often progressed significantly.
                </p>
                <div className="bg-[#f8f4e8] p-4 rounded-xl border border-orange-100 text-center">
                    <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Cost of Waiting</span>
                    <span className="text-[#FD7702] font-bold text-lg">Late treatment can be 3x more expensive</span>
                </div>
            </div>
        </div>
    );
};

export const ValueProp: React.FC = () => {
    return (
        <section id="value" className="py-12 md:py-24 relative" style={{ backgroundColor: '#f8f4e8' }}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6"
                    >
                        Why Smart Pet Parents Choose Us
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-500 max-w-2xl mx-auto"
                    >
                        Most pet parents don't delay care because they don't care. <br />
                        <span style={{ color: '#003F7D' }} className="font-semibold">They delay because the system makes it hard.</span>
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
                    {/* Left Column: The Cost Card - Adjusted sizing */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full max-w-lg mx-auto lg:mx-0"
                    >
                        <MaskedSymptomsCard />
                    </motion.div>

                    {/* Right Column: The Solution */}
                    <div className="space-y-8">
                        <div className="border-l-4 pl-6" style={{ borderColor: '#003F7D' }}>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">From Reactive to Proactive</h3>
                            <p className="text-gray-600">PawGuardian flips the model. We move from reactive clinic visits to proactive, at-home, continuous care.</p>
                        </div>

                        <div className="grid gap-5">
                            <Card className="bg-white border transition-all duration-300 group hover:shadow-lg" style={{ borderColor: 'rgba(0,35,71,0.08)' }}>
                                <div className="flex items-start gap-4 p-5">
                                    <div
                                        className="p-3 rounded-xl transition-colors shrink-0"
                                        style={{ backgroundColor: 'rgba(255,142,0,0.15)', color: '#FF8E00' }}
                                    >
                                        <AlertCircle size={24} />
                                    </div>
                                    <div className="flex-1 mt-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-[#003F7D]">Early Detection, Not Late Panic</h4>
                                            <ChevronDown size={20} className="text-gray-400 hidden md:block group-hover:text-[#FF8E00] group-hover:rotate-180 transition-all duration-300" />
                                        </div>
                                        <div className="overflow-hidden transition-all duration-500 max-h-32 opacity-100 mt-3 md:max-h-0 md:opacity-0 md:mt-0 md:group-hover:max-h-32 md:group-hover:opacity-100 md:group-hover:mt-3">
                                            <p className="text-gray-600 text-sm leading-relaxed">Regular at-home diagnostics establish baselines and catch issues before they become life-threatening.</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card className="bg-white border transition-all duration-300 group hover:shadow-lg" style={{ borderColor: 'rgba(0,35,71,0.08)' }}>
                                <div className="flex items-start gap-4 p-5">
                                    <div
                                        className="p-3 rounded-xl transition-colors shrink-0"
                                        style={{ backgroundColor: 'rgba(255,142,0,0.15)', color: '#FF8E00' }}
                                    >
                                        <Home size={24} />
                                    </div>
                                    <div className="flex-1 mt-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-[#003F7D]">Care Without the Clinic Stress</h4>
                                            <ChevronDown size={20} className="text-gray-400 hidden md:block group-hover:text-[#FF8E00] group-hover:rotate-180 transition-all duration-300" />
                                        </div>
                                        <div className="overflow-hidden transition-all duration-500 max-h-32 opacity-100 mt-3 md:max-h-0 md:opacity-0 md:mt-0 md:group-hover:max-h-32 md:group-hover:opacity-100 md:group-hover:mt-3">
                                            <p className="text-gray-600 text-sm leading-relaxed">No travel. No anxious pets. No waiting rooms. We collect samples, vaccinate, and consult—right at home.</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card className="bg-white border transition-all duration-300 group hover:shadow-lg" style={{ borderColor: 'rgba(0,35,71,0.08)' }}>
                                <div className="flex items-start gap-4 p-5">
                                    <div
                                        className="p-3 rounded-xl transition-colors shrink-0"
                                        style={{ backgroundColor: 'rgba(255,142,0,0.15)', color: '#FF8E00' }}
                                    >
                                        <Wallet size={24} />
                                    </div>
                                    <div className="flex-1 mt-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-[#003F7D]">Predictable, Affordable Healthcare</h4>
                                            <ChevronDown size={20} className="text-gray-400 hidden md:block group-hover:text-[#FF8E00] group-hover:rotate-180 transition-all duration-300" />
                                        </div>
                                        <div className="overflow-hidden transition-all duration-500 max-h-32 opacity-100 mt-3 md:max-h-0 md:opacity-0 md:mt-0 md:group-hover:max-h-32 md:group-hover:opacity-100 md:group-hover:mt-3">
                                            <p className="text-gray-600 text-sm leading-relaxed">Subscription pricing replaces surprise bills, emergency expenses, and last-minute decisions.</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};