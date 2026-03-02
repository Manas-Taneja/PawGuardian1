import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, CalendarCheck, ShieldCheck, PawPrint, CheckCircle2 } from 'lucide-react';
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

const benefits = [
  {
    icon: Users,
    title: 'Grow Your Clientele',
    desc: 'Reach thousands of pet owners actively looking for trusted, licensed vets in their area.',
  },
  {
    icon: CalendarCheck,
    title: 'Streamlined Scheduling',
    desc: 'Manage all your appointments through our platform — no more back-and-forth phone calls.',
  },
  {
    icon: ShieldCheck,
    title: 'Verified & Trusted',
    desc: 'Join a network of certified, reviewed professionals that pet owners rely on every day.',
  },
];

const steps = [
  { number: '01', title: 'Apply', desc: 'Fill out the form below with your credentials and specialty.' },
  { number: '02', title: 'Get Verified', desc: 'We review your license and credentials within 2 business days.' },
  { number: '03', title: 'Start Seeing Patients', desc: 'Go live on the platform and start accepting bookings immediately.' },
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
  clinic_type: '' as 'own' | 'visiting' | 'none' | '',
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
      return !!(
        formData.clinic_type &&
        (formData.clinic_type === 'none' || (formData.clinic_name && formData.clinic_location)) &&
        formData.home_visit_aware &&
        formData.commute_distance_km &&
        formData.visits_per_week
      );
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
        clinic_type: formData.clinic_type,
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
        className="relative overflow-hidden py-32 px-6"
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
        <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none select-none">
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
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.05]"
          >
            Partner With{' '}
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
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Join India's fastest-growing home-visit vet network. Expand your practice, set your
            own schedule, and make a real difference in the lives of pets and their families.
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
      <section className="py-24 px-6" style={{ backgroundColor: '#f8f4e8' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span
              className="font-semibold tracking-wide uppercase text-sm"
              style={{ color: '#003F7D' }}
            >
              Why Join Us
            </span>
            <h2 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
              Built for <span style={{ color: '#003F7D' }}>Vets First</span>
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto leading-relaxed">
              We handle the logistics so you can focus on what matters — delivering outstanding
              care to every patient.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {benefits.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                custom={i}
                viewport={{ once: true }}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col gap-4 hover:shadow-xl transition-shadow"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(0,35,71,0.08)' }}
                >
                  <Icon size={26} strokeWidth={1.6} style={{ color: '#003F7D' }} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it Works ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ backgroundColor: '#002347' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span
              className="font-semibold tracking-wide uppercase text-sm"
              style={{ color: '#FF8E00' }}
            >
              The Process
            </span>
            <h2 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight text-white">
              How It Works
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 relative">
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
      <section id="signup" className="py-24 px-6" style={{ backgroundColor: '#f8f4e8' }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="font-semibold tracking-wide uppercase text-sm"
              style={{ color: '#003F7D' }}
            >
              Get Started
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
              Apply to Join
            </h2>
            <p className="mt-3 text-gray-500 leading-relaxed">
              Fill in your details below and we'll get back to you within 2 business days.
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
                    {/* Clinic type radio group */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-700">
                        Are you practicing in a clinic? <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-4">
                        {[
                          { value: 'own', label: 'Own clinic' },
                          { value: 'visiting', label: 'Visiting vet' },
                          { value: 'none', label: 'No clinic' },
                        ].map(({ value, label }) => (
                          <label key={value} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                            <input
                              type="radio"
                              name="clinic_type"
                              value={value}
                              checked={formData.clinic_type === value}
                              onChange={handleChange}
                              className="accent-[#003F7D]"
                            />
                            {label}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Conditional clinic fields */}
                    {(formData.clinic_type === 'own' || formData.clinic_type === 'visiting') && (
                      <div className="grid sm:grid-cols-2 gap-5">
                        <Field label="Clinic Name" name="clinic_name" type="text" value={formData.clinic_name} onChange={handleChange} placeholder="PetCare Clinic" required />
                        <Field label="Clinic Location" name="clinic_location" type="text" value={formData.clinic_location} onChange={handleChange} placeholder="Bengaluru, Karnataka" required />
                      </div>
                    )}

                    {/* Specialisation */}
                    <Field label="Animal care you specialise in (optional)" name="animal_specialisation" type="text" value={formData.animal_specialisation} onChange={handleChange} placeholder="e.g. Dogs, Cats, Exotic birds…" />

                    {/* Home visit awareness */}
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="home_visit_aware"
                        checked={formData.home_visit_aware}
                        onChange={handleChange}
                        className="mt-0.5 accent-[#003F7D] w-4 h-4 flex-shrink-0"
                      />
                      <span className="text-sm text-gray-700">
                        <span className="font-semibold">I understand this is an at-home visit service.</span>{' '}
                        Consultations are conducted at the pet owner's residence, not at a clinic.{' '}
                        <span className="text-red-500">*</span>
                      </span>
                    </label>

                    {/* Commute details */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="Max commute distance (km)" name="commute_distance_km" type="number" value={formData.commute_distance_km} onChange={handleChange} placeholder="20" required />
                      <Field label="Visits per week willing to do" name="visits_per_week" type="number" value={formData.visits_per_week} onChange={handleChange} placeholder="10" required />
                    </div>
                  </div>
                )}
                {step === 3 && (
                  <div className="space-y-5">
                    {/* Agreement summary */}
                    <div
                      className="rounded-2xl p-5 space-y-3"
                      style={{ backgroundColor: 'rgba(0,35,71,0.05)', border: '1px solid rgba(0,35,71,0.12)' }}
                    >
                      <h3 className="text-sm font-bold text-gray-900">Liability Agreement</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        By joining PawGuardian, you agree to the following terms. Please download, sign, and upload the agreement below.
                      </p>
                      <ul className="space-y-1.5">
                        {[
                          'Independent contractor clause — You operate as an independent contractor, not an employee.',
                          'Indemnification clause — You indemnify PawGuardian against claims arising from your services.',
                          'Mandatory registration validity — Your veterinary registration must remain valid at all times.',
                          'Mandatory professional behaviour — You commit to maintaining professional standards of care.',
                          'Non-solicitation clause — You agree not to solicit PawGuardian clients outside the platform.',
                        ].map((clause) => (
                          <li key={clause} className="flex items-start gap-2 text-xs text-gray-600">
                            <span className="mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#003F7D' }} />
                            {clause}
                          </li>
                        ))}
                      </ul>
                    </div>

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
            className="text-[10px] font-semibold uppercase tracking-wide text-center"
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
