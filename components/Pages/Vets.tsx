import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, CalendarCheck, ShieldCheck, PawPrint, CheckCircle2, Home, Building2, Video, ChevronDown } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Page } from '../../App';

interface VetsProps {
  navigate: (page: Page) => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
};

const roles = [
  {
    icon: Home,
    title: '1. The Visiting Vet',
    subtitle: 'Perfect for recent graduates or vets seeking premium, flexible hours without the overhead.',
    features: [
      'Zero-CapEx Practice: Start earning immediately without the massive real estate, equipment, or administrative overhead of opening a physical clinic.',
      'Guaranteed Patient Pipeline: Stop waiting for unpredictable walk-ins. We provide a geographically optimised roster of appointments driven by our dedicated subscriber base.'
    ]
  },
  {
    icon: Video,
    title: '2. The Consulting Vet',
    subtitle: 'Perfect for clinic owners wanting to monetize their downtime from anywhere.',
    features: [
      'Monetize the Gaps: Turn slow clinic hours or your time at home into a secondary, high-margin revenue stream.',
      'Data-Backed Consultations: Say goodbye to "blind" video calls where you have to guess the diagnosis. Our Consulting Vets receive the pet\'s recent PawGuardian diagnostic baseline (CBC, Renal, Liver, Urine) before the call. You provide actual, evidence-based medical reviews, not just generic advice.',
      'Zero Commute: Provide expert care and build long-term relationships with pet parents entirely remotely.'
    ]
  },
  {
    icon: Building2,
    title: '3. The Partner Vet',
    subtitle: 'Perfect for established clinics looking to acquire high-value surgical and tertiary care patients.',
    features: [
      'High-Intent Referrals: We do the preventive heavy lifting. When our diagnostics catch early-stage kidney disease, dental decay, or tumors, we route the pet directly to your "Certified Clinic" for priority treatment and surgery.',
      'Pre-Diagnosed Patients: Patients arrive at your clinic with a complete digital health record and recent lab work already completed by us, saving your front desk time and streamlining your intake process.',
      'The "Premium Trust" Badge: Stand out from highly funded corporate chains. Being a PawGuardian Certified partner acts as a quality benchmark, driving our loyal subscribers to your practice for all their secondary and tertiary needs.'
    ]
  },
];

// ─── Expandable Role Component ───────────────────────────────────────────────

