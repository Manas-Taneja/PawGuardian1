import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Syringe,
    FlaskConical,
    Bug,
    Sparkles,
    Stethoscope,
    Heart,
    ArrowRight,
    CheckCircle2,
    ChevronDown,
    Home,
    Clock,
    ShieldCheck,
    CalendarCheck,
    PawPrint,
} from 'lucide-react';
import { Button } from '../ui/Button';

// ─── Data ──────────────────────────────────────────────────────────────────────

const services = [
    {
        id: 'vaccinations',
        icon: Syringe,
        label: 'Vaccination',
        tagline: 'Core & Lifestyle Shots',
        description:
            'Age-appropriate vaccination schedules for dogs and cats — from Puppyhood Rabies & DHPP to annual boosters — administered by licensed vets at your doorstep.',
        highlight: 'from-[#1e3470] to-[#2a4a98]',
        accent: '#1e3470',
        accentLight: 'rgba(30,52,112,0.08)',
        features: [
            'DHPP, Leptospirosis, Rabies for dogs',
            'FVRCP, FeLV, Rabies for cats',
            'Digital vaccination passport',
            'Reminder alerts before due date',
        ],
    },
    {
        id: 'diagnostics',
        icon: FlaskConical,
        label: 'Diagnostics',
        tagline: 'Lab Tests at Home',
        description:
            'Our trained phlebotomists collect samples at your home. Full blood panels, organ function, infection markers — results delivered digitally within 24 hours.',
        highlight: 'from-[#7c3aed] to-[#a855f7]',
        accent: '#7c3aed',
        accentLight: 'rgba(124,58,237,0.08)',
        features: [
            'CBC + comprehensive metabolic panel',
            'Urinalysis & stool analysis',
            'Thyroid, cardiac & cancer markers',
            'Vet-interpreted results with action plan',
        ],
    },
    {
        id: 'deworming',
        icon: Bug,
        label: 'Deworming & Anti-Parasite',
        tagline: 'Internal & External Cover',
        description:
            "Tailored deworming protocols based on your pet's age, weight, and exposure risk. Plus tick, flea, and mite prevention with vet-recommended products.",
        highlight: 'from-[#d97706] to-[#f59e0b]',
        accent: '#d97706',
        accentLight: 'rgba(217,119,6,0.08)',
        features: [
            'Round, tape & hookworm treatment',
            'Flea & tick prevention doses',
            'Seasonal risk assessments',
            'Weight-adjusted dosing',
        ],
    },
    {
        id: 'dental',
        icon: Sparkles,
        label: 'Dental Care',
        tagline: 'Oral Health Matters',
        description:
            'Dental disease affects over 70% of pets by age 3. Our vets provide thorough oral exams and professional-grade teeth cleaning guidance at home.',
        highlight: 'from-[#0891b2] to-[#06b6d4]',
        accent: '#0891b2',
        accentLight: 'rgba(8,145,178,0.08)',
        features: [
            'Plaque & tartar assessment',
            'Gum disease early detection',
            'At-home brushing protocol',
            'Dental diet recommendations',
        ],
    },
    {
        id: 'grooming',
        icon: Heart,
        label: 'Medicated Grooming',
        tagline: 'Skin, Coat & Comfort',
        description:
            'More than a bath — our vet-supervised grooming targets skin conditions, ear infections, and coat quality. Species-appropriate products, zero stress in familiar surroundings.',
        highlight: 'from-[#be185d] to-[#ec4899]',
        accent: '#be185d',
        accentLight: 'rgba(190,24,93,0.08)',
        features: [
            'Anti-fungal & medicated baths',
            'Ear canal cleaning',
            'Nail trimming & anal gland check',
            'Breed-specific coat care',
        ],
    },
    {
        id: 'consultations',
        icon: Stethoscope,
        label: 'Vet Consultations',
        tagline: 'Expert Advice, Anytime',
        description:
            'In-person home visits and video consultations with our network of 500+ licensed vets. Same-day bookings available for urgent concerns.',
        highlight: 'from-[#065f46] to-[#10b981]',
        accent: '#065f46',
        accentLight: 'rgba(6,95,70,0.08)',
        features: [
            'Home visit by licensed vet',
            'Video consultation within 2 hrs',
            'Prescription management',
            'Chronic condition follow-ups',
        ],
    },
];

