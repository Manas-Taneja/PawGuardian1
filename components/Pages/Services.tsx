import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Syringe,
    Stethoscope,
    Video,
    HeartPulse,
    ShieldCheck,
    Dog,
    Cat,
    Activity,
    FlaskConical,
    Bug,
    Sparkles,
    Heart,
    ArrowRight,
    CheckCircle2,
    ChevronDown,
    Home,
    Clock,
    CalendarCheck,
    PawPrint
} from 'lucide-react';
import { Button } from '../ui/Button';

// ─── Data ──────────────────────────────────────────────────────────────────────

const dogPlans = [
    {
        title: "Young Pet",
        features: ["Core vaccinations", "Deworming schedule", "Socialisation guidance", "Nutritional counselling"]
    },
    {
        title: "Adult Dog",
        features: ["Annual blood panels", "Parasite prevention", "Booster vaccines", "Mobility & joint checks"]
    },
    {
        title: "Senior Dog",
        features: ["Advanced bloodwork", "Cardiac & renal screening", "Arthritis management", "Cognitive health monitoring"]
    }
];

const catPlans = [
    {
        title: "Young Pet",
        features: ["FVRCP & Rabies vaccines", "Deworming", "Spay / neuter guidance", "Microchipping"]
    },
    {
        title: "Adult Cat",
        features: ["Annual wellness exams", "Dental health checks", "Parasite prevention", "Weight management"]
    },
    {
        title: "Senior Cat",
        features: ["Renal & liver monitoring", "Thyroid screening", "Pain & comfort assessment"]
    }
];

