import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Star,
    PawPrint,
    Quote,
    ThumbsUp,
    ChevronDown,
    ArrowRight,
    Stethoscope,
    Shield,
    Zap,
} from 'lucide-react';
import { Button } from '../ui/Button';

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterRating = 'All' | '5' | '4' | '3';
type ServiceTag = 'Vaccination' | 'Diagnostics' | 'Dental' | 'Grooming' | 'Consultation' | 'Deworming';

interface Review {
    id: number;
    name: string;
    city: string;
    pet: string;
    avatar: string;
    avatarGradient: string;
    rating: number;
    date: string;
    service: ServiceTag;
    headline: string;
    body: string;
    helpful: number;
    verified: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const reviews: Review[] = [
    {
        id: 1,
        name: 'Sneha Agarwal',
        city: 'Mumbai',
        pet: 'Golden Retriever · Bruno',
        avatar: 'SA',
        avatarGradient: 'from-blue-500 to-purple-500',
        rating: 5,
        date: 'Jan 2026',
        service: 'Diagnostics',
        headline: 'Caught Bruno\'s kidney issue before it became serious',
        body: 'PawGuardian\'s routine blood panel flagged early-stage kidney dysfunction in Bruno. Our vet at home was brilliant — she explained everything clearly and got us started on a management plan immediately. A year on, Bruno is thriving. I genuinely cannot imagine what might have happened if we\'d waited for symptoms.',
        helpful: 47,
        verified: true,
    },
    {
        id: 2,
        name: 'Rohan Kapoor',
        city: 'Delhi NCR',
        pet: 'Labrador · Max',
        avatar: 'RK',
        avatarGradient: 'from-sky-400 to-blue-600',
        rating: 5,
        date: 'Jan 2026',
        service: 'Vaccination',
        headline: 'Zero stress for Max and for us',
        body: 'Max absolutely hates the car — clinics used to be a nightmare. The PawGuardian vet came home, sat on our floor, let Max sniff her bag, and vaccinated him without a single yelp. The whole thing took 20 minutes. Worth every rupee.',
        helpful: 38,
        verified: true,
    },
    {
        id: 3,
        name: 'Priyanka Menon',
        city: 'Bengaluru',
        pet: 'Persian Cat · Luna',
        avatar: 'PM',
        avatarGradient: 'from-teal-400 to-cyan-600',
        rating: 5,
        date: 'Dec 2025',
        service: 'Dental',
        headline: 'Dental check at home — why didn\'t this exist 5 years ago?',
        body: 'Luna has always had gum issues and travelling stresses her out massively. The vet did a thorough oral exam at home, recommended a specific dental diet and enzymatic toothpaste, and followed up digitally the next week. Gum health has improved noticeably in two months.',
        helpful: 29,
        verified: true,
    },
    {
        id: 4,
        name: 'Arjun Sethi',
        city: 'Hyderabad',
        pet: 'Beagle · Loki',
        avatar: 'AS',
        avatarGradient: 'from-amber-400 to-orange-500',
        rating: 5,
        date: 'Dec 2025',
        service: 'Grooming',
        headline: 'Medicated grooming fixed Loki\'s skin issues in 3 sessions',
        body: 'Loki had recurring hot spots and our regular groomer just wasn\'t equipped. PawGuardian\'s medicated grooming protocol — anti-fungal shampoo, specific drying technique — cleared it up properly. The vet supervisor assessed him before and after each session.',
        helpful: 22,
        verified: true,
    },
    {
        id: 5,
        name: 'Kavya Nambiar',
        city: 'Chennai',
        pet: 'Indie Dog · Coco',
        avatar: 'KN',
        avatarGradient: 'from-rose-400 to-pink-600',
        rating: 5,
        date: 'Nov 2025',
        service: 'Consultation',
        headline: 'Same-day video consult was a lifesaver',
        body: 'Coco ate something she shouldn\'t have on a Sunday evening. I booked a video consultation via the app — within 90 minutes a vet was on screen, assessed the situation, and prescribed the right course of action. No panic trip to an emergency clinic. Transparent pricing, zero judgment.',
        helpful: 35,
        verified: true,
    },
    {
        id: 6,
        name: 'Vikram Bhat',
        city: 'Pune',
        pet: 'Shih Tzu · Mochi',
        avatar: 'VB',
        avatarGradient: 'from-violet-500 to-purple-700',
        rating: 4,
        date: 'Nov 2025',
        service: 'Deworming',
        headline: 'Professional, thorough — minor app scheduling hiccup',
        body: 'Deworming and parasite prevention done exactly as prescribed. The vet was knowledgeable and Mochi was comfortable the whole time. Knocked off one star only because rescheduling via the app took longer than expected — support team resolved it quickly when I called though.',
        helpful: 14,
        verified: true,
    },
    {
        id: 7,
        name: 'Meera Iyer',
        city: 'Bengaluru',
        pet: 'Siamese Cat · Nala',
        avatar: 'MI',
        avatarGradient: 'from-green-400 to-teal-600',
        rating: 5,
        date: 'Oct 2025',
        service: 'Diagnostics',
        headline: 'Digital health passport is genuinely brilliant',
        body: 'Having all of Nala\'s records in one place — every test, every vaccine, every vet note — is something I didn\'t know I desperately needed. The longitudinal view the platform gives our vet is way better than my stack of physical reports.',
        helpful: 41,
        verified: true,
    },
    {
        id: 8,
        name: 'Nikhil Sood',
        city: 'Delhi NCR',
        pet: 'German Shepherd · Arya',
        avatar: 'NS',
        avatarGradient: 'from-indigo-400 to-blue-600',
        rating: 4,
        date: 'Oct 2025',
        service: 'Vaccination',
        headline: 'Great experience, hope they expand to more cities soon',
        body: 'Our booster shots were done at home — Arya barely noticed. The vet was punctual and clearly experienced with large breeds. My only note is I wish express slots were available earlier in the day, but the 11am slot worked fine.',
        helpful: 18,
        verified: false,
    },
];

const RATING_COUNTS: Record<number, number> = { 5: 6, 4: 2, 3: 0, 2: 0, 1: 0 };
const TOTAL_REVIEWS = reviews.length;
const AVG_RATING = (reviews.reduce((s, r) => s + r.rating, 0) / TOTAL_REVIEWS).toFixed(1);
const FILTER_OPTIONS: FilterRating[] = ['All', '5', '4', '3'];
const SERVICE_TAGS: ServiceTag[] = ['Vaccination', 'Diagnostics', 'Dental', 'Grooming', 'Consultation', 'Deworming'];

const FEATURED = reviews[0]; // Pull-quote hero

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.52, ease: 'easeOut' },
    }),
};

