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

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
    { value: '10K+', label: 'Happy Pets' },
    { value: '500+', label: 'Expert Vets' },
    { value: '25+', label: 'Cities Covered' },
    { value: '98%', label: 'Satisfaction Rate' },
];

const values = [
    {
        icon: Heart,
        title: 'Pet-First Philosophy',
        desc: 'Every decision we make starts with one question: is this the best possible outcome for the animal? We never compromise on that.',
        color: 'text-rose-500 bg-rose-50',
    },
    {
        icon: Microscope,
        title: 'Science-Backed Care',
        desc: 'Our protocols are grounded in clinical research, diagnostic data, and continuous feedback loops with licensed veterinarians.',
        color: 'text-blue-600 bg-blue-50',
    },
    {
        icon: Shield,
        title: 'Radical Transparency',
        desc: 'No hidden fees, no upsells. We tell pet parents exactly what their pet needs and why — every single time.',
        color: 'text-purple-600 bg-purple-50',
    },
    {
        icon: Zap,
        title: 'Prevention Over Cure',
        desc: 'Catching issues early is cheaper, kinder, and smarter. We make preventive care the default, not the exception.',
        color: 'text-amber-500 bg-amber-50',
    },
];

const team = [
    {
        name: 'Dr. Priya Sharma',
        role: 'Co-Founder & Chief Veterinary Officer',
        bio: 'BVSc & AH from GADVASU, 12 years of clinical practice. Former head of small animal medicine at a leading Delhi hospital.',
        avatar: 'PS',
        color: 'from-blue-500 to-purple-500',
    },
    {
        name: 'Arjun Mehta',
        role: 'Co-Founder & CEO',
        bio: 'Ex-product lead at a Series B healthcare startup. Dog dad to two Beagles. Obsessed with fixing broken systems.',
        avatar: 'AM',
        color: 'from-sky-400 to-blue-600',
    },
    {
        name: 'Dr. Kavya Nair',
        role: 'Head of Diagnostics',
        bio: 'Specialises in veterinary pathology with a focus on early disease markers. Trained in the UK and returned to build for India.',
        avatar: 'KN',
        color: 'from-purple-500 to-pink-500',
    },
    {
        name: 'Rohan Verma',
        role: 'Head of Operations',
        bio: 'Built last-mile logistics for two healthcare companies. Ensuring our doorstep promise is never broken.',
        avatar: 'RV',
        color: 'from-teal-400 to-cyan-600',
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

export const AboutUs: React.FC = () => {
    return (
        <main className="min-h-screen" style={{ backgroundColor: '#f8f4e8' }}>

            {/* ── Hero ─────────────────────────────────────────────────────── */}
            <section className="relative overflow-hidden py-32 px-6" style={{ backgroundColor: '#282239' }}>
                {/* Decorative blobs */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-[120px]" style={{ backgroundColor: 'rgba(30,52,112,0.28)' }} />
                    <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full blur-[120px]" style={{ backgroundColor: 'rgba(40,34,57,0.40)' }} />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-2 mb-6"
                    >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#a8b8e8' }} />
                        <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#a8b4d8' }}>
                            Our Story
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
                    >
                        Built by Pet Lovers,{' '}
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, #a8b8e8, #c8b4f0)' }}>
                            For Pet Lovers.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
                    >
                        PawGuardian was born out of one vet appointment gone too late, one bill
                        that didn't need to exist, and a conviction that India's 30 million pet
                        owners deserve better.
                    </motion.p>
                </div>
            </section>

            {/* ── Stats strip ──────────────────────────────────────────────── */}
            <section className="border-b py-12 bg-white" style={{ borderColor: 'rgba(30,52,112,0.10)' }}>
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((s, i) => (
                        <motion.div
                            key={s.label}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            custom={i}
                            viewport={{ once: true }}
                        >
                            <p className="text-4xl md:text-5xl font-black tracking-tight text-gray-900">
                                {s.value}
                            </p>
                            <p className="mt-1 text-sm font-medium text-gray-500">{s.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── Mission / Vision ─────────────────────────────────────────── */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    {/* Image side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="relative"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=1470&auto=format&fit=crop"
                            alt="Vet examining a dog"
                            className="w-full h-[480px] object-cover rounded-3xl shadow-2xl shadow-blue-100"
                        />
                        {/* Floating badge */}
                        <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl px-6 py-4 flex items-center gap-3 border border-gray-100">
                            <div className="text-white p-2 rounded-xl" style={{ backgroundColor: '#1e3470' }}>
                                <PawPrint size={22} />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 text-sm">Founded 2024</p>
                                <p className="text-xs text-gray-500">Bengaluru, India</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Text side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="font-semibold tracking-wide uppercase text-sm" style={{ color: '#1e3470' }}>
                            Our Mission
                        </span>
                        <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
                            Making Preventive Care{' '}
                            <span style={{ color: '#1e3470' }}>the Norm</span>, Not the Exception.
                        </h2>
                        <p className="mt-6 text-gray-600 text-lg leading-relaxed">
                            Most Indian pet parents only visit a vet when something is visibly
                            wrong. By then, the window for easy intervention has often closed.
                            We're changing that default — one subscription at a time.
                        </p>
                        <p className="mt-4 text-gray-500 leading-relaxed">
                            PawGuardian combines diagnostic science, doorstep delivery, and a
                            digital health record into a single, affordable plan. Think of it
                            as a health passport for your pet — building a longitudinal picture
                            that helps our vets spot trouble before it becomes trauma.
                        </p>
                        <div className="mt-8 flex items-center gap-3">
                            <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(30,52,112,0.08)' }}>
                                <Target size={22} style={{ color: '#1e3470' }} />
                            </div>
                            <p className="text-sm font-semibold text-gray-700">
                                Vision: Zero preventable pet deaths in India by 2030.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Values ───────────────────────────────────────────────────── */}
            <section className="py-24 px-6 border-t" style={{ backgroundColor: '#f8f4e8', borderColor: 'rgba(30,52,112,0.08)' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="font-semibold tracking-wide uppercase text-sm" style={{ color: '#1e3470' }}>
                            What Drives Us
                        </span>
                        <h2 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
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
                                className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all group"
                                style={{ '--tw-shadow-color': 'rgba(30,52,112,0.08)' } as React.CSSProperties}
                            >
                                <div
                                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${v.color} group-hover:scale-110 transition-transform`}
                                >
                                    <v.icon size={26} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{v.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Team ─────────────────────────────────────────────────────── */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="font-semibold tracking-wide uppercase text-sm" style={{ color: '#1e3470' }}>
                            The Humans Behind the Paws
                        </span>
                        <h2 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
                            Meet the Team
                        </h2>
                        <p className="mt-4 text-gray-500 max-w-xl mx-auto">
                            Vets, technologists, and logistics obsessives united by one shared conviction.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, i) => (
                            <motion.div
                                key={member.name}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                custom={i}
                                viewport={{ once: true }}
                                whileHover={{ y: -6 }}
                                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden"
                            >
                                {/* Avatar */}
                                <div className={`h-36 bg-gradient-to-br ${member.color} flex items-center justify-center`}>
                                    <span className="text-4xl font-black text-white/90">
                                        {member.avatar}
                                    </span>
                                </div>
                                <div className="p-6">
                                    <p className="font-bold text-gray-900 text-base">{member.name}</p>
                                    <p className="text-xs font-semibold mt-0.5 mb-3" style={{ color: '#1e3470' }}>
                                        {member.role}
                                    </p>
                                    <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Press / Trust bar ────────────────────────────────────────── */}
            <section className="py-16 px-6 text-white" style={{ backgroundColor: '#282239' }}>
                <div className="max-w-5xl mx-auto">
                    <p className="text-center text-xs font-bold tracking-[0.2em] uppercase text-slate-400 mb-10">
                        Trusted & Featured In
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-10">
                        {['YourStory', 'Inc42', 'The Hindu', 'BW Disrupt', 'Mint'].map(
                            (brand) => (
                                <span
                                    key={brand}
                                    className="text-lg font-black tracking-tight text-slate-400 hover:text-white transition-colors cursor-default"
                                >
                                    {brand}
                                </span>
                            )
                        )}
                    </div>
                </div>
            </section>

            {/* ── Testimonial ──────────────────────────────────────────────── */}
            <section className="py-24 px-6" style={{ backgroundColor: '#f8f4e8' }}>
                <div className="max-w-3xl mx-auto text-center">
                    <div className="flex justify-center gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={20} className="text-amber-400 fill-amber-400" />
                        ))}
                    </div>
                    <blockquote className="text-2xl md:text-3xl font-semibold text-gray-900 leading-snug mb-6">
                        "PawGuardian caught my dog's early-stage kidney issue during a routine
                        diagnostic visit. A year later, he's thriving. I shudder to think what
                        might have happened otherwise."
                    </blockquote>
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                            SA
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-gray-900 text-sm">Sneha Agarwal</p>
                            <p className="text-gray-500 text-xs">Mumbai — Golden Retriever parent</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA ──────────────────────────────────────────────────────── */}
            <section className="py-24 px-6" style={{ background: 'linear-gradient(135deg, #282239 0%, #1e3470 50%, #282239 100%)' }}>
                <div className="max-w-2xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 border" style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.20)' }}>
                        <Stethoscope size={14} className="text-blue-300" />
                        <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: '#c8d4f0' }}>
                            Join the movement
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Give Your Pet the{' '}
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, #a8b8e8, #c8b4f0)' }}>
                            Healthcare They Deserve
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-10">
                        Join thousands of pet parents building a healthier future for their
                        companions — one subscription at a time.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="text-white border-none shadow-lg rounded-full px-8 flex items-center gap-2 group"
                            style={{ backgroundColor: '#1e3470', boxShadow: '0 8px 24px rgba(30,52,112,0.40)' }}
                        >
                            <Users size={18} />
                            <span>Join the Waitlist</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button
                            size="lg"
                            variant="secondary"
                            className="bg-white/10 text-white hover:bg-white/20 border-white/20 hover:border-white/40 backdrop-blur-sm rounded-full px-8"
                        >
                            View Our Plans
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
};