const services = [
    {
        id: 'vaccinations',
        icon: Syringe,
        label: 'Vaccination',
        tagline: 'Core & Lifestyle Shots',
        description:
            'Age-appropriate vaccination schedules for dogs and cats — from Puppyhood Rabies & DHPP to annual boosters — administered by licensed vets at your doorstep.',
        highlight: 'from-[#003F7D] to-[#003F7D]',
        accent: '#003F7D',
        accentLight: 'rgba(0,35,71,0.08)',
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
        highlight: 'from-[#003366] to-[#003366]',
        accent: '#003366',
        accentLight: 'rgba(0,51,102,0.08)',
        features: [
            'CBC + comprehensive metabolic panel',
            'Urinalysis & stool analysis',
            'Thyroid & cardiac markers',
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
        highlight: 'from-[#FF8E00] to-[#FF8E00]',
        accent: '#FF8E00',
        accentLight: 'rgba(255,142,0,0.08)',
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
        highlight: 'from-[#FD7702] to-[#FD7702]',
        accent: '#FD7702',
        accentLight: 'rgba(253,119,2,0.08)',
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
        highlight: 'from-[#FF5003] to-[#FF5003]',
        accent: '#FF5003',
        accentLight: 'rgba(234,88,12,0.08)',
        features: [
            'Anti-fungal & medicated baths',
            'Ear canal cleaning',
            'Nail trimming',
            'Breed-specific coat care',
        ],
    },
    {
        id: 'consultations',
        icon: Stethoscope,
        label: 'Vet Consultations',
        tagline: 'Expert Advice, Anytime',
        description:
            'In-person home visits and video consultations with our network of 500+ licensed vets.',
        highlight: 'from-[#002347] to-[#002347]',
        accent: '#002347',
        accentLight: 'rgba(0,35,71,0.08)',
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
        a: 'launching in Goa soon',
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
            className="group relative bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all overflow-hidden flex flex-col duration-300"
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = service.accent;
                e.currentTarget.style.borderColor = service.accent;
                const iconDiv = e.currentTarget.querySelector('.icon-bg') as HTMLElement;
                if (iconDiv) { iconDiv.style.backgroundColor = 'rgba(255,255,255,0.2)'; iconDiv.style.color = 'white'; }
                const title = e.currentTarget.querySelector('h3') as HTMLElement;
                if (title) title.style.color = 'white';
                const desc = e.currentTarget.querySelector('.desc-text') as HTMLElement;
                if (desc) desc.style.color = 'rgba(255,255,255,0.9)';
                const tagline = e.currentTarget.querySelector('.tagline-text') as HTMLElement;
                if (tagline) tagline.style.color = 'rgba(255,255,255,0.9)';
                const features = e.currentTarget.querySelectorAll('.feature-text');
                features.forEach(f => (f as HTMLElement).style.color = 'rgba(255,255,255,0.9)');
                const featureIcons = e.currentTarget.querySelectorAll('.feature-icon');
                featureIcons.forEach(f => (f as HTMLElement).style.color = 'white');
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.borderColor = '#f3f4f6';
                const iconDiv = e.currentTarget.querySelector('.icon-bg') as HTMLElement;
                if (iconDiv) { iconDiv.style.backgroundColor = 'rgba(0,63,125,0.08)'; iconDiv.style.color = '#003F7D'; }
                const title = e.currentTarget.querySelector('h3') as HTMLElement;
                if (title) title.style.color = '#111827';
                const desc = e.currentTarget.querySelector('.desc-text') as HTMLElement;
                if (desc) desc.style.color = '#6B7280';
                const tagline = e.currentTarget.querySelector('.tagline-text') as HTMLElement;
                if (tagline) tagline.style.color = '#003F7D';
                const features = e.currentTarget.querySelectorAll('.feature-text');
                features.forEach(f => (f as HTMLElement).style.color = '#4B5563');
                const featureIcons = e.currentTarget.querySelectorAll('.feature-icon');
                featureIcons.forEach(f => (f as HTMLElement).style.color = '#003F7D');
            }}
        >
            <div className="p-8 flex flex-col flex-1 relative z-10 transition-colors duration-300">
                {/* Icon */}
                <div
                    className="icon-bg w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-300"
                    style={{ backgroundColor: 'rgba(0,63,125,0.08)', color: '#003F7D' }}
                >
                    <Icon size={26} strokeWidth={1.6} />
                </div>

                {/* Label + tagline */}
                <p
                    className="tagline-text text-xs font-bold tracking-[0.18em] uppercase mb-1 transition-colors duration-300"
                    style={{ color: '#003F7D' }}
                >
                    {service.tagline}
                </p>
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight transition-colors duration-300">
                    {service.label}
                </h3>
                <p className="desc-text text-gray-500 text-sm leading-relaxed mb-6 transition-colors duration-300">{service.description}</p>

                {/* Feature list */}
                <ul className="space-y-2 mt-auto">
                    {service.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm">
                            <CheckCircle2
                                size={15}
                                strokeWidth={2}
                                className="feature-icon mt-0.5 shrink-0 transition-colors duration-300"
                                style={{ color: '#003F7D' }}
                            />
                            <span className="feature-text text-gray-600 transition-colors duration-300">{f}</span>
                        </li>
                    ))}
                </ul>
            </div>

        </motion.div>
    );
};

const FaqItem: React.FC<{ q: string; a: string; index: number }> = ({ q, a, index }) => {
    const [open, setOpen] = React.useState(false);
    return (
        <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={index}
            viewport={{ once: true }}
            className="border-b last:border-none"
            style={{ borderColor: 'rgba(0,35,71,0.10)' }}
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

class ServicesErrorBoundary extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }
    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        this.setState({ errorInfo });
    }
    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '40px', background: '#ffebee', color: '#c62828', minHeight: '100vh', fontFamily: 'monospace' }}>
                    <h1>Application Error in Services Component</h1>
                    <h2 style={{ fontSize: '20px' }}>{this.state.error?.toString()}</h2>
                    <pre style={{ overflowX: 'auto', background: '#fff', padding: '20px', marginTop: '20px' }}>
                        {this.state.errorInfo?.componentStack}
                    </pre>
                </div>
            );
        }
        return this.props.children;
    }
}

export const Services: React.FC<ServicesProps> = ({ onOpenBooking }) => {
    return (
        <ServicesErrorBoundary>
            <ServicesContent onOpenBooking={onOpenBooking} />
        </ServicesErrorBoundary>
    );
};

