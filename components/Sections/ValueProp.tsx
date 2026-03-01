import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Home, Wallet, Activity, PawPrint, TrendingDown } from 'lucide-react';
import { Card } from '../ui/Card';

const MaskedSymptomsCard = () => {
    return (
        <div className="mt-6 space-y-4">
            <div className="bg-[#003F7D] p-6 rounded-2xl text-white shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                    <div className="bg-white/10 p-2 rounded-xl text-[#FF8E00] shrink-0">
                        <AlertCircle size={24} />
                    </div>
                    <h4 className="text-xl font-bold">More than 6 out of 10 pets instinctively hide their symptoms.</h4>
                </div>
                <p className="text-[#a8b4d8] text-sm leading-relaxed mb-6 font-medium">
                    By the time you notice they are sick, the condition has often progressed significantly.
                </p>
                <div className="bg-[#182a5c] p-4 rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                        <span className="block text-xs font-bold text-[#a8b4d8] uppercase tracking-wider mb-1">Early Detection</span>
                        <span className="text-[#003366] font-bold text-lg">Costs &lt; ⅓</span>
                    </div>
                    <div className="h-8 w-px bg-white/10 mx-4"></div>
                    <div className="text-right">
                        <span className="block text-xs font-bold text-[#a8b4d8] uppercase tracking-wider mb-1">Late Treatment</span>
                        <span className="text-[#FD7702] font-bold text-lg">3x More Expensive</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ValueProp: React.FC = () => {
    return (
        <section id="value" className="py-24 relative" style={{ backgroundColor: '#f0fdf4' }}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6"
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

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Column: The Cost Card - Adjusted sizing */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/50 h-fit w-full max-w-lg mx-auto lg:mx-0"
                    >
                        <div className="flex items-start justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">The Cost of Waiting</h3>
                                <p className="text-sm text-gray-500 mt-1">Avg. lifetime medical expenses</p>
                            </div>
                            <div className="bg-purple-50 p-2.5 rounded-xl text-purple-500">
                                <Activity size={24} />
                            </div>
                        </div>

                        <MaskedSymptomsCard />
                    </motion.div>

                    {/* Right Column: The Solution */}
                    <div className="space-y-8">
                        <div className="border-l-4 pl-6" style={{ borderColor: '#003F7D' }}>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">From Reactive to Proactive</h3>
                            <p className="text-gray-600">PawGuardian flips the model. We move from reactive clinic visits to proactive, at-home, continuous care.</p>
                        </div>

                        <div className="grid gap-5">
                            <Card className="hover:border-[#FD7702]/40 transition-all duration-300 group">
                                <div className="flex items-start gap-4">
                                    <div
                                        className="p-3 rounded-xl transition-colors"
                                        style={{ backgroundColor: '#DBEAFE', color: '#003F7D' }}
                                        onMouseEnter={(e) => { const d = e.currentTarget; d.style.backgroundColor = '#003F7D'; d.style.color = 'white'; }}
                                        onMouseLeave={(e) => { const d = e.currentTarget; d.style.backgroundColor = '#DBEAFE'; d.style.color = '#003F7D'; }}
                                    >
                                        <AlertCircle size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900">Early Detection, Not Late Panic</h4>
                                        <div className="overflow-hidden transition-all duration-300 max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-1">
                                            <p className="text-gray-600 text-sm">Regular at-home diagnostics establish baselines and catch issues before they become life-threatening.</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card className="hover:border-[#003366]/40 transition-all duration-300 group">
                                <div className="flex items-start gap-4">
                                    <div
                                        className="p-3 rounded-xl transition-colors"
                                        style={{ backgroundColor: 'rgba(78,205,196,0.12)', color: '#003366' }}
                                        onMouseEnter={(e) => { const d = e.currentTarget; d.style.backgroundColor = '#003366'; d.style.color = 'white'; }}
                                        onMouseLeave={(e) => { const d = e.currentTarget; d.style.backgroundColor = 'rgba(78,205,196,0.12)'; d.style.color = '#003366'; }}
                                    >
                                        <Home size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900">Care Without the Clinic Stress</h4>
                                        <div className="overflow-hidden transition-all duration-300 max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-1">
                                            <p className="text-gray-600 text-sm">No travel. No anxious pets. No waiting rooms. We collect samples, vaccinate, and consult—right at home.</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card className="hover:border-[#FF5003]/60 transition-all duration-300 group">
                                <div className="flex items-start gap-4">
                                    <div
                                        className="p-3 rounded-xl transition-colors"
                                        style={{ backgroundColor: 'rgba(255,230,109,0.18)', color: '#d4a500' }}
                                        onMouseEnter={(e) => { const d = e.currentTarget; d.style.backgroundColor = '#FF5003'; d.style.color = '#7a5c00'; }}
                                        onMouseLeave={(e) => { const d = e.currentTarget; d.style.backgroundColor = 'rgba(255,230,109,0.18)'; d.style.color = '#d4a500'; }}
                                    >
                                        <Wallet size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900">Predictable, Affordable Healthcare</h4>
                                        <div className="overflow-hidden transition-all duration-300 max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-1">
                                            <p className="text-gray-600 text-sm">Subscription pricing replaces surprise bills, emergency expenses, and last-minute decisions.</p>
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