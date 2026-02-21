import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, PawPrint, ZoomIn, Heart } from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────

type Category = 'All' | 'Dogs' | 'Cats' | 'Checkups' | 'Moments';

interface GalleryItem {
    id: number;
    src: string;
    alt: string;
    category: Exclude<Category, 'All'>;
    petName: string;
    caption: string;
    span: 'tall' | 'wide' | 'normal'; // grid span hint
}

const photos: GalleryItem[] = [
    {
        id: 1,
        src: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=900&auto=format&fit=crop',
        alt: 'Golden retriever at vet',
        category: 'Checkups',
        petName: 'Bruno',
        caption: 'Annual wellness check — all clear! 🐾',
        span: 'tall',
    },
    {
        id: 2,
        src: 'https://images.unsplash.com/photo-1548767797-d8c844163c4a?q=80&w=900&auto=format&fit=crop',
        alt: 'Beagle puppy',
        category: 'Dogs',
        petName: 'Loki',
        caption: 'First vaccination done like a champ',
        span: 'normal',
    },
    {
        id: 3,
        src: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=900&auto=format&fit=crop',
        alt: 'Happy dog portrait',
        category: 'Dogs',
        petName: 'Max',
        caption: 'Post-diagnostics and feeling fresh',
        span: 'wide',
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1516750105099-4b8a83e217ee?q=80&w=900&auto=format&fit=crop',
        alt: 'Cat sitting in sunlight',
        category: 'Cats',
        petName: 'Luna',
        caption: 'Dental check done — perfectly healthy teeth',
        span: 'normal',
    },
    {
        id: 5,
        src: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?q=80&w=900&auto=format&fit=crop',
        alt: 'Cute cat resting',
        category: 'Cats',
        petName: 'Nala',
        caption: 'Deworming & coat care with our vet at home',
        span: 'tall',
    },
    {
        id: 6,
        src: 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?q=80&w=900&auto=format&fit=crop',
        alt: 'Puppy examination',
        category: 'Checkups',
        petName: 'Oreo',
        caption: 'Six-month puppy health review ✅',
        span: 'normal',
    },
    {
        id: 7,
        src: 'https://images.unsplash.com/photo-1558929994-3d64db29f25e?q=80&w=900&auto=format&fit=crop',
        alt: 'Dog and owner',
        category: 'Moments',
        petName: 'Charlie',
        caption: 'The moment he realised the vet had treats',
        span: 'wide',
    },
    {
        id: 8,
        src: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=900&auto=format&fit=crop',
        alt: 'Cat close-up',
        category: 'Cats',
        petName: 'Mochi',
        caption: 'Those eyes after a successful home visit 🐱',
        span: 'normal',
    },
    {
        id: 9,
        src: 'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?q=80&w=900&auto=format&fit=crop',
        alt: 'Dog playing outside',
        category: 'Moments',
        petName: 'Simba',
        caption: 'Back to his best after treatment',
        span: 'normal',
    },
    {
        id: 10,
        src: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=900&auto=format&fit=crop',
        alt: 'Smiling dog',
        category: 'Dogs',
        petName: 'Buddy',
        caption: 'Pure joy — post-grooming glow',
        span: 'tall',
    },
    {
        id: 11,
        src: 'https://images.unsplash.com/photo-1611003229186-0e3d8e7b1b46?q=80&w=900&auto=format&fit=crop',
        alt: 'Vet with cat',
        category: 'Checkups',
        petName: 'Pepper',
        caption: 'Blood panel done, results in 24 hrs',
        span: 'normal',
    },
    {
        id: 12,
        src: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=900&auto=format&fit=crop',
        alt: 'Dog paw on hand',
        category: 'Moments',
        petName: 'Coco',
        caption: 'The trust that makes it all worth it',
        span: 'wide',
    },
];

const CATEGORIES: Category[] = ['All', 'Dogs', 'Cats', 'Checkups', 'Moments'];

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.07, duration: 0.5, ease: 'easeOut' },
    }),
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.38, ease: [0.34, 1.56, 0.64, 1] },
    },
    exit: {
        opacity: 0,
        scale: 0.88,
        transition: { duration: 0.22, ease: 'easeIn' },
    },
};

// ─── Lightbox ────────────────────────────────────────────────────────────────

