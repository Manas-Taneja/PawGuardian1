import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

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

export const Plans: React.FC = () => {
    return (
        <section id="plans" className="py-0 bg-white relative">
            <div className="grid md:grid-cols-2 min-h-[800px]">
                {/* Dog Section */}
                <div className="relative overflow-hidden group">
                    {/* Background Image / Color */}
                    <div className="absolute inset-0 bg-orange-50/50 z-0 transition-colors duration-500 group-hover:bg-orange-100/50" />

                    <div className="relative z-10 p-12 md:p-24 flex flex-col h-full justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-orange-200 absolute top-10 left-10 select-none opacity-50">DOG</h2>
                            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 relative z-10">
                                For <span className="text-orange-500">Dogs</span>
                            </h3>
                            <p className="text-lg text-gray-600 mb-8 max-w-md">Comprehensive care plans tailored for canine physiology and lifestyle needs.</p>

                            <div className="space-y-6">
                                {dogPlans.map((plan, i) => (
                                    <div key={i} className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-orange-100 hover:border-orange-300 transition-colors shadow-sm">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-bold text-gray-900">{plan.title}</h4>
                                            <span className="text-xs font-semibold bg-orange-100 text-orange-700 px-2 py-1 rounded-full">{plan.range}</span>
                                        </div>
                                        <p className="text-sm text-gray-500">{plan.features.join(", ")}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8">
                                <Button className="bg-orange-500 hover:bg-orange-600 text-white border-none shadow-orange-200 shadow-lg">View Dog Plans</Button>
                            </div>
                        </motion.div>
                    </div>
                    <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1974&auto=format&fit=crop" alt="Dog" className="absolute bottom-0 right-0 w-2/3 h-2/3 object-cover object-center opacity-30 mix-blend-multiply pointer-events-none" />
                </div>

                {/* Cat Section */}
                <div className="relative overflow-hidden group border-l border-gray-100">
                    {/* Background Image / Color */}
                    <div className="absolute inset-0 bg-blue-50/50 z-0 transition-colors duration-500 group-hover:bg-blue-100/50" />

                    <div className="relative z-10 p-12 md:p-24 flex flex-col h-full justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-blue-200 absolute top-10 right-10 select-none opacity-50">CAT</h2>
                            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 relative z-10">
                                For <span className="text-blue-500">Cats</span>
                            </h3>
                            <p className="text-lg text-gray-600 mb-8 max-w-md">Stress-free, at-home care specifically designed for sensitive felines.</p>

                            <div className="space-y-6">
                                {catPlans.map((plan, i) => (
                                    <div key={i} className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-blue-100 hover:border-blue-300 transition-colors shadow-sm">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-bold text-gray-900">{plan.title}</h4>
                                            <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{plan.range}</span>
                                        </div>
                                        <p className="text-sm text-gray-500">{plan.features.join(", ")}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8">
                                <Button className="bg-blue-500 hover:bg-blue-600 text-white border-none shadow-blue-200 shadow-lg">View Cat Plans</Button>
                            </div>
                        </motion.div>
                    </div>
                    <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop" alt="Cat" className="absolute bottom-0 right-0 w-2/3 h-2/3 object-cover object-center opacity-30 mix-blend-multiply pointer-events-none" />
                </div>
            </div>

            {/* Unified Banner */}
            <div className="py-4 text-center text-white text-sm font-medium relative z-20" style={{ backgroundColor: '#282239' }}>
                All plans include at-home care + digital records + expert consultations.
            </div>
        </section>
    );
};