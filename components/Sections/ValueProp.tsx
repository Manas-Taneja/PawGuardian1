import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Home, Wallet, Activity, PawPrint, TrendingDown } from 'lucide-react';
import { Card } from '../ui/Card';

const CostComparison = () => {
    return (
        <div className="mt-6">
            <div className="flex items-end justify-center gap-12 py-4">
                {/* Reactive Cost */}
                <div className="flex flex-col items-center gap-3">
                    <span className="font-bold text-red-500 text-4xl">₹4.5L</span>
                    <div className="h-1.5 w-16 bg-red-100 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-400">Late Treatment</span>
                </div>

                {/* Preventive Cost */}
                <div className="flex flex-col items-center gap-3 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs px-3 py-1 rounded-full font-bold shadow-sm"
                        style={{ backgroundColor: '#FFE66D', color: '#7a5c00', border: '1px solid rgba(255,230,109,0.6)' }}
                    >
                        <TrendingDown size={12} className="inline mr-1" /> Save 73%
                    </motion.div>
                    <span className="font-bold text-4xl" style={{ color: '#1e3470' }}>₹1.2L</span>
                    <div className="h-1.5 w-16 rounded-full shadow-lg" style={{ backgroundColor: '#6272E8', boxShadow: '0 4px 8px rgba(98,114,232,0.30)' }}></div>
                    <span className="text-sm font-bold text-gray-900">PawGuardian</span>
                </div>
            </div>

            {/* Purple Info Box */}
            <div className="mt-8 p-5 bg-purple-50 rounded-2xl flex items-start gap-4 border border-purple-100">
                <div className="bg-white p-1.5 rounded-full text-purple-600 shrink-0 shadow-sm border border-purple-100">
                    <AlertCircle size={18} />
                </div>
                <p className="text-sm text-purple-900 leading-relaxed font-medium">
                    <PawPrint size={14} className="inline mr-1 text-purple-500" /> Pets instinctively hide pain. <span className="font-bold text-purple-700">68% mask symptoms</span>, making early detection through data vital.
                </p>
            </div>
        </div>
    );
};

export const ValueProp: React.FC = () => {
    return (
        <section id="value" className="py-24 relative" style={{ backgroundColor: '#f8f4e8' }}>
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
                        <span style={{ color: '#1e3470' }} className="font-semibold">They delay because the system makes it hard.</span>
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

                        <CostComparison />
                    </motion.div>

                    {/* Right Column: The Solution */}
                    <div className="space-y-8">
                        <div className="border-l-4 pl-6" style={{ borderColor: '#1e3470' }}>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">From Reactive to Proactive</h3>
                            <p className="text-gray-600">PawGuardian flips the model. We move from reactive clinic visits to proactive, at-home, continuous care.</p>
                        </div>

                        <div className="grid gap-5">
                            <Card className="hover:border-[#FF6B9D]/40 transition-all duration-300 group">
                                <div className="flex items-start gap-4">
                                    <div
                                        className="p-3 rounded-xl transition-colors"
                                        style={{ backgroundColor: 'rgba(98,114,232,0.10)', color: '#6272E8' }}
                                        onMouseEnter={(e) => { const d = e.currentTarget; d.style.backgroundColor = '#6272E8'; d.style.color = 'white'; }}
                                        onMouseLeave={(e) => { const d = e.currentTarget; d.style.backgroundColor = 'rgba(98,114,232,0.10)'; d.style.color = '#6272E8'; }}
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

                            <Card className="hover:border-[#4ECDC4]/40 transition-all duration-300 group">
                                <div className="flex items-start gap-4">
                                    <div
                                        className="p-3 rounded-xl transition-colors"
                                        style={{ backgroundColor: 'rgba(78,205,196,0.12)', color: '#4ECDC4' }}
                                        onMouseEnter={(e) => { const d = e.currentTarget; d.style.backgroundColor = '#4ECDC4'; d.style.color = 'white'; }}
                                        onMouseLeave={(e) => { const d = e.currentTarget; d.style.backgroundColor = 'rgba(78,205,196,0.12)'; d.style.color = '#4ECDC4'; }}
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

                            <Card className="hover:border-[#FFE66D]/60 transition-all duration-300 group">
                                <div className="flex items-start gap-4">
                                    <div
                                        className="p-3 rounded-xl transition-colors"
                                        style={{ backgroundColor: 'rgba(255,230,109,0.18)', color: '#d4a500' }}
                                        onMouseEnter={(e) => { const d = e.currentTarget; d.style.backgroundColor = '#FFE66D'; d.style.color = '#7a5c00'; }}
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