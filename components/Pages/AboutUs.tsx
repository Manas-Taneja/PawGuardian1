import React from 'react';
import { motion } from 'framer-motion';
import {
    Heart,
    Target,
    Microscope,
    Users,
    PawPrint,
    Star,
    ArrowRight,
    Stethoscope,
    Shield,
    Zap,
} from 'lucide-react';
import { Button } from '../ui/Button';
import type { Page } from '../../App';

// ─── Data ────────────────────────────────────────────────────────────────────



const values = [
    {
        icon: Heart,
        title: 'Pet-First Philosophy',
        desc: 'Every decision we make starts with one question: is this the best possible outcome for the animal? We never compromise on that.',
        color: '#003F7D',
    },
    {
        icon: Microscope,
        title: 'Science-Backed Care',
        desc: 'Our protocols are grounded in clinical research, diagnostic data, and continuous feedback loops with licensed veterinarians.',
        color: '#003366',
    },
    {
        icon: Shield,
        title: 'Radical Transparency',
        desc: 'No hidden fees, no upsells. We tell pet parents exactly what their pet needs and why — every single time.',
        color: '#FF8E00',
    },
    {
        icon: Zap,
        title: 'Prevention Over Cure',
        desc: 'Catching issues early is cheaper, kinder, and smarter. We make preventive care the default, not the exception.',
        color: '#FD7702',
    },
];



// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.55, ease: 'easeOut' },
    }),
};

// ─── Component ────────────────────────────────────────────────────────────────

interface AboutUsProps {
    navigate: (page: Page) => void;
    onOpenBooking: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ navigate, onOpenBooking }) => {
    return (
        <main className="min-h-screen" style={{ backgroundColor: '#f8f4e8' }}>

            {/* ── Hero ─────────────────────────────────────────────────────── */}
            <section className="relative overflow-hidden py-16 md:py-32 px-6" style={{ backgroundColor: '#f8f4e8' }}>
                {/* Decorative blobs */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-[120px]" style={{ backgroundColor: 'rgba(255,142,0,0.15)' }} />
                    <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full blur-[120px]" style={{ backgroundColor: 'rgba(253,119,2,0.10)' }} />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-2 mb-6"
                    >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#FF8E00' }} />
                        <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#FF8E00' }}>
                            Our Story
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-gray-900"
                    >
                        Built by Pet Lovers,{' '}
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, #FF8E00, #FD7702)' }}>
                            For Pet Lovers.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
                    >
                        PawGuardian was born out of one vet appointment gone too late, one bill
                        that didn't need to exist, and a conviction that India's 30 million pet
                        parents deserve better.
                    </motion.p>
                </div>
            </section>



            {/* ── Mission / Vision ─────────────────────────────────────────── */}
            <section className="py-12 md:py-24 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                    {/* Image side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="relative"
                    >
                        <img
                            src="/founders.jpg"
                            alt="Founders of PawGuardian"
                            className="w-full h-[280px] md:h-[480px] object-cover rounded-3xl shadow-2xl shadow-blue-100"
                        />

                    </motion.div>

                    {/* Text side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="font-semibold tracking-wide uppercase text-sm" style={{ color: '#003F7D' }}>
                            Our Story
                        </span>
                        <h2 className="mt-3 text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
                            Two passionate pet lovers{' '}
                            <span style={{ color: '#003F7D' }}>on a mission.</span>
                        </h2>
                        <p className="mt-6 text-gray-600 text-lg leading-relaxed">
                            We are Atharavaa Khanzode and Aditya Bendi, two third-year students from BITS Pilani. Our journey with PawGuardian began not in a boardroom, but from a profound, shared passion for pets and a harsh reality we couldn't ignore.
                        </p>
                        <p className="mt-4 text-gray-500 leading-relaxed">
                            Time and again, we came across heartbreaking stories of pets passing away simply because their conditions were detected too late. These pets never even got the chance for a fair fight. We realized the system was inherently reactive, forcing pet parents to wait until symptoms became critical. PawGuardian was built to flip this narrative, ensuring every pet gets the early detection and preventive care they truly deserve.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── Values ───────────────────────────────────────────────────── */}
            <section className="py-12 md:py-24 px-6 border-t" style={{ backgroundColor: '#f8f4e8', borderColor: 'rgba(0,35,71,0.08)' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="font-semibold tracking-wide uppercase text-sm" style={{ color: '#003F7D' }}>
                            What Drives Us
                        </span>
                        <h2 className="mt-2 text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
                            Our Core Values
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((v, i) => (
                            <motion.div
                                key={v.title}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                custom={i}
                                viewport={{ once: true }}
                                whileHover={{ y: -6 }}
                                className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm transition-all group"
                                style={{ '--tw-shadow-color': 'rgba(0,35,71,0.08)' } as React.CSSProperties}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = v.color;
                                    const iconDiv = e.currentTarget.querySelector('.icon-bg') as HTMLElement;
                                    if (iconDiv) { iconDiv.style.backgroundColor = 'rgba(255,255,255,0.2)'; iconDiv.style.color = 'white'; }
                                    const title = e.currentTarget.querySelector('h3') as HTMLElement;
                                    if (title) title.style.color = 'white';
                                    const desc = e.currentTarget.querySelector('p') as HTMLElement;
                                    if (desc) desc.style.color = 'rgba(255,255,255,0.9)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'white';
                                    const iconDiv = e.currentTarget.querySelector('.icon-bg') as HTMLElement;
                                    if (iconDiv) { iconDiv.style.backgroundColor = `${v.color}1A`; iconDiv.style.color = v.color; }
                                    const title = e.currentTarget.querySelector('h3') as HTMLElement;
                                    if (title) title.style.color = '#111827';
                                    const desc = e.currentTarget.querySelector('p') as HTMLElement;
                                    if (desc) desc.style.color = '#6B7280';
                                }}
                            >
                                <div
                                    className="icon-bg w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all group-hover:scale-110"
                                    style={{ color: v.color, backgroundColor: `${v.color}1A` }}
                                >
                                    <v.icon size={26} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2 transition-colors">{v.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed transition-colors">{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>



            {/* ── CTA ──────────────────────────────────────────────────────── */}
            <section className="py-12 md:py-24 px-6" style={{ backgroundColor: '#ffffff' }}>
                <div className="max-w-2xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 border" style={{ backgroundColor: 'rgba(0,35,71,0.05)', borderColor: 'rgba(0,35,71,0.1)' }}>
                        <Stethoscope size={14} style={{ color: '#003F7D' }} />
                        <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: '#003F7D' }}>
                            Join the movement
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                        Give Your Pet the{' '}
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, #FF8E00, #FD7702)' }}>
                            Healthcare They Deserve
                        </span>
                    </h2>
                    <p className="text-gray-600 text-lg mb-10">
                        Join thousands of pet parents building a healthier future for their
                        companions — one subscription at a time.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="text-white border-none shadow-lg rounded-full px-8 flex items-center gap-2 group"
                            style={{ backgroundColor: '#FF8E00', boxShadow: '0 8px 24px rgba(255,142,0,0.40)' }}
                            onClick={onOpenBooking}
                        >
                            <Users size={18} />
                            <span>Join the Waitlist</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="bg-white/10 text-gray-900 hover:bg-gray-50 border-gray-200 hover:border-gray-300 backdrop-blur-sm rounded-full px-8"
                            onClick={() => navigate('services')}
                        >
                            View Our Plans
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
};