const processSteps = [
    {
        icon: CalendarCheck,
        step: '01',
        title: 'Book Online in 60 Seconds',
        desc: 'Pick your service, choose a slot that works for you, and confirm. No phone tag, no waiting.',
    },
    {
        icon: Home,
        step: '02',
        title: 'We Come to Your Door',
        desc: 'A certified vet or trained specialist arrives at your home — fully equipped, always on time.',
    },
    {
        icon: Clock,
        step: '03',
        title: 'Care is Delivered',
        desc: "Treatment happens in your pet's safe space. No stressful clinics, no separation anxiety.",
    },
    {
        icon: ShieldCheck,
        step: '04',
        title: 'Digital Health Record Updated',
        desc: "Every visit, test, and prescription is logged in your pet's PawGuardian health passport.",
    },
];

const faqs = [
    {
        q: 'Are your vets licensed by the Veterinary Council of India?',
        a: 'Yes. Every vet on our platform holds a valid VCI registration. We verify credentials before onboarding and conduct periodic re-verifications.',
    },
    {
        q: 'What cities are you currently operating in?',
        a: 'We currently serve Bengaluru, Mumbai, Delhi NCR, Hyderabad, Pune, and Chennai. We are expanding to 10 more cities by Q3 2025.',
    },
    {
        q: 'Can I book an urgent same-day consultation?',
        a: 'Yes. Same-day home visits are available in Bengaluru and Mumbai. In other cities, we can arrange a video consultation within 2 hours.',
    },
    {
        q: 'What if my pet is not comfortable with the vet?',
        a: "We use Fear Free™ handling techniques. If your pet is very anxious, we can request a vet who specialises in stress-free handling — at no extra charge.",
    },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.09, duration: 0.55, ease: 'easeOut' },
    }),
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const ServiceCard: React.FC<{ service: (typeof services)[0]; index: number }> = ({
    service,
    index,
}) => {
    const Icon = service.icon;
    return (
        <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={index}
            viewport={{ once: true }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="group relative bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-shadow overflow-hidden flex flex-col"
        >
            {/* Top accent strip */}
            <div className={`h-1.5 w-full bg-gradient-to-r ${service.highlight}`} />

            <div className="p-8 flex flex-col flex-1">
                {/* Icon */}
                <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: service.accentLight }}
                >
                    <Icon size={26} strokeWidth={1.6} style={{ color: service.accent }} />
                </div>

                {/* Label + tagline */}
                <p
                    className="text-xs font-bold tracking-[0.18em] uppercase mb-1"
                    style={{ color: service.accent }}
                >
                    {service.tagline}
                </p>
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                    {service.label}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{service.description}</p>

                {/* Feature list */}
                <ul className="space-y-2 mt-auto">
                    {service.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                            <CheckCircle2
                                size={15}
                                strokeWidth={2}
                                className="mt-0.5 shrink-0"
                                style={{ color: service.accent }}
                            />
                            <span>{f}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Bottom CTA */}
            <div className="px-8 pb-8">
                <button
                    className="flex items-center gap-1.5 text-sm font-semibold transition-all group/btn"
                    style={{ color: service.accent }}
                >
                    <span>Book this service</span>
                    <ArrowRight
                        size={14}
                        className="group-hover/btn:translate-x-1 transition-transform"
                    />
                </button>
            </div>
        </motion.div>
    );
};