interface LightboxProps {
    photos: GalleryItem[];
    index: number;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ photos, index, onClose, onPrev, onNext }) => {
    const photo = photos[index];

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') onPrev();
            if (e.key === 'ArrowRight') onNext();
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [onClose, onPrev, onNext]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ backgroundColor: 'rgba(20,16,36,0.94)', backdropFilter: 'blur(12px)' }}
            onClick={onClose}
        >
            {/* Close */}
            <button
                onClick={onClose}
                className="absolute top-5 right-5 z-10 text-white/70 hover:text-white transition-colors p-2 rounded-full"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
            >
                <X size={22} />
            </button>

            {/* Prev */}
            <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="absolute left-4 md:left-8 z-10 p-3 rounded-full text-white/70 hover:text-white transition-all"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
            >
                <ChevronLeft size={26} />
            </button>

            {/* Image */}
            <motion.div
                key={photo.id}
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative max-w-4xl w-full mx-16 md:mx-24"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full max-h-[75vh] object-cover rounded-2xl shadow-2xl"
                />
                {/* Caption strip */}
                <div
                    className="absolute bottom-0 left-0 right-0 rounded-b-2xl px-6 py-5"
                    style={{ background: 'linear-gradient(to top, rgba(20,16,36,0.85) 0%, transparent 100%)' }}
                >
                    <div className="flex items-center gap-2 mb-1">
                        <PawPrint size={14} style={{ color: '#a8b8e8' }} />
                        <span className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: '#a8b8e8' }}>
                            {photo.category}
                        </span>
                    </div>
                    <p className="text-white font-bold text-lg leading-snug">{photo.petName}</p>
                    <p className="text-white/70 text-sm mt-0.5">{photo.caption}</p>
                </div>

                {/* Counter */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white/80"
                    style={{ backgroundColor: 'rgba(255,255,255,0.10)' }}>
                    {index + 1} / {photos.length}
                </div>
            </motion.div>

            {/* Next */}
            <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="absolute right-4 md:right-8 z-10 p-3 rounded-full text-white/70 hover:text-white transition-all"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
            >
                <ChevronRight size={26} />
            </button>
        </motion.div>
    );
};

// ─── Gallery Card ─────────────────────────────────────────────────────────────

interface CardProps {
    photo: GalleryItem;
    index: number;
    onClick: () => void;
}

