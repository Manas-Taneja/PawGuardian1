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
        title: "Puppy Pack (0–1.5 years)",
        subtitle: "Everything your growing pup needs for a strong immune system and healthy development.",
        features: [
            "Complete Vaccination Plan: DHPPiL (9-in-1), Anti-Rabies, and all necessary Booster Vaccinations.",
            "Comprehensive Physical Exam: Assessment of eyes, ears, skin, fur, nails, and dental health.",
            "Vital Signs Monitoring: Temperature, heart rate, blood pressure, and respiratory checks.",
            "Parasite Prevention: Complete deworming, plus tick & flea treatment.",
            "Advanced Diagnostics (Yearly): Blood Panel (CBC, Renal Function, Liver Function, Urine Analysis)",
            "Stool Analysis Parameters"
        ]
    },
    {
        title: "Adult Dog Pack (1.5–7 years)",
        subtitle: "Keep your active dog moving comfortably and feeling their best.",
        features: [
            "Comprehensive Physical Exam: Assessment of eyes, ears, skin, fur, nails, dental health, plus Joint Assessment.",
            "Vital Signs Monitoring: Temperature, heart rate, blood pressure, and respiratory checks.",
            "Parasite Prevention: Complete deworming, plus tick & flea treatment.",
            "Booster Vaccinations: Age-appropriate immunizations.",
            "Advanced Diagnostics (Bi-Annual and Annual): Blood Panel (CBC, Renal Function, Liver Function, Urine Analysis)",
            "Stool Analysis for Parasites"
        ]
    },
    {
        title: "Senior Dog Pack (7+ years)",
        subtitle: "Advanced screening and joint care to support your loyal companion as they age.",
        features: [
            "Comprehensive Physical Exam: Assessment of eyes, ears, skin, fur, nails, dental health, plus Joint Assessment.",
            "Vital Signs Monitoring: Temperature, heart rate, blood pressure, and respiratory checks.",
            "Parasite Prevention: Complete deworming, plus tick & flea treatment.",
            "Booster Vaccinations: Age-appropriate immunizations.",
            "Advanced Diagnostics (Comprehensive Panel): Blood Panel (CBC, Renal Function, Liver Function, Urine Analysis)",
            "Thyroid Screening (Hormone levels)",
            "Heart Disease Parameters",
            "Cancer Parameters (Early detection markers)",
            "Stool Analysis for Parasites"
        ]
    }
];