const ExpandableVetRole: React.FC<{
  role: { icon: any; title: string; subtitle: string; features: string[] };
  index: number;
}> = ({ role, index }) => {
  const [open, setOpen] = React.useState(false);
  const Icon = role.icon;
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      custom={index}
      viewport={{ once: true }}
      className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col hover:shadow-xl transition-all cursor-pointer h-fit"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: 'rgba(0,35,71,0.08)' }}
          >
            <Icon size={26} strokeWidth={1.6} style={{ color: '#003F7D' }} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{role.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{role.subtitle}</p>
          </div>
        </div>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 mt-2"
          style={{ backgroundColor: 'rgba(0,63,125,0.05)', transform: open ? 'rotate(180deg)' : 'none' }}
        >
          <ChevronDown size={18} style={{ color: '#003F7D' }} />
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
            <div className="pt-6 mt-4 border-t border-gray-100">
              <ul className="space-y-4">
                {role.features.map((feature, j) => {
                  const splitIndex = feature.indexOf(':');
                  let boldPart = feature;
                  let regularPart = '';

                  if (splitIndex !== -1) {
                    boldPart = feature.slice(0, splitIndex + 1);
                    regularPart = feature.slice(splitIndex + 1);
                  }

                  return (
                    <li key={j} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-[#003F7D]" />
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

const steps = [
  { number: '01', title: 'Apply', desc: 'Fill out the form below with your credentials and specialty.' },
  { number: '02', title: 'Get Verified', desc: 'We review your license and credentials within 2 business days.' },
  { number: '03', title: 'Start Seeing Patients', desc: 'Join PawGuardian and start seeing patients immediately.' },
];

const STEPS = ['Personal Info', 'Credentials', 'Practice Details', 'Agreement'];

const INITIAL_FORM = {
  full_name: '',
  email: '',
  phone: '',
  address: '',
  aadhar_number: '',
  degree: '',
  college: '',
  graduation_year: '',
  state_vc_reg_number: '',
  ivpr_vci_number: '',
  role_visiting: false,
  role_partner: false,
  role_consulting: false,
  clinic_name: '',
  clinic_location: '',
  animal_specialisation: '',
  home_visit_aware: false,
  commute_distance_km: '',
  visits_per_week: '',
};

const INITIAL_FILES = {
  photo: null as File | null,
  registration_cert: null as File | null,
  cv: null as File | null,
  signed_agreement: null as File | null,
};

export const Vets: React.FC<VetsProps> = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [files, setFiles] = useState(INITIAL_FILES);
  const [step, setStep] = useState(0); // 0-indexed, 0–3
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: fileList } = e.target;
    if (fileList && fileList[0]) {
      setFiles((prev) => ({ ...prev, [name]: fileList[0] }));
    }
  };

  const validateStep = (): boolean => {
    if (step === 0) {
      return !!(
        formData.full_name &&
        formData.email &&
        formData.phone &&
        formData.address &&
        formData.aadhar_number.length === 12 &&
        files.photo
      );
    }
    if (step === 1) {
      return !!(
        formData.degree &&
        formData.college &&
        formData.graduation_year &&
        formData.state_vc_reg_number &&
        formData.ivpr_vci_number &&
        files.registration_cert &&
        files.cv
      );
    }
    if (step === 2) {
      // Must pick at least one role
      if (!formData.role_visiting && !formData.role_partner && !formData.role_consulting) return false;
      // Visiting vets must acknowledge at-home service and fill commute details
      if (formData.role_visiting) {
        if (!formData.home_visit_aware || !formData.commute_distance_km || !formData.visits_per_week) return false;
      }
      // Partner vets must provide clinic details
      if (formData.role_partner) {
        if (!formData.clinic_name || !formData.clinic_location) return false;
      }
      return true;
    }
    if (step === 3) {
      return !!files.signed_agreement;
    }
    return false;
  };

  const uploadFile = async (file: File, fieldName: string): Promise<string> => {
    if (!supabase) throw new Error('Supabase not configured');
    const path = `${Date.now()}-${fieldName}-${file.name}`;
    const { data, error } = await supabase.storage.from('vet-docs').upload(path, file);
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage.from('vet-docs').getPublicUrl(data.path);
    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) {
      setError('Please upload the signed agreement before submitting.');
      return;
    }
    setIsSubmitting(true);
    setError(null);

    if (!supabase) {
      setError('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Upload all files in parallel
      const [photo_url, registration_cert_url, cv_url, signed_agreement_url] = await Promise.all([
        uploadFile(files.photo!, 'photo'),
        uploadFile(files.registration_cert!, 'registration_cert'),
        uploadFile(files.cv!, 'cv'),
        uploadFile(files.signed_agreement!, 'signed_agreement'),
      ]);

      const payload = {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        aadhar_number: formData.aadhar_number,
        photo_url,
        degree: formData.degree,
        college: formData.college,
        graduation_year: Number(formData.graduation_year),
        state_vc_reg_number: formData.state_vc_reg_number,
        ivpr_vci_number: formData.ivpr_vci_number,
        registration_cert_url,
        cv_url,
        role_visiting: formData.role_visiting,
        role_partner: formData.role_partner,
        role_consulting: formData.role_consulting,
        clinic_name: formData.clinic_name || null,
        clinic_location: formData.clinic_location || null,
        animal_specialisation: formData.animal_specialisation || null,
        home_visit_aware: formData.home_visit_aware,
        commute_distance_km: Number(formData.commute_distance_km),
        visits_per_week: Number(formData.visits_per_week),
        signed_agreement_url,
      };

      const { error: supabaseError } = await supabase.from('vet_signups').insert([payload]);
      if (supabaseError) throw supabaseError;

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Something went wrong uploading your files or saving your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#f8f4e8' }}>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-16 md:py-32 px-6"
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
            style={{ backgroundColor: 'rgba(255,142,0,0.10)' }}
          />
        </div>

        {/* Paw watermark */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none select-none hidden md:block">
          <PawPrint size={320} strokeWidth={0.8} className="text-white" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#FF8E00' }} />
            <span
              className="text-xs font-bold tracking-[0.2em] uppercase"
              style={{ color: '#FF8E00' }}
            >
              For Veterinarians
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-[1.05]"
          >
            Partner with{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(to right, #FF8E00, #FD7702)' }}
            >
              PawGuardian
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            The transition to clinic-based care is stressing out our patients and delaying critical diagnoses.
            Transporting pets to a clinic increases canine cortisol levels for 3 out of 10 dogs, and more than 6 out of 10 cats experience severe stress during physical visits.
            Relying solely on walk-ins means you are often treating cases only when they hit the expensive, late-stage crisis point.
          </motion.p>

          {/* Call to Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12 flex justify-center"
          >
            <a
              href="#signup"
              className="px-8 py-4 rounded-full font-bold text-white text-lg transition-transform hover:scale-105 shadow-xl cursor-pointer"
              style={{ backgroundColor: '#FF8E00', boxShadow: '0 8px 24px rgba(255,142,0,0.3)' }}
            >
              Join Us
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Benefits Grid ─────────────────────────────────────────────────────── */}
      <section className="py-12 md:py-24 px-6" style={{ backgroundColor: '#f8f4e8' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span
              className="font-semibold tracking-wide uppercase text-sm"
              style={{ color: '#003F7D' }}
            >
              How We Work Together
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
              Shifting the <span style={{ color: '#003F7D' }}>Paradigm</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start relative z-10">
            {roles.map((role, i) => (
              <ExpandableVetRole key={role.title} role={role} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── How it Works ──────────────────────────────────────────────────────── */}
      <section className="py-12 md:py-24 px-6" style={{ backgroundColor: '#002347' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span
              className="font-semibold tracking-wide uppercase text-sm"
              style={{ color: '#FF8E00' }}
            >
              The Process
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-white">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 relative">
            {/* Connecting line — desktop only */}
            <div
              className="hidden sm:block absolute top-10 left-[16.67%] right-[16.67%] h-px"
              style={{ backgroundColor: 'rgba(168,180,216,0.25)' }}
            />

            {steps.map(({ number, title, desc }, i) => (
              <motion.div
                key={number}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                custom={i}
                viewport={{ once: true }}
                className="relative text-center"
              >
                <div
                  className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center relative z-10"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.10)',
                    border: '1px solid rgba(168,180,216,0.25)',
                  }}
                >
                  <span className="text-2xl font-black text-white">{number}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: '#a8b4d8' }}>
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Signup Form ───────────────────────────────────────────────────────── */}
      <section id="signup" className="py-12 md:py-24 px-6" style={{ backgroundColor: '#f8f4e8' }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="font-semibold tracking-wide uppercase text-sm"
              style={{ color: '#003F7D' }}
            >
              Get Started
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
              Ready to modernize your practice?
            </h2>
            <p className="mt-3 text-gray-500 leading-relaxed max-w-lg mx-auto">
              Register as a PawGuardian Vet Today. Select your preferred tier during onboarding.
              You can choose any single role or a combination of all three.
            </p>
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-10"
          >
            {isSuccess ? (
              <div className="text-center py-10">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: 'rgba(0,35,71,0.08)' }}
                >
                  <CheckCircle2 size={32} style={{ color: '#003F7D' }} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Application Received!</h3>
                <p className="text-gray-500 leading-relaxed max-w-sm mx-auto">
                  We'll review your details and get back to you within 2 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <ProgressBar steps={STEPS} current={step} />

                {/* Step 1 — Personal Info */}
                {step === 0 && (
                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="Full Name" name="full_name" type="text" value={formData.full_name} onChange={handleChange} placeholder="Dr. Priya Sharma" required />
                      <Field label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="dr.priya@example.com" required />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+91 99887 76655" required />
                      <Field label="Aadhar Number" name="aadhar_number" type="text" value={formData.aadhar_number} onChange={handleChange} placeholder="1234 5678 9012" required />
                    </div>
                    <Field label="Current Address" name="address" type="text" value={formData.address} onChange={handleChange} placeholder="Street, City, State, PIN" required />
                    <FileField label="Profile Photo" name="photo" accept="image/*" file={files.photo} onChange={handleFileChange} required hint="JPG or PNG, clear face photo" />
                  </div>
                )}

                {/* Steps 2, 3, 4 — placeholders for next tasks */}
                {step === 1 && (
                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-3 gap-5">
                      <Field label="Degree" name="degree" type="text" value={formData.degree} onChange={handleChange} placeholder="BVSc & AH" required />
                      <Field label="College" name="college" type="text" value={formData.college} onChange={handleChange} placeholder="KVAFSU" required />
                      <Field label="Graduation Year" name="graduation_year" type="number" value={formData.graduation_year} onChange={handleChange} placeholder="2018" required />
                    </div>
                    <Field label="State Veterinary Council Registration Number" name="state_vc_reg_number" type="text" value={formData.state_vc_reg_number} onChange={handleChange} placeholder="KVA-XXXX" required />
                    <Field label="IVPR / VCI Registration Number" name="ivpr_vci_number" type="text" value={formData.ivpr_vci_number} onChange={handleChange} placeholder="VCI-XXXX" required />
                    <FileField label="Copy of Registration Certificate" name="registration_cert" accept=".pdf,.jpg,.jpeg,.png" file={files.registration_cert} onChange={handleFileChange} required hint="PDF or image of your registration certificate" />
                    <FileField label="CV / Resume" name="cv" accept=".pdf,.doc,.docx" file={files.cv} onChange={handleFileChange} required hint="PDF or Word document" />
                  </div>
                )}
                {step === 2 && (
                  <div className="space-y-5">
                    {/* Role selection — multi-select */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-700">
                        How would you like to work with us? <span className="text-red-500">*</span>
                      </label>
                      <p className="text-xs text-gray-400">Select all that apply</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {([
                          {
                            field: 'role_visiting' as const,
                            icon: Home,
                            title: 'Visiting Vet',
                            desc: 'Doorstep visits at pet owners\u2019 homes',
                          },
                          {
                            field: 'role_partner' as const,
                            icon: Building2,
                            title: 'Partner Vet',
                            desc: 'Get your clinic PawGuardian certified',
                          },
                          {
                            field: 'role_consulting' as const,
                            icon: Video,
                            title: 'Consulting Vet',
                            desc: 'Teleconsultations & remote advisory',
                          },
                        ] as const).map(({ field, icon: Icon, title, desc }) => (
                          <label
                            key={field}
                            className="relative flex flex-col items-center text-center gap-2 rounded-xl border-2 p-4 cursor-pointer transition-all"
                            style={{
                              borderColor: formData[field] ? '#003F7D' : 'rgba(0,35,71,0.15)',
                              backgroundColor: formData[field] ? 'rgba(0,63,125,0.04)' : 'transparent',
                            }}
                          >
                            <input
                              type="checkbox"
                              name={field}
                              checked={formData[field]}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            {formData[field] && (
                              <div className="absolute top-2 right-2">
                                <CheckCircle2 size={16} style={{ color: '#003F7D' }} />
                              </div>
                            )}
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center"
                              style={{
                                backgroundColor: formData[field] ? '#003F7D' : 'rgba(0,35,71,0.08)',
                              }}
                            >
                              <Icon size={20} style={{ color: formData[field] ? '#fff' : '#003F7D' }} />
                            </div>
                            <span className="text-sm font-bold text-gray-900">{title}</span>
                            <p className="text-[11px] text-gray-500 leading-snug">{desc}</p>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* ── Visiting Vet details ── */}
                    {formData.role_visiting && (
                      <div
                        className="rounded-xl p-4 space-y-4"
                        style={{ backgroundColor: 'rgba(0,63,125,0.04)', border: '1px solid rgba(0,63,125,0.10)' }}
                      >
                        <div className="flex items-center gap-2">
                          <Home size={16} style={{ color: '#003F7D' }} />
                          <span className="text-sm font-bold text-gray-800">Visiting Vet Details</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          You will travel to pet owners' homes to provide doorstep veterinary care. Consultations happen at the pet parent's residence, not at a clinic.
                        </p>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            name="home_visit_aware"
                            checked={formData.home_visit_aware}
                            onChange={handleChange}
                            className="mt-0.5 accent-[#003F7D] w-4 h-4 flex-shrink-0"
                          />
                          <span className="text-sm text-gray-700">
                            <span className="font-semibold">I understand and agree to provide at-home visits.</span>{' '}
                            <span className="text-red-500">*</span>
                          </span>
                        </label>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <Field label="Max commute distance (km)" name="commute_distance_km" type="number" value={formData.commute_distance_km} onChange={handleChange} placeholder="20" required />
                          <Field label="Visits per week willing to do" name="visits_per_week" type="number" value={formData.visits_per_week} onChange={handleChange} placeholder="10" required />
                        </div>
                      </div>
                    )}

                    {/* ── Partner Vet details ── */}
                    {formData.role_partner && (
                      <div
                        className="rounded-xl p-4 space-y-4"
                        style={{ backgroundColor: 'rgba(255,142,0,0.05)', border: '1px solid rgba(255,142,0,0.18)' }}
                      >
                        <div className="flex items-center gap-2">
                          <Building2 size={16} style={{ color: '#FF8E00' }} />
                          <span className="text-sm font-bold text-gray-800">Partner Clinic Details</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          Nothing changes about how you run your clinic. We will list it as a{' '}
                          <strong style={{ color: '#003F7D' }}>PawGuardian Certified Clinic</strong> — recommending
                          it to pet parents when in-clinic care is needed (surgeries, diagnostics, etc.) and enabling
                          appointment bookings through our platform in the future.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <Field label="Clinic Name" name="clinic_name" type="text" value={formData.clinic_name} onChange={handleChange} placeholder="PetCare Clinic" required />
                          <Field label="Clinic Location" name="clinic_location" type="text" value={formData.clinic_location} onChange={handleChange} placeholder="Bengaluru, Karnataka" required />
                        </div>
                      </div>
                    )}

                    {/* ── Consulting Vet details ── */}
                    {formData.role_consulting && (
                      <div
                        className="rounded-xl p-4 space-y-2"
                        style={{ backgroundColor: 'rgba(0,63,125,0.04)', border: '1px solid rgba(0,63,125,0.10)' }}
                      >
                        <div className="flex items-center gap-2">
                          <Video size={16} style={{ color: '#003F7D' }} />
                          <span className="text-sm font-bold text-gray-800">Consulting Vet Details</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          You will provide expert advice through video and phone consultations. Pet parents can reach
                          you for guidance, second opinions, and non-emergency advisory support — all remotely.
                        </p>
                      </div>
                    )}

                    {/* Specialisation — shown when any role selected */}
                    {(formData.role_visiting || formData.role_partner || formData.role_consulting) && (
                      <Field label="Animal care you specialise in (optional)" name="animal_specialisation" type="text" value={formData.animal_specialisation} onChange={handleChange} placeholder="e.g. Dogs, Cats, Exotic birds…" />
                    )}
                  </div>
                )}
                {step === 3 && (
                  <div className="space-y-5">
                    {/* Agreement intro */}
                    <div
                      className="rounded-2xl p-5 space-y-4"
                      style={{ backgroundColor: 'rgba(0,35,71,0.05)', border: '1px solid rgba(0,35,71,0.12)' }}
                    >
                      <h3 className="text-sm font-bold text-gray-900">Partnership Agreement</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        We want PawGuardian to operate in a way that's transparent and sustainable. We're putting together a simple agreement that outlines how we work together — designed to protect both parties, especially ensuring that medical judgment remains entirely with you.
                      </p>
                      <ul className="space-y-2.5">
                        {[
                          { title: 'Your clinical decisions, always', desc: 'All medical and clinical decision-making remains fully yours. PawGuardian will never interfere with your professional judgment.' },
                          { title: 'We handle the logistics', desc: 'PawGuardian takes care of coordination, scheduling, and connecting you with pet owners — so you can focus on care.' },
                          { title: 'Clear payment timelines', desc: 'Transparent and timely payment schedules so you always know when and how much you\u2019ll be paid.' },
                          { title: 'Defined liability boundaries', desc: 'Clear boundaries on who is responsible for what — no ambiguity, no surprises.' },
                        ].map(({ title, desc }) => (
                          <li key={title} className="flex items-start gap-3 text-xs text-gray-600">
                            <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: '#003F7D' }} />
                            <div>
                              <span className="font-semibold text-gray-800">{title}</span>
                              <p className="text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="text-xs text-gray-400 text-center leading-relaxed">
                      The full agreement will be shared with you for review before signing. No surprises.
                    </p>

                    {/* Download button */}
                    <a
                      href="/PawGuardian-Vet-Agreement.pdf"
                      download
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border font-semibold text-sm transition-colors hover:bg-gray-50"
                      style={{ borderColor: '#003F7D', color: '#003F7D' }}
                    >
                      Download Agreement PDF
                    </a>

                    {/* Signed agreement upload */}
                    <FileField
                      label="Upload Signed Agreement"
                      name="signed_agreement"
                      accept=".pdf,.jpg,.jpeg,.png"
                      file={files.signed_agreement}
                      onChange={handleFileChange}
                      required
                      hint="Upload your signed copy (PDF or scanned image)"
                    />
                  </div>
                )}

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    {error}
                  </p>
                )}

                {/* Navigation buttons */}
                <div className="flex gap-3 pt-2">
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={() => setStep((s) => s - 1)}
                      className="flex-1 py-3.5 rounded-full font-semibold text-sm border transition-all cursor-pointer"
                      style={{ borderColor: '#003F7D', color: '#003F7D' }}
                    >
                      Back
                    </button>
                  )}
                  {step < STEPS.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (validateStep()) {
                          setStep((s) => s + 1);
                          setError(null);
                        } else {
                          setError('Please fill in all required fields before continuing.');
                        }
                      }}
                      className="flex-1 py-3.5 rounded-full font-semibold text-white text-sm transition-all cursor-pointer"
                      style={{ backgroundColor: '#FF8E00', boxShadow: '0 4px 14px rgba(255,142,0,0.30)' }}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3.5 rounded-full font-semibold text-white text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                      style={{ backgroundColor: '#FF8E00', boxShadow: '0 4px 14px rgba(255,142,0,0.30)' }}
                    >
                      {isSubmitting ? 'Submitting…' : 'Submit Application'}
                    </button>
                  )}
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

// ── Reusable field component ────────────────────────────────────────────────

interface FieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}

const Field: React.FC<FieldProps> = ({ label, name, type, value, onChange, placeholder, required }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="rounded-xl border px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#003F7D]/30 transition-shadow"
      style={{ borderColor: 'rgba(0,35,71,0.20)' }}
    />
  </div>
);

// ── Progress bar for step wizard ────────────────────────────────────────────

interface ProgressBarProps {
  steps: string[];
  current: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps, current }) => (
  <div className="flex items-center justify-between mb-8">
    {steps.map((label, i) => (
      <React.Fragment key={label}>
        <div className="flex flex-col items-center gap-1.5 flex-1">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all"
            style={{
              backgroundColor: i <= current ? '#003F7D' : 'rgba(0,35,71,0.10)',
              color: i <= current ? '#fff' : '#003F7D',
            }}
          >
            {i < current ? <CheckCircle2 size={18} /> : i + 1}
          </div>
          <span
            className="text-[10px] font-semibold uppercase tracking-wide text-center hidden sm:block"
            style={{ color: i <= current ? '#003F7D' : '#9ca3af' }}
          >
            {label}
          </span>
        </div>
        {i < steps.length - 1 && (
          <div
            className="h-px flex-1 mx-1 mb-5 transition-all"
            style={{ backgroundColor: i < current ? '#003F7D' : 'rgba(0,35,71,0.15)' }}
          />
        )}
      </React.Fragment>
    ))}
  </div>
);

// ── Styled file upload field ─────────────────────────────────────────────────

interface FileFieldProps {
  label: string;
  name: string;
  accept?: string;
  file: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  hint?: string;
}

const FileField: React.FC<FileFieldProps> = ({ label, name, accept, file, onChange, required, hint }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <label
      className="flex items-center gap-3 rounded-xl border px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
      style={{ borderColor: file ? '#003F7D' : 'rgba(0,35,71,0.20)' }}
    >
      <span
        className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white flex-shrink-0"
        style={{ backgroundColor: '#003F7D' }}
      >
        Choose file
      </span>
      <span className="text-sm text-gray-500 truncate">
        {file ? file.name : hint || 'No file chosen'}
      </span>
      <input
        type="file"
        name={name}
        accept={accept}
        onChange={onChange}
        required={required}
        className="sr-only"
      />
    </label>
  </div>
);