// ─── Star renderer ────────────────────────────────────────────────────────────

const Stars: React.FC<{ rating: number; size?: number }> = ({ rating, size = 16 }) => (
    <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((n) => (
            <Star
                key={n}
                size={size}
                className={n <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'}
            />
        ))}
    </div>
);

// ─── Rating bar ───────────────────────────────────────────────────────────────

const RatingBar: React.FC<{ star: number; count: number; total: number }> = ({ star, count, total }) => (
    <div className="flex items-center gap-3">
        <span className="text-xs font-bold w-3 text-right" style={{ color: '#4a4a6a' }}>{star}</span>
        <Star size={12} className="fill-amber-400 text-amber-400 shrink-0" />
        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(30,52,112,0.08)' }}>
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${total > 0 ? (count / total) * 100 : 0}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: 'easeOut', delay: (5 - star) * 0.06 }}
                className="h-full rounded-full"
                style={{ backgroundColor: '#1e3470' }}
            />
        </div>
        <span className="text-xs w-3 text-right" style={{ color: '#9896a8' }}>{count}</span>
    </div>
);

// ─── Review Card ──────────────────────────────────────────────────────────────

interface CardProps { review: Review; index: number }

const ReviewCard: React.FC<CardProps> = ({ review, index }) => {
    const [liked, setLiked] = useState(false);
    const [helpCount, setHelpCount] = useState(review.helpful);

    const handleLike = () => {
        if (!liked) setHelpCount((c) => c + 1);
        else setHelpCount((c) => c - 1);
        setLiked(!liked);
    };

    return (
        <motion.article
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={index}
            viewport={{ once: true }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all p-7 flex flex-col"
        >
            {/* Header row */}
            <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${review.avatarGradient} flex items-center justify-center text-white font-black text-sm shrink-0`}>
                        {review.avatar}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <p className="font-bold text-gray-900 text-sm leading-tight">{review.name}</p>
                            {review.verified && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(30,52,112,0.07)', color: '#1e3470' }}>
                                    <Shield size={9} strokeWidth={2.5} /> Verified
                                </span>
                            )}
                        </div>
                        <p className="text-xs mt-0.5" style={{ color: '#9896a8' }}>{review.city} · {review.pet}</p>
                    </div>
                </div>
                {/* Service tag */}
                <span
                    className="shrink-0 text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: 'rgba(30,52,112,0.07)', color: '#1e3470' }}
                >
                    {review.service}
                </span>
            </div>

            {/* Stars + date */}
            <div className="flex items-center justify-between mb-3">
                <Stars rating={review.rating} size={14} />
                <span className="text-xs" style={{ color: '#9896a8' }}>{review.date}</span>
            </div>

            {/* Headline */}
            <h3 className="font-bold text-gray-900 mb-2 leading-snug">{review.headline}</h3>

            {/* Body */}
            <p className="text-gray-500 text-sm leading-relaxed flex-1">{review.body}</p>

            {/* Helpful */}
            <div className="mt-5 pt-4 border-t flex items-center gap-2" style={{ borderColor: 'rgba(30,52,112,0.08)' }}>
                <button
                    onClick={handleLike}
                    className="flex items-center gap-1.5 text-xs font-semibold transition-colors rounded-full px-3 py-1.5"
                    style={{
                        backgroundColor: liked ? 'rgba(30,52,112,0.08)' : 'transparent',
                        color: liked ? '#1e3470' : '#9896a8',
                        border: '1px solid',
                        borderColor: liked ? 'rgba(30,52,112,0.20)' : 'rgba(0,0,0,0.06)',
                    }}
                >
                    <ThumbsUp size={12} className={liked ? 'fill-[#1e3470]' : ''} />
                    Helpful · {helpCount}
                </button>
            </div>
        </motion.article>
    );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export const Reviews: React.FC = () => {
    const [filterRating, setFilterRating] = useState<FilterRating>('All');
    const [filterService, setFilterService] = useState<ServiceTag | 'All'>('All');
    const [sortOpen, setSortOpen] = useState(false);
    const [sortBy, setSortBy] = useState<'recent' | 'helpful'>('recent');

    const filtered = reviews
        .filter((r) => filterRating === 'All' || r.rating === Number(filterRating))
        .filter((r) => filterService === 'All' || r.service === filterService)
        .sort((a, b) => sortBy === 'helpful' ? b.helpful - a.helpful : b.id - a.id);

    return (
        <main className="min-h-screen" style={{ backgroundColor: '#f8f4e8' }}>

            {/* ── Hero ──────────────────────────────────────────────────────── */}
            <section className="relative overflow-hidden py-28 px-6" style={{ backgroundColor: '#282239' }}>
                {/* Blobs */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[130px]" style={{ backgroundColor: 'rgba(30,52,112,0.30)' }} />
                    <div className="absolute top-0 right-0 w-[350px] h-[350px] rounded-full blur-[100px]" style={{ backgroundColor: 'rgba(251,191,36,0.07)' }} />
                </div>

                {/* Watermark */}
                <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none select-none">
                    <PawPrint size={300} strokeWidth={0.8} className="text-white" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
                    <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-2 mb-6">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#a8b8e8' }} />
                        <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#a8b4d8' }}>Pet Parent Voices</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.05]"
                    >
                        Loved by{' '}
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, #fbbf24, #f59e0b)' }}>
                            10,000+ Pets
                        </span>
                        <br />& their Humans.
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }} className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto leading-relaxed">
                        Real stories from real pet parents across India — unfiltered and verified.
                    </motion.p>

                    {/* Aggregate chips */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }} className="mt-10 flex flex-wrap justify-center gap-4">
                        {[
                            { label: AVG_RATING, sub: 'Average Rating', icon: Star, iconClass: 'fill-amber-400 text-amber-400' },
                            { label: `${TOTAL_REVIEWS}+`, sub: 'Verified Reviews', icon: Shield, iconClass: 'text-blue-300' },
                            { label: '98%', sub: 'Would Recommend', icon: Zap, iconClass: 'text-purple-300' },
                        ].map(({ label, sub, icon: Icon, iconClass }) => (
                            <div key={sub} className="flex items-center gap-3 px-5 py-3 rounded-2xl border" style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(168,180,216,0.20)' }}>
                                <Icon size={18} className={iconClass} />
                                <div className="text-left">
                                    <p className="text-white font-black text-lg leading-none">{label}</p>
                                    <p className="text-xs mt-0.5" style={{ color: '#a8b4d8' }}>{sub}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── Featured pull-quote ───────────────────────────────────────── */}
            <section className="py-16 px-6 border-b" style={{ backgroundColor: '#fff', borderColor: 'rgba(30,52,112,0.08)' }}>
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65 }}
                        className="relative rounded-3xl overflow-hidden p-10 md:p-14"
                        style={{ background: 'linear-gradient(135deg, #282239 0%, #1e3470 100%)' }}
                    >
                        {/* Large quote mark */}
                        <Quote size={96} className="absolute top-6 left-6 opacity-[0.06] text-white" />

                        <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-8 items-center">
                            <div>
                                <div className="flex items-center gap-2 mb-5">
                                    <Stars rating={FEATURED.rating} size={20} />
                                    <span className="text-xs font-bold tracking-[0.18em] uppercase ml-2" style={{ color: '#a8b4d8' }}>Featured Review</span>
                                </div>
                                <blockquote className="text-2xl md:text-3xl font-bold text-white leading-snug mb-6">
                                    "{FEATURED.body.slice(0, 160)}…"
                                </blockquote>
                                <div className="flex items-center gap-3">
                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${FEATURED.avatarGradient} flex items-center justify-center text-white font-black text-sm`}>
                                        {FEATURED.avatar}
                                    </div>
                                    <div>
                                        <p className="font-bold text-white text-sm">{FEATURED.name}</p>
                                        <p className="text-xs" style={{ color: '#a8b4d8' }}>{FEATURED.city} · {FEATURED.pet}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Rating summary card */}
                            <div className="shrink-0 bg-white/5 rounded-2xl p-6 min-w-[200px] border border-white/10">
                                <p className="text-5xl font-black text-white text-center mb-1">{AVG_RATING}</p>
                                <Stars rating={5} size={16} />
                                <p className="text-center text-xs mt-2 mb-5" style={{ color: '#a8b4d8' }}>out of 5 · {TOTAL_REVIEWS} reviews</p>
                                <div className="space-y-2">
                                    {[5, 4, 3, 2, 1].map((star) => (
                                        <RatingBar key={star} star={star} count={RATING_COUNTS[star] ?? 0} total={TOTAL_REVIEWS} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Filters ───────────────────────────────────────────────────── */}
            <div className="sticky top-20 z-30 border-b" style={{ backgroundColor: 'rgba(248,244,232,0.93)', backdropFilter: 'blur(12px)', borderColor: 'rgba(30,52,112,0.10)' }}>
                <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center gap-2">
                    {/* Star filter */}
                    <div className="flex items-center gap-1.5">
                        {FILTER_OPTIONS.map((opt) => {
                            const active = filterRating === opt;
                            return (
                                <button
                                    key={opt}
                                    onClick={() => setFilterRating(opt)}
                                    className="shrink-0 text-xs font-bold px-4 py-2 rounded-full border transition-all duration-200"
                                    style={{
                                        backgroundColor: active ? '#1e3470' : 'transparent',
                                        color: active ? '#fff' : '#4a4a6a',
                                        borderColor: active ? '#1e3470' : 'rgba(30,52,112,0.20)',
                                    }}
                                >
                                    {opt === 'All' ? 'All Stars' : `${opt} ★`}
                                </button>
                            );
                        })}
                    </div>

                    <div className="w-px h-6 mx-1 hidden md:block" style={{ backgroundColor: 'rgba(30,52,112,0.12)' }} />

                    {/* Service filter */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                        <button
                            onClick={() => setFilterService('All')}
                            className="text-xs font-bold px-4 py-2 rounded-full border transition-all"
                            style={{
                                backgroundColor: filterService === 'All' ? '#282239' : 'transparent',
                                color: filterService === 'All' ? '#f8f4e8' : '#4a4a6a',
                                borderColor: filterService === 'All' ? '#282239' : 'rgba(30,52,112,0.20)',
                            }}
                        >
                            All Services
                        </button>
                        {SERVICE_TAGS.map((tag) => {
                            const active = filterService === tag;
                            return (
                                <button
                                    key={tag}
                                    onClick={() => setFilterService(active ? 'All' : tag)}
                                    className="text-xs font-bold px-4 py-2 rounded-full border transition-all"
                                    style={{
                                        backgroundColor: active ? '#282239' : 'transparent',
                                        color: active ? '#f8f4e8' : '#4a4a6a',
                                        borderColor: active ? '#282239' : 'rgba(30,52,112,0.20)',
                                    }}
                                >
                                    {tag}
                                </button>
                            );
                        })}
                    </div>

                    {/* Sort */}
                    <div className="ml-auto relative">
                        <button
                            onClick={() => setSortOpen(!sortOpen)}
                            className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full border transition-all"
                            style={{ borderColor: 'rgba(30,52,112,0.20)', color: '#4a4a6a' }}
                        >
                            Sort: {sortBy === 'recent' ? 'Most Recent' : 'Most Helpful'}
                            <ChevronDown size={13} className={`transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                            {sortOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 4, scale: 0.96 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 min-w-[160px]"
                                >
                                    {(['recent', 'helpful'] as const).map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => { setSortBy(opt); setSortOpen(false); }}
                                            className="w-full text-left px-4 py-3 text-sm font-semibold transition-colors hover:bg-gray-50"
                                            style={{ color: sortBy === opt ? '#1e3470' : '#4a4a6a' }}
                                        >
                                            {opt === 'recent' ? 'Most Recent' : 'Most Helpful'}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <p className="text-xs font-medium" style={{ color: '#9896a8' }}>
                        {filtered.length} review{filtered.length !== 1 ? 's' : ''}
                    </p>
                </div>
            </div>

            {/* ── Reviews Grid ──────────────────────────────────────────────── */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${filterRating}-${filterService}-${sortBy}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {filtered.map((review, i) => (
                                <ReviewCard key={review.id} review={review} index={i} />
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {filtered.length === 0 && (
                        <div className="py-32 text-center">
                            <PawPrint size={48} className="mx-auto mb-4 opacity-20" style={{ color: '#1e3470' }} />
                            <p className="text-gray-400 font-medium text-lg">No reviews match this filter.</p>
                            <button
                                onClick={() => { setFilterRating('All'); setFilterService('All'); }}
                                className="mt-4 text-sm font-semibold transition-colors"
                                style={{ color: '#1e3470' }}
                            >
                                Clear filters →
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* ── Trust bar ─────────────────────────────────────────────────── */}
            <section className="py-5 px-6" style={{ backgroundColor: '#1e3470' }}>
                <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-x-10 gap-y-2 text-center text-sm font-medium text-white">
                    {['✓ All Reviews Verified', '✓ No Paid Promotions', '✓ Unfiltered & Real', '✓ Responses Within 24hrs'].map((t) => (
                        <span key={t} className="opacity-90 tracking-wide">{t}</span>
                    ))}
                </div>
            </section>

            {/* ── Write a Review CTA ────────────────────────────────────────── */}
            <section className="py-24 px-6" style={{ background: 'linear-gradient(135deg, #282239 0%, #1e3470 50%, #282239 100%)' }}>
                <div className="max-w-2xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 border" style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.16)' }}>
                            <Stethoscope size={13} className="text-blue-300" />
                            <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: '#c8d4f0' }}>Share your experience</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 tracking-tight">
                            Had a{' '}
                            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, #fbbf24, #f59e0b)' }}>
                                PawGuardian
                            </span>{' '}
                            Visit?
                        </h2>
                        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                            Your honest review helps other pet parents make the right choice for their companions. It takes under 2 minutes.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                className="text-white border-none shadow-lg rounded-full px-8 flex items-center gap-2 group"
                                style={{ backgroundColor: '#1e3470', boxShadow: '0 8px 24px rgba(30,52,112,0.40)' }}
                            >
                                <Star size={17} className="fill-amber-400 text-amber-400" />
                                <span>Write a Review</span>
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
                    </motion.div>
                </div>
            </section>
        </main>
    );
};
