import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Video, ShieldCheck } from 'lucide-react';
import { Card } from '../ui/Card';

export const Empathy: React.FC = () => {
    return (
        <section className="py-12 md:py-24 relative overflow-hidden" style={{ backgroundColor: '#f8f4e8' }}>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">

                    {/* Left text */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6"
                        >
                            We Feel You.<br />
                            <span style={{ color: '#FF8E00' }}>And We Feel Them, Too.</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-gray-600 leading-relaxed mb-8"
                        >
                            Clinic anxiety isn't just "in your head." Did you know that more than <strong className="text-gray-900">40% of cats</strong> develop long-term carrier phobia after just 3 vet visits?
                            <br /><br />
                            We know the panic of trying to get a scared cat into a carrier or dragging an anxious dog through clinic doors. That's why we bring the care to your living room.
                        </motion.p>

                        <div className="flex flex-col gap-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(255,142,0,0.15)', color: '#FF8E00' }}>
                                    <Video size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-lg">Instant Tele-Consults</h4>
                                    <p className="text-gray-600 text-sm">Multiple vet opinions at your fingertips. No need to load up the car for a second opinion.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(255,142,0,0.15)', color: '#FF8E00' }}>
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-lg">Breed-Specific Experts</h4>
                                    <p className="text-gray-600 text-sm">Access specialized vets who understand the exact quirks and risks of your specific breed.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Stat Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#FF8E00] to-[#FD7702] rounded-3xl blur-[80px] opacity-10 -z-10" />

                        <Card className="bg-white border p-10 rounded-3xl text-center shadow-xl" style={{ borderColor: 'rgba(0,35,71,0.08)' }}>
                            <HeartPulse size={48} style={{ color: '#FF8E00' }} className="mx-auto mb-6" />
                            <h3 className="text-4xl sm:text-6xl font-black mb-4" style={{ color: '#FF8E00' }}>40%</h3>
                            <p className="text-xl font-bold text-gray-900 uppercase tracking-widest mb-2">Of Cats Develop</p>
                            <p className="text-gray-600">Carrier phobia & lasting anxiety after just three standard clinic visits.</p>

                            <hr className="border-gray-200 my-8" />

                            <p className="text-gray-900 font-bold">Keep their safe space safe. Let the vet come to you.</p>
                        </Card>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
