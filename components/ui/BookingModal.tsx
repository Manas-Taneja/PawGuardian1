import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';
import { supabase } from '@/lib/supabase';

interface BookingFormData {
  name: string;
  city: string;
  petType: string;
  petName: string;
  petBreed: string;
  petBirthday: string;
  petGender: string;
}

const EMPTY_FORM: BookingFormData = {
  name: '',
  city: '',
  petType: 'Dog',
  petName: '',
  petBreed: '',
  petBirthday: '',
  petGender: 'Male',
};

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  required?: boolean;
  placeholder?: string;
  min?: string;
  step?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
}

const Field: React.FC<FieldProps> = ({ label, name, type, value, onChange, required, placeholder, min, step, inputRef }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-semibold mb-1.5" style={{ color: '#282239' }}>
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      min={min}
      step={step}
      ref={inputRef}
      className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3470] bg-white"
      style={{ borderColor: '#a8b4d8', color: '#282239' }}
    />
  </div>
);

const SuccessView: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="py-8 flex flex-col items-center text-center gap-4">
    <CheckCircle2 size={48} style={{ color: '#1e3470' }} />
    <h3 className="text-xl font-bold" style={{ color: '#282239' }}>You're all set!</h3>
    <p className="text-gray-600">We'll be in touch soon to confirm your slot.</p>
    <Button
      size="md"
      className="mt-2 text-white border-none"
      style={{ backgroundColor: '#1e3470', boxShadow: '0 4px 14px rgba(30,52,112,0.30)' }}
      onClick={onClose}
    >
      Close
    </Button>
  </div>
);

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [form, setForm] = useState<BookingFormData>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setForm(EMPTY_FORM);
      setSubmitted(false);
    }
  }, [isOpen]);

  const firstInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Small timeout lets AnimatePresence render before focusing
      const t = setTimeout(() => firstInputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!supabase) {
      setError('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
      setIsSubmitting(false);
      return;
    }

    const { error: supabaseError } = await supabase.from('bookings').insert([{
      name: form.name,
      city: form.city,
      pet_type: form.petType,
      pet_name: form.petName,
      pet_breed: form.petBreed,
      pet_birthday: form.petBirthday,
      pet_gender: form.petGender,
    }]);

    if (supabaseError) {
      setError('Something went wrong. Please try again.');
      setIsSubmitting(false);
    } else {
      setSubmitted(true);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(40,34,57,0.55)', backdropFilter: 'blur(4px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
            style={{ backgroundColor: '#f8f4e8' }}
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#1e3470]/10">
              <div>
                <h2 id="booking-modal-title" className="text-xl font-bold" style={{ color: '#282239' }}>Join the Waitlist</h2>
                <p className="text-sm mt-0.5" style={{ color: '#a8b4d8' }}>We'll reach out as spots open up.</p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-[#1e3470]/10 transition-colors"
                aria-label="Close"
              >
                <X size={20} style={{ color: '#282239' }} />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
              {submitted ? (
                <SuccessView onClose={onClose} />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Field label="Your Name" name="name" type="text" value={form.name} onChange={handleChange} required placeholder="e.g. Priya Sharma" inputRef={firstInputRef} />
                  <Field label="City" name="city" type="text" value={form.city} onChange={handleChange} required placeholder="e.g. Mumbai" />

                  <div>
                    <label htmlFor="petType" className="block text-sm font-semibold mb-1.5" style={{ color: '#282239' }}>
                      Type of Pet <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="petType"
                      name="petType"
                      value={form.petType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3470] bg-white"
                      style={{ borderColor: '#a8b4d8', color: '#282239' }}
                    >
                      <option>Dog</option>
                      <option>Cat</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <Field label="Pet's Name" name="petName" type="text" value={form.petName} onChange={handleChange} required placeholder="e.g. Bruno" />
                  <Field label="Breed" name="petBreed" type="text" value={form.petBreed} onChange={handleChange} required placeholder="e.g. Labrador Retriever" />
                  <Field label="Pet's Birthday" name="petBirthday" type="date" value={form.petBirthday} onChange={handleChange} required />

                  <div>
                    <label htmlFor="petGender" className="block text-sm font-semibold mb-1.5" style={{ color: '#282239' }}>
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="petGender"
                      name="petGender"
                      value={form.petGender}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3470] bg-white"
                      style={{ borderColor: '#a8b4d8', color: '#282239' }}
                    >
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>

                  {error && (
                    <p className="text-sm text-red-600">{error}</p>
                  )}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      size="md"
                      className="w-full text-white border-none disabled:opacity-60"
                      style={{ backgroundColor: '#1e3470', boxShadow: '0 4px 14px rgba(30,52,112,0.30)' }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Joining…' : 'Join Waitlist'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