const catPlans = [
    {
        title: "Kitten Pack (0–1.5 years)",
        subtitle: "Give your kitten the perfect start to a healthy life.",
        features: [
            "Complete Vaccination Plan: FVRCP (3-in-1), Anti-Rabies, and all necessary Booster Vaccinations.",
            "Comprehensive Physical Exam: Assessment of eyes, ears, skin, fur, nails, and dental health.",
            "Vital Signs Monitoring: Temperature, heart rate, blood pressure, and respiratory checks.",
            "Parasite Prevention: Complete deworming, plus tick & flea treatment.",
            "Advanced Diagnostics (Yearly Blood Panel): Complete Blood Count (CBC)",
            "Renal Function (BUN, Creatinine)",
            "Liver Function (Enzyme levels)",
            "Urine Analysis (pH, crystals, potential infections, glucose)"
        ]
    },
    {
        title: "Adult Cat Pack (2–7 years)",
        subtitle: "Maintain their prime health with routine maintenance and monitoring.",
        features: [
            "Comprehensive Physical Exam: Assessment of eyes, ears, skin, fur, nails, and dental health.",
            "Vital Signs Monitoring: Temperature, heart rate, blood pressure, and respiratory checks.",
            "Parasite Prevention: Complete deworming, plus tick & flea treatment.",
            "Booster Vaccinations: Age-appropriate immunizations to keep them protected.",
            "Advanced Diagnostics (Yearly Blood Panel): Complete Blood Count, Renal Function, Liver Function, and Urine Analysis."
        ]
    },
    {
        title: "Senior Cat Pack (7+ years)",
        subtitle: "Specialized, gentle care to ensure comfort and longevity in their golden years.",
        features: [
            "Comprehensive Physical Exam: Assessment of eyes, ears, skin, fur, nails, and dental health.",
            "Vital Signs Monitoring: Temperature, heart rate, blood pressure, and respiratory checks.",
            "Parasite Prevention: Complete deworming, plus tick & flea treatment.",
            "Booster Vaccinations: Age-appropriate immunizations.",
            "Advanced Diagnostics (Comprehensive Panel): Complete Blood Count, Renal Function, Liver Function, and Urine Analysis.",
            "Thyroid Screening (Hormone levels)",
            "Heart Disease Parameters",
            "Cancer Parameters (Early detection markers)"
        ]
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
            'Our trained phlebotomists collect samples at your home. Full blood panels, organ function, infection markers — results delivered digitally.',
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
            'In-person home visits and video consultations with our network of licensed vets.',
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
// ─── Expandable Plan Component ───────────────────────────────────────────────

const ExpandablePlan: React.FC<{
    plan: { title: string; subtitle: string; features: string[] };
    index: number;
    accentColor: string;
    hoverColor: string;
}> = ({ plan, index, accentColor, hoverColor }) => {
    const [open, setOpen] = React.useState(false);
    return (
        <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={index}
            viewport={{ once: true }}
            className="bg-gray-50 p-6 rounded-2xl border transition-all hover:shadow-md cursor-pointer"
            style={{ borderColor: 'rgba(0,63,125,0.05)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = hoverColor; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,63,125,0.05)'; }}
            onClick={() => setOpen(!open)}
        >
            <div className="flex justify-between items-start gap-4">
                <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-1">{plan.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed max-w-sm">{plan.subtitle}</p>
                </div>
                <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300"
                    style={{ backgroundColor: `${accentColor}1A`, transform: open ? 'rotate(180deg)' : 'none' }}
                >
                    <ChevronDown size={18} style={{ color: accentColor }} />
                </div>
            </div>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="pt-6 mt-4 border-t border-gray-200">
                            <ul className="space-y-3">
                                {plan.features.map((feature, j) => {
                                    const splitIndex = feature.indexOf(':');
                                    let boldPart = feature;
                                    let regularPart = '';

                                    if (splitIndex !== -1) {
                                        boldPart = feature.slice(0, splitIndex + 1);
                                        regularPart = feature.slice(splitIndex + 1);
                                    }

                                    return (
                                        <li key={j} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                                            <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: accentColor }} />
                                            <span>
                                                {splitIndex !== -1 ? (
                                                    <>
                                                        <strong className="text-gray-900 font-semibold">{boldPart}</strong>
                                                        {regularPart}
                                                    </>
                                                ) : (
                                                    feature
                                                )}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

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
                className="relative overflow-hidden pt-12 pb-16 md:pb-32 px-6"
                style={{ backgroundColor: '#f8f4e8' }}
            >
                {/* Decorative blobs */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div
                        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[130px]"
                        style={{ backgroundColor: 'rgba(255,142,0,0.15)' }}
                    />
                    <div
                        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px]"
                        style={{ backgroundColor: 'rgba(253,119,2,0.10)' }}
                    />
                    <div
                        className="absolute -bottom-20 right-1/4 w-[300px] h-[300px] rounded-full blur-[100px]"
                        style={{ backgroundColor: 'rgba(0,35,71,0.05)' }}
                    />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 pt-4">
                    <div className="text-center mb-20 max-w-3xl mx-auto mt-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl sm:text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight"
                        >
                            Our <span style={{ color: '#FF8E00' }}>Services</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-gray-600 leading-relaxed"
                        >
                            Complete, proactive healthcare delivered right to your living room.
                            Choose our autopilot subscription or book individual services as needed.
                        </motion.p>
                    </div>

                    {/* NEW SECTION: Subscriptions */}
                    <div className="mb-16 md:mb-32">
                        <div className="text-center mb-16">
                            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                                🐾 PawGuardian Subscription Plans for Pet Parents
                            </h2>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                                At PawGuardian, we believe proactive care is the best way to ensure a long, happy life for your furry family members. Choose the plan tailored to your pet's life stage and let us handle the rest.
                            </p>

                            <div className="bg-white border shadow-sm rounded-3xl p-6 md:p-8 max-w-3xl mx-auto text-left" style={{ borderColor: 'rgba(0,35,71,0.08)' }}>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">✨ The PawGuardian Promise (Included in ALL Plans)</h3>
                                <p className="text-sm text-gray-600 mb-4">Every subscription tier comes with complete peace of mind, featuring:</p>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full mt-2 lg:mt-1.5 shrink-0 bg-[#FF8E00]" />
                                        <span><strong className="text-gray-900">Year-Round Veterinary Access:</strong> Unlimited tele-consultations and dedicated support whenever you have a question or concern.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full mt-2 lg:mt-1.5 shrink-0 bg-[#FF8E00]" />
                                        <span><strong className="text-gray-900">Exclusive Member Rates:</strong> Enjoy better, discounted pricing for in-person visits and bookings at any <strong>PawGuardian-certified clinic</strong> when hands-on care is needed.</span>
                                    </li>
                                </ul>
                            </div>
                            <p className="text-sm tracking-wide uppercase text-[#FF8E00] font-semibold mt-12 mb-4">
                                Click on any of the plans below to know more
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
                                <div className="space-y-4">
                                    {dogPlans.map((plan, i) => (
                                        <ExpandablePlan
                                            key={i}
                                            plan={plan}
                                            index={i}
                                            accentColor="#003F7D"
                                            hoverColor="#FF8E00"
                                        />
                                    ))}
                                </div>
                                <div className="mt-8">
                                    <Button
                                        className="w-full text-white border-none shadow-lg py-4 text-lg"
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
                                <div className="space-y-4">
                                    {catPlans.map((plan, i) => (
                                        <ExpandablePlan
                                            key={i}
                                            plan={plan}
                                            index={i}
                                            accentColor="#003F7D"
                                            hoverColor="#FD7702"
                                        />
                                    ))}
                                </div>
                                <div className="mt-8">
                                    <Button
                                        className="w-full text-white border-none shadow-lg py-4 text-lg flex items-center justify-center gap-2"
                                        style={{ backgroundColor: '#003F7D', boxShadow: '0 8px 24px rgba(0,63,125,0.25)' }}
                                        onClick={onOpenBooking}
                                    >
                                        Enroll Your Cat
                                    </Button>
                                </div>
                            </motion.div>
                        </div>

                        {/* Disclaimer */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-12 bg-[#001b38] border border-white/10 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto"
                        >
                            <p className="text-gray-400 text-sm leading-relaxed text-center sm:text-left">
                                <strong className="text-white">A Note on Advanced Diagnostics:</strong> At PawGuardian, we are constantly expanding our care network. Please note that the availability of certain specialized tests—such as early-detection cancer markers and advanced cardiac parameters—is subject to local laboratory infrastructure and viability in your specific region (e.g., within Goa). We will always transparently advise you on the best available testing options in your area during your consultations.
                            </p>
                        </motion.div>
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
                            className="shrink-0 text-sm font-semibold px-3 sm:px-5 py-2 rounded-full border transition-all"
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
            <section id="services-plans" className="py-12 md:py-24 px-6 bg-white" style={{ paddingTop: '5rem' }}>
                <div className="max-w-7xl mx-auto">
                    {/* EXISTING SECTION: One-Time Services */}
                    <div className="mb-16">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
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
                <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-x-4 sm:gap-x-10 gap-y-2 text-center">
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
            <section className="py-12 md:py-24 px-6" style={{ backgroundColor: '#f8f4e8' }}>
                <div className="max-w-3xl mx-auto">

                    <div className="text-center bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-12">
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
                className="py-12 md:py-24 px-6"
                style={{
                    backgroundColor: '#ffffff'
                }}
            >
                <div className="max-w-2xl mx-auto text-center">
                    <div
                        className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 border"
                        style={{
                            backgroundColor: 'rgba(0,35,71,0.05)',
                            borderColor: 'rgba(0,35,71,0.10)',
                        }}
                    >
                        <PawPrint size={14} style={{ color: '#003F7D' }} />
                        <span
                            className="text-xs font-semibold tracking-wide uppercase"
                            style={{ color: '#003F7D' }}
                        >
                            Book Today
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                        Your Pet's Health{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{
                                backgroundImage: 'linear-gradient(to right, #FF8E00, #FD7702)',
                            }}
                        >
                            Can't Wait.
                        </span>
                    </h2>
                    <p className="text-gray-600 text-lg mb-10">
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
                            <span>Schedule a Visit</span>
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