const GalleryCard: React.FC<CardProps> = ({ photo, index, onClick }) => {
    const [liked, setLiked] = useState(false);

    const heightClass =
        photo.span === 'tall' ? 'row-span-2' : photo.span === 'wide' ? 'col-span-2' : '';

    return (
        <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={index}
            layout
            className={`relative group cursor-pointer overflow-hidden rounded-2xl shadow-sm ${heightClass}`}
            style={{ minHeight: photo.span === 'tall' ? '420px' : '200px' }}
            onClick={onClick}
            whileHover={{ scale: 1.015, transition: { duration: 0.22 } }}
        >
            <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ minHeight: 'inherit' }}
            />

            {/* Hover overlay */}
            <div
                className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(to top, rgba(20,16,36,0.80) 0%, rgba(20,16,36,0.10) 60%, transparent 100%)' }}
            >
                <div className="flex items-end justify-between">
                    <div>
                        <p className="text-white font-bold text-base leading-tight">{photo.petName}</p>
                        <p className="text-white/70 text-xs mt-0.5 leading-snug max-w-[180px]">{photo.caption}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span
                            className="text-xs font-bold tracking-wide uppercase px-2.5 py-1 rounded-full"
                            style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#a8b8e8' }}
                        >
                            {photo.category}
                        </span>
                        <div
                            className="p-1.5 rounded-full"
                            style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
                        >
                            <ZoomIn size={14} className="text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Like button */}
            <button
                className="absolute top-3 right-3 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                style={{ backgroundColor: 'rgba(20,16,36,0.50)', backdropFilter: 'blur(4px)' }}
                onClick={(e) => {
                    e.stopPropagation();
                    setLiked(!liked);
                }}
            >
                <Heart
                    size={14}
                    className={liked ? 'fill-rose-400 text-rose-400' : 'text-white'}
                    style={{ transition: 'all 0.2s' }}
                />
            </button>
        </motion.div>
    );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export const Gallery: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<Category>('All');
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const filtered = activeCategory === 'All'
        ? photos
        : photos.filter((p) => p.category === activeCategory);

    const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
    const closeLightbox = useCallback(() => setLightboxIndex(null), []);
    const prevPhoto = useCallback(() => {
        setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null));
    }, [filtered.length]);
    const nextPhoto = useCallback(() => {
        setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null));
    }, [filtered.length]);

    // Close lightbox if filtered set changes
    useEffect(() => { setLightboxIndex(null); }, [activeCategory]);

    return (
        <main className="min-h-screen" style={{ backgroundColor: '#f8f4e8' }}>

            {/* ── Hero ──────────────────────────────────────────────────────── */}
            <section
                className="relative overflow-hidden py-28 px-6"
                style={{ backgroundColor: '#282239' }}
            >
                {/* Decorative blobs */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div
                        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[130px]"
                        style={{ backgroundColor: 'rgba(30,52,112,0.30)' }}
                    />
                    <div
                        className="absolute top-0 right-0 w-[350px] h-[350px] rounded-full blur-[100px]"
                        style={{ backgroundColor: 'rgba(190,24,93,0.10)' }}
                    />
                </div>

                {/* Watermark paw */}
                <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none select-none">
                    <PawPrint size={300} strokeWidth={0.8} className="text-white" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-2 mb-6"
                    >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#a8b8e8' }} />
                        <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#a8b4d8' }}>
                            Real Pets. Real Stories.
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.05]"
                    >
                        The PawGuardian{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: 'linear-gradient(to right, #a8b8e8, #f9a8b8)' }}
                        >
                            Gallery
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto leading-relaxed"
                    >
                        Moments of trust, healing, and joy — captured at doorsteps across India.
                    </motion.p>

                    {/* Stats chips */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.6 }}
                        className="mt-10 flex flex-wrap justify-center gap-3"
                    >
                        {[
                            { label: '10,000+', sub: 'Happy Pets' },
                            { label: '25+', sub: 'Cities' },
                            { label: '500+', sub: 'Licensed Vets' },
                        ].map(({ label, sub }) => (
                            <div
                                key={sub}
                                className="px-5 py-3 rounded-2xl border text-center"
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0.06)',
                                    borderColor: 'rgba(168,180,216,0.20)',
                                }}
                            >
                                <p className="text-white font-black text-lg leading-none">{label}</p>
                                <p className="text-xs mt-0.5" style={{ color: '#a8b4d8' }}>{sub}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── Filter Pills ──────────────────────────────────────────────── */}
            <div
                className="sticky top-20 z-30 border-b"
                style={{ backgroundColor: 'rgba(248,244,232,0.93)', backdropFilter: 'blur(12px)', borderColor: 'rgba(30,52,112,0.10)' }}
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3 overflow-x-auto"
                    style={{ scrollbarWidth: 'none' } as React.CSSProperties}>
                    {CATEGORIES.map((cat) => {
                        const active = cat === activeCategory;
                        return (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className="shrink-0 text-sm font-semibold px-5 py-2 rounded-full border transition-all duration-200"
                                style={{
                                    backgroundColor: active ? '#1e3470' : 'transparent',
                                    color: active ? '#fff' : '#4a4a6a',
                                    borderColor: active ? '#1e3470' : 'rgba(30,52,112,0.20)',
                                }}
                            >
                                {cat}
                                <span
                                    className="ml-2 text-xs"
                                    style={{ opacity: active ? 0.7 : 0.5 }}
                                >
                                    {cat === 'All' ? photos.length : photos.filter((p) => p.category === cat).length}
                                </span>
                            </button>
                        );
                    })}
                    <p className="ml-auto shrink-0 text-xs font-medium whitespace-nowrap" style={{ color: '#9896a8' }}>
                        {filtered.length} photo{filtered.length !== 1 ? 's' : ''}
                    </p>
                </div>
            </div>

            {/* ── Masonry Grid ──────────────────────────────────────────────── */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                            style={{ gridAutoRows: '200px' }}
                        >
                            {filtered.map((photo, i) => (
                                <GalleryCard
                                    key={photo.id}
                                    photo={photo}
                                    index={i}
                                    onClick={() => openLightbox(i)}
                                />
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* Empty state */}
                    {filtered.length === 0 && (
                        <div className="py-32 text-center">
                            <PawPrint size={48} className="mx-auto mb-4 opacity-20" style={{ color: '#1e3470' }} />
                            <p className="text-gray-400 font-medium">No photos in this category yet.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ── Submit your photo CTA ──────────────────────────────────────── */}
            <section className="py-20 px-6" style={{ backgroundColor: '#282239' }}>
                <div className="max-w-2xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div
                            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 border"
                            style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.16)' }}
                        >
                            <Heart size={13} className="text-rose-400" />
                            <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: '#f0c8d4' }}>
                                Share your pet's story
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 tracking-tight">
                            Got a{' '}
                            <span
                                className="text-transparent bg-clip-text"
                                style={{ backgroundImage: 'linear-gradient(to right, #a8b8e8, #f9a8b8)' }}
                            >
                                PawGuardian Moment?
                            </span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                            Tag us on Instagram{' '}
                            <span style={{ color: '#a8b8e8' }}>@pawguardian.in</span>{' '}
                            or send us your photos — we'd love to feature your pet in the gallery.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="#"
                                className="inline-flex items-center justify-center gap-2 font-semibold text-white rounded-full px-8 py-3.5 transition-all"
                                style={{
                                    backgroundColor: '#1e3470',
                                    boxShadow: '0 8px 24px rgba(30,52,112,0.40)',
                                }}
                                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#19296a')}
                                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#1e3470')}
                            >
                                <Heart size={16} />
                                Share Your Moment
                            </a>
                            <a
                                href="https://instagram.com/pawguardian.in"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 font-semibold rounded-full px-8 py-3.5 border transition-all"
                                style={{
                                    color: '#f8f4e8',
                                    borderColor: 'rgba(255,255,255,0.20)',
                                    backgroundColor: 'rgba(255,255,255,0.06)',
                                }}
                                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(255,255,255,0.12)')}
                                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(255,255,255,0.06)')}
                            >
                                @pawguardian.in
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Lightbox ──────────────────────────────────────────────────── */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <Lightbox
                        photos={filtered}
                        index={lightboxIndex}
                        onClose={closeLightbox}
                        onPrev={prevPhoto}
                        onNext={nextPhoto}
                    />
                )}
            </AnimatePresence>
        </main>
    );
};