const ServicesContent: React.FC<ServicesProps> = ({ onOpenBooking }) => {
    const scrollToPlans = () => {
        document.getElementById('services-plans')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <main className="min-h-screen" style={{ backgroundColor: '#f8f4e8' }}>
            {/* ── Hero ──────────────────────────────────────────────────────── */}
            <section
                className="relative overflow-hidden pt-12 pb-32 px-6"
                style={{ backgroundColor: '#002347' }}
            >
                {/* Decorative blobs */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div
                        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[130px]"
                        style={{ backgroundColor: 'rgba(0,35,71,0.30)' }}
                    />
                    <div
                        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px]"
                        style={{ backgroundColor: 'rgba(255,142,0,0.15)' }}
                    />
                    <div
                        className="absolute -bottom-20 right-1/4 w-[300px] h-[300px] rounded-full blur-[100px]"
                        style={{ backgroundColor: 'rgba(0,35,71,0.20)' }}
                    />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 pt-4">
                    <div className="text-center mb-20 max-w-3xl mx-auto mt-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight"
                        >
                            Our <span style={{ color: '#FF8E00' }}>Services</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-gray-300 leading-relaxed"
                        >
                            Complete, proactive healthcare delivered right to your living room.
                            Choose our autopilot subscription or book individual services as needed.
                        </motion.p>
                    </div>

                    {/* NEW SECTION: Subscriptions */}
                    <div className="mb-32">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
                                Subscription Plans (Auto-Pilot)
                            </h2>
                            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                                The ultimate peace of mind. All one-time services below are included in these comprehensive life-stage plans.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                            {/* Dog Subscriptions */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-white p-8 md:p-12 rounded-3xl border shadow-xl"
                                style={{ borderColor: 'rgba(0,63,125,0.1)' }}
                            >
                                <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <Dog size={32} style={{ color: '#FF8E00' }} />
                                    For Dogs
                                </h3>
                                <div className="space-y-6">
                                    {dogPlans.map((plan, i) => (
                                        <div
                                            key={i}
                                            className="bg-gray-50 p-6 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-md"
                                            style={{ borderColor: 'rgba(0,63,125,0.05)' }}
                                            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = '#FF8E00'; }}
                                            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,63,125,0.05)'; }}
                                        >
                                            <div className="flex justify-between items-center mb-3">
                                                <h4 className="font-bold text-gray-900 text-lg">{plan.title}</h4>
                                            </div>
                                            <ul className="space-y-2">
                                                {plan.features.map((feature, j) => (
                                                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                                                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#003F7D' }} />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8">
                                    <Button
                                        className="w-full text-white border-none shadow-lg py-4 text-lg hidden md:block"
                                        style={{ backgroundColor: '#003F7D', boxShadow: '0 8px 24px rgba(0,63,125,0.25)' }}
                                        onClick={onOpenBooking}
                                    >
                                        Enroll Your Dog
                                    </Button>
                                </div>
                            </motion.div>

                            {/* Cat Subscriptions */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-white p-8 md:p-12 rounded-3xl border shadow-xl"
                                style={{ borderColor: 'rgba(0,63,125,0.1)' }}
                            >
                                <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <Cat size={32} style={{ color: '#FD7702' }} />
                                    For Cats
                                </h3>
                                <div className="space-y-6">
                                    {catPlans.map((plan, i) => (
                                        <div
                                            key={i}
                                            className="bg-gray-50 p-6 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-md"
                                            style={{ borderColor: 'rgba(0,63,125,0.05)' }}
                                            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = '#FD7702'; }}
                                            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,63,125,0.05)'; }}
                                        >
                                            <div className="flex justify-between items-center mb-3">
                                                <h4 className="font-bold text-gray-900 text-lg">{plan.title}</h4>
                                            </div>
                                            <ul className="space-y-2">
                                                {plan.features.map((feature, j) => (
                                                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                                                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#003F7D' }} />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8">
                                    <Button
                                        className="w-full text-white border-none shadow-lg py-4 text-lg hidden md:flex items-center justify-center gap-2"
                                        style={{ backgroundColor: '#003F7D', boxShadow: '0 8px 24px rgba(0,63,125,0.25)' }}
                                        onClick={onOpenBooking}
                                    >
                                        Enroll Your Cat
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Service Pills ──────────────────────────────────────────────── */}
            <style>{`.pill-nav::-webkit-scrollbar { display: none; }`}</style>
            <nav className="sticky top-20 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4">
                <div
                    className="pill-nav flex items-center justify-center gap-3 overflow-x-auto"
                    style={{ paddingInline: '1.5rem', scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
                >
                    {services.map((s) => (
                        <a
                            key={s.id}
                            href={`#${s.id}`}
                            className="shrink-0 text-sm font-semibold px-5 py-2 rounded-full border transition-all"
                            style={{
                                borderColor: 'rgba(0,35,71,0.20)',
                                color: '#4a4a6a',
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                                    '#003F7D';
                                (e.currentTarget as HTMLAnchorElement).style.color = '#fff';
                                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                                    '#003F7D';
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '';
                                (e.currentTarget as HTMLAnchorElement).style.color = '#4a4a6a';
                                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                                    'rgba(0,35,71,0.20)';
                            }}
                        >
                            {s.label}
                        </a>
                    ))}
                </div>
            </nav>

            {/* ── Services Grid (One-Time Services) ──────────────────────────────────────────────── */}
            <section id="services-plans" className="py-24 px-6 bg-white" style={{ paddingTop: '5rem' }}>
                <div className="max-w-7xl mx-auto">
                    {/* EXISTING SECTION: One-Time Services */}
                    <div className="mb-16">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                                Individual Care Components
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                                Not ready for a subscription? Book these services one-time, anytime.
                            </p>
                        </div>
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
                style={{ backgroundColor: '#003F7D' }}
            >
                <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-x-10 gap-y-2 text-center">
                    {[
                        '✓ Licensed Vets Only',
                        '✓ Fear-Free Handling',
                        '✓ Digital Health Passport',
                        '✓ Transparent Pricing',
                        '✓ Care At Home',
                    ].map((t) => (
                        <span key={t} className="opacity-90 tracking-wide">
                            {t}
                        </span>
                    ))}
                </div>
            </section>

            {/* ── How It Works ──────────────────────────────────────────────── */}
            {false && (
                <section
                    className="py-24 px-6"
                    style={{ backgroundColor: '#002347' }}
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
                                        backgroundImage: 'linear-gradient(to right, #FF8E00, #FD7702)',
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
                                            style={{ backgroundColor: 'rgba(0,35,71,0.40)', border: '1px solid rgba(168,180,216,0.20)' }}
                                        >
                                            <Icon size={28} style={{ color: '#FF8E00' }} strokeWidth={1.5} />
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
            )}

            {/* ── FAQ / Details ─────────────────────────────────────────────── */}
            <section className="py-24 px-6" style={{ backgroundColor: '#f8f4e8' }}>
                <div className="max-w-3xl mx-auto">
                    <div className="text-center bg-white rounded-3xl border border-gray-100 shadow-sm p-12">
                        <span
                            className="font-semibold tracking-wide uppercase text-sm"
                            style={{ color: '#003F7D' }}
                        >
                            Any queries?
                        </span>
                        <h2 className="mt-4 text-2xl md:text-4xl font-bold tracking-tight text-gray-900 mb-6">
                            DM us at <span style={{ color: '#FF8E00' }}>+91 9325855890</span>
                        </h2>
                        <p className="text-gray-500">
                            We're happy to answer any questions you might have.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── CTA ───────────────────────────────────────────────────────── */}
            <section
                className="py-24 px-6"
                style={{
                    background:
                        'linear-gradient(135deg, #002347 0%, #003F7D 50%, #002347 100%)',
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
                        expert care available at your convenience.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="text-white border-none shadow-lg rounded-full px-8 flex items-center gap-2 group"
                            style={{
                                backgroundColor: '#FF8E00',
                                boxShadow: '0 8px 24px rgba(255,142,0,0.40)',
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