const FaqItem: React.FC<{ q: string; a: string; index: number }> = ({ q, a, index }) => {
    const [open, setOpen] = useState(false);
    return (
        <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={index}
            viewport={{ once: true }}
            className="border-b last:border-none"
            style={{ borderColor: 'rgba(30,52,112,0.10)' }}
        >
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left bg-transparent border-none cursor-pointer"
            >
                <span className="font-semibold text-gray-900 leading-snug">{q}</span>
                <ChevronDown
                    size={18}
                    className={`shrink-0 text-gray-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                />
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <p className="text-gray-500 text-sm leading-relaxed pb-5">{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

interface ServicesProps {
    onOpenBooking: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenBooking }) => {
    const scrollToPlans = () => {
        document.getElementById('services-plans')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <main className="min-h-screen" style={{ backgroundColor: '#f8f4e8' }}>

            {/* ── Hero ──────────────────────────────────────────────────────── */}
            <section
                className="relative overflow-hidden py-32 px-6"
                style={{ backgroundColor: '#282239' }}
            >
                {/* Decorative blobs */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div
                        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[130px]"
                        style={{ backgroundColor: 'rgba(30,52,112,0.30)' }}
                    />
                    <div
                        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px]"
                        style={{ backgroundColor: 'rgba(124,58,237,0.15)' }}
                    />
                    <div
                        className="absolute -bottom-20 right-1/4 w-[300px] h-[300px] rounded-full blur-[100px]"
                        style={{ backgroundColor: 'rgba(30,52,112,0.20)' }}
                    />
                </div>

                {/* Decorative paw watermark */}
                <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none select-none">
                    <PawPrint size={320} strokeWidth={0.8} className="text-white" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-2 mb-6"
                    >
                        <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: '#a8b8e8' }}
                        />
                        <span
                            className="text-xs font-bold tracking-[0.2em] uppercase"
                            style={{ color: '#a8b4d8' }}
                        >
                            What We Offer
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.05]"
                    >
                        Complete Care,{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{
                                backgroundImage: 'linear-gradient(to right, #a8b8e8, #c8b4f0)',
                            }}
                        >
                            At Your Door.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
                    >
                        From first vaccinations to senior diagnostics — every service your pet needs,
                        delivered by licensed vets in the comfort of your home.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Button
                            size="lg"
                            className="text-white border-none shadow-lg rounded-full px-8 flex items-center gap-2 group"
                            style={{
                                backgroundColor: '#1e3470',
                                boxShadow: '0 8px 24px rgba(30,52,112,0.50)',
                            }}
                            onClick={onOpenBooking}
                        >
                            <CalendarCheck size={18} />
                            <span>Book a Service</span>
                            <ArrowRight
                                size={16}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </Button>
                        <Button
                            size="lg"
                            variant="secondary"
                            className="bg-white/10 text-white hover:bg-white/20 border-white/20 hover:border-white/40 backdrop-blur-sm rounded-full px-8"
                            onClick={scrollToPlans}
                        >
                            View Plans & Pricing
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* ── Service Pills ──────────────────────────────────────────────── */}
            <style>{`.pill-nav::-webkit-scrollbar { display: none; }`}</style>
            <nav className="sticky top-20 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4">
                <div
                    className="pill-nav flex items-center gap-3 overflow-x-auto"
                    style={{ paddingInline: '1.5rem', scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
                >
                    {services.map((s) => (
                        <a
                            key={s.id}
                            href={`#${s.id}`}
                            className="shrink-0 text-sm font-semibold px-5 py-2 rounded-full border transition-all"
                            style={{
                                borderColor: 'rgba(30,52,112,0.20)',
                                color: '#4a4a6a',
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                                    '#1e3470';
                                (e.currentTarget as HTMLAnchorElement).style.color = '#fff';
                                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                                    '#1e3470';
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '';
                                (e.currentTarget as HTMLAnchorElement).style.color = '#4a4a6a';
                                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                                    'rgba(30,52,112,0.20)';
                            }}
                        >
                            {s.label}
                        </a>
                    ))}
                </div>
            </nav>

            {/* ── Services Grid ──────────────────────────────────────────────── */}
            <section id="services-plans" className="py-24 px-6 bg-white" style={{ paddingTop: '5rem' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span
                            className="font-semibold tracking-wide uppercase text-sm"
                            style={{ color: '#1e3470' }}
                        >
                            Our Services
                        </span>
                        <h2 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
                            Everything Under One{' '}
                            <span style={{ color: '#1e3470' }}>Paw</span>
                        </h2>
                        <p className="mt-4 text-gray-500 max-w-xl mx-auto leading-relaxed">
                            Each service is designed around one principle: zero-compromise care
                            without disrupting your pet's safe routine.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, i) => (
                            <div id={service.id} key={service.id} className="scroll-mt-36 h-full">
                                <ServiceCard service={service} index={i} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Trust Banner ──────────────────────────────────────────────── */}
            <section
                className="py-6 px-6 text-white text-sm font-medium"
                style={{ backgroundColor: '#1e3470' }}
            >
                <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-x-10 gap-y-2 text-center">
                    {[
                        '✓ Licensed Vets Only',
                        '✓ Fear-Free Handling',
                        '✓ Digital Health Passport',
                        '✓ Transparent Pricing',
                        '✓ Same-Day Slots Available',
                    ].map((t) => (
                        <span key={t} className="opacity-90 tracking-wide">
                            {t}
                        </span>
                    ))}
                </div>
            </section>

            {/* ── How It Works ──────────────────────────────────────────────── */}
            <section
                className="py-24 px-6"
                style={{ backgroundColor: '#282239' }}
            >
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span
                            className="font-semibold tracking-wide uppercase text-sm"
                            style={{ color: '#a8b4d8' }}
                        >
                            The Process
                        </span>
                        <h2 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight text-white">
                            Booking to Care in{' '}
                            <span
                                className="text-transparent bg-clip-text"
                                style={{
                                    backgroundImage: 'linear-gradient(to right, #a8b8e8, #c8b4f0)',
                                }}
                            >
                                4 Steps
                            </span>
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                        {/* Connecting line — desktop only */}
                        <div
                            className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px"
                            style={{ backgroundColor: 'rgba(168,180,216,0.20)' }}
                        />

                        {processSteps.map((step, i) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={step.step}
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    custom={i}
                                    viewport={{ once: true }}
                                    className="relative text-center"
                                >
                                    {/* Circle */}
                                    <div
                                        className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center relative z-10"
                                        style={{ backgroundColor: 'rgba(30,52,112,0.40)', border: '1px solid rgba(168,180,216,0.20)' }}
                                    >
                                        <Icon size={28} style={{ color: '#a8b8e8' }} strokeWidth={1.5} />
                                    </div>
                                    <div
                                        className="text-xs font-black tracking-[0.2em] uppercase mb-2"
                                        style={{ color: '#a8b4d8' }}
                                    >
                                        Step {step.step}
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-gray-400 leading-relaxed max-w-xs mx-auto">
                                        {step.desc}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── FAQ ───────────────────────────────────────────────────────── */}
            <section className="py-24 px-6" style={{ backgroundColor: '#f8f4e8' }}>
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-14">
                        <span
                            className="font-semibold tracking-wide uppercase text-sm"
                            style={{ color: '#1e3470' }}
                        >
                            Common Questions
                        </span>
                        <h2 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
                            Answered Honestly
                        </h2>
                    </div>

                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm px-8">
                        {faqs.map((faq, i) => (
                            <FaqItem key={faq.q} q={faq.q} a={faq.a} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ───────────────────────────────────────────────────────── */}
            <section
                className="py-24 px-6"
                style={{
                    background:
                        'linear-gradient(135deg, #282239 0%, #1e3470 50%, #282239 100%)',
                }}
            >
                <div className="max-w-2xl mx-auto text-center">
                    <div
                        className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 border"
                        style={{
                            backgroundColor: 'rgba(255,255,255,0.10)',
                            borderColor: 'rgba(255,255,255,0.20)',
                        }}
                    >
                        <PawPrint size={14} className="text-blue-300" />
                        <span
                            className="text-xs font-semibold tracking-wide uppercase"
                            style={{ color: '#c8d4f0' }}
                        >
                            Book Today
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Your Pet's Health{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{
                                backgroundImage: 'linear-gradient(to right, #a8b8e8, #c8b4f0)',
                            }}
                        >
                            Can't Wait.
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-10">
                        Book your first home visit in under 60 seconds. Our vets are ready —
                        same-day slots available in select cities.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="text-white border-none shadow-lg rounded-full px-8 flex items-center gap-2 group"
                            style={{
                                backgroundColor: '#1e3470',
                                boxShadow: '0 8px 24px rgba(30,52,112,0.40)',
                            }}
                            onClick={onOpenBooking}
                        >
                            <CalendarCheck size={18} />
                            <span>Book a Home Visit</span>
                            <ArrowRight
                                size={16}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </Button>
                        <Button
                            size="lg"
                            variant="secondary"
                            className="bg-white/10 text-white hover:bg-white/20 border-white/20 hover:border-white/40 backdrop-blur-sm rounded-full px-8"
                            onClick={scrollToPlans}
                        >
                            Explore Subscription Plans
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
};
