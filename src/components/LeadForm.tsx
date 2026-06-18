/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, ChevronRight, ChevronLeft, Sparkles, User, Mail, Phone, MapPin, GraduationCap, Calendar, Award, Check } from 'lucide-react';
import { Inquiry, Program } from '../types';
import { PROGRAMS, STATES_AND_UT } from '../data';

interface LeadFormProps {
  onInquirySubmitted: (inquiry: Inquiry) => void;
  selectedProgramId: string | null;
}

export default function LeadForm({ onInquirySubmitted, selectedProgramId }: LeadFormProps) {
  // Step tracker
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [assignedCounselor, setAssignedCounselor] = useState({ name: '', phone: '', photo: '' });
  const [generatedRefNum, setGeneratedRefNum] = useState('');

  // Contact Info states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Academic Interest states
  const [selectedProgram, setSelectedProgram] = useState(PROGRAMS[0].id);
  const [stateOfResidence, setStateOfResidence] = useState(STATES_AND_UT[0]);

  // Academic Qualification states
  const [highestQualification, setHighestQualification] = useState('Graduation');
  const [yearOfPassing, setYearOfPassing] = useState('2025');
  const [aggregateScore, setAggregateScore] = useState('');
  const [message, setMessage] = useState('');

  // Pre-load program if selected from parent explorer
  useEffect(() => {
    if (selectedProgramId) {
      setSelectedProgram(selectedProgramId);
      // Automatically focus on the academic section or advance step if appropriate
      if (step === 1 && name && email && phone) {
        setStep(2);
      }
    }
  }, [selectedProgramId]);

  // Handle live form calculations
  const parsedScore = parseFloat(aggregateScore) || 0;
  let scholarshipEstimate = 0;
  if (parsedScore >= 90) scholarshipEstimate = 30; // 30% tuition fee waiver
  else if (parsedScore >= 80) scholarshipEstimate = 20; // 20% waiver
  else if (parsedScore >= 70) scholarshipEstimate = 10; // 10% waiver

  const selectedProgramDetails = PROGRAMS.find(p => p.id === selectedProgram) || PROGRAMS[0];

  const handleNextStep = () => {
    // Basic step 1 validator
    if (step === 1) {
      if (!name.trim()) return alert('Please enter your full name');
      if (!email.trim() || !email.includes('@')) return alert('Please enter a valid email address');
      if (phone.replace(/\D/g, '').length < 10) return alert('Please enter a 10-digit mobile number');
    }
    // Basic step 2 validator
    if (step === 2) {
      if (!selectedProgram) return alert('Please choose a program');
      if (!stateOfResidence) return alert('Please select your state/UT of residence');
    }
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aggregateScore) return alert('Please enter your graduation or current score');

    setIsSubmitting(true);

    // Simulate database write
    setTimeout(() => {
      const refId = `MIER-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      const counselors = [
        { name: 'Dr. Priya Verma', phone: '+91 191 254 6078 (Ext 12)', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120&h=120' },
        { name: 'Prof. Sandeep Raina', phone: '+91 191 254 6078 (Ext 18)', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120&h=120' },
        { name: 'Dr. Neha Sudan', phone: '+91 191 254 6078 (Ext 24)', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120' }
      ];

      const assigned = counselors[Math.floor(Math.random() * counselors.length)];
      setAssignedCounselor(assigned);
      setGeneratedRefNum(refId);

      const submittedInquiry: Inquiry = {
        id: refId,
        name,
        email,
        phone,
        programId: selectedProgram,
        state: stateOfResidence,
        highestQualification,
        yearOfPassing,
        score: aggregateScore,
        message: message || `Interested in enrolling for ${selectedProgramDetails.name}`,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        status: 'Pending Review'
      };

      onInquirySubmitted(submittedInquiry);
      setIsSubmitting(false);
      setIsComplete(true);
    }, 1200);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setAggregateScore('');
    setMessage('');
    setStep(1);
    setIsComplete(false);
  };

  return (
    <div id="inquiry-form-container" className="w-full relative">
      <AnimatePresence mode="wait">
        {!isComplete ? (
          <motion.div
            key="lead-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="w-full max-w-sm mx-auto bg-white text-slate-800 rounded-2xl relative overflow-hidden shadow-2xl p-5 md:p-6 border-t-4 border-brand-gold border-r border-b border-l border-slate-100"
          >
            {/* Top Indicator */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="bg-brand-gold text-brand-navy font-black text-[9px] tracking-widest uppercase px-2 py-0.5 rounded">
                  APPLICATIONS OPEN
                </span>
                <h3 className="text-base font-extrabold mt-1 text-brand-navy">
                  Quick Admissions Inquiry
                </h3>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* STEP 1: CONTACT INFORMATION */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  key="step-1"
                  className="space-y-4"
                >
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                    Provide your contact info so our admissions coordinators can assign your Priority Intake reference.
                  </p>
                  
                  <div>
                    <label className="block text-[11px] font-black text-brand-navy uppercase tracking-wider mb-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g., Animesh Dogra"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 focus:bg-white focus:outline-none rounded-lg pl-10 pr-4 py-2.5 text-sm transition-all text-slate-800 placeholder-slate-400 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-brand-navy uppercase tracking-wider mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        placeholder="e.g., animesh@outlook.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 focus:bg-white focus:outline-none rounded-lg pl-10 pr-4 py-2.5 text-sm transition-all text-slate-800 placeholder-slate-400 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-brand-navy uppercase tracking-wider mb-1">Mobile Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="tel"
                        required
                        placeholder="10-digit mobile number"
                        value={phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          if (val.length <= 10) setPhone(val);
                        }}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 focus:bg-white focus:outline-none rounded-lg pl-10 pr-4 py-2.5 text-sm transition-all text-slate-800 placeholder-slate-400 font-medium"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-1 font-medium">We respect your privacy. No spam guarantee.</span>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: PROGRAM SELECTION */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  key="step-2"
                  className="space-y-4"
                >
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                    Select your program of interest and geographic location to check slot availability.
                  </p>

                  <div>
                    <label className="block text-[11px] font-black text-brand-navy uppercase tracking-wider mb-1">Select Program</label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <select
                        value={selectedProgram}
                        onChange={(e) => setSelectedProgram(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 focus:bg-white focus:outline-none rounded-lg pl-10 pr-10 py-2.5 text-sm transition-all text-slate-800 font-semibold appearance-none cursor-pointer"
                      >
                        {PROGRAMS.map(prog => (
                          <option key={prog.id} value={prog.id} className="text-slate-800 bg-white text-sm">
                            {prog.name}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 text-xs">
                        ▼
                      </div>
                    </div>
                    <div className="mt-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-[11px] text-slate-600 flex items-center justify-between font-bold">
                      <span>Duration: {selectedProgramDetails.duration}</span>
                      <span className="text-brand-navy">Intake: {selectedProgramDetails.intake} seats</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-brand-navy uppercase tracking-wider mb-1">State / UT of Residence</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <select
                        value={stateOfResidence}
                        onChange={(e) => setStateOfResidence(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 focus:bg-white focus:outline-none rounded-lg pl-10 pr-10 py-2.5 text-sm transition-all text-slate-800 font-semibold appearance-none cursor-pointer"
                      >
                        {STATES_AND_UT.map(state => (
                          <option key={state} value={state} className="text-slate-800 bg-white text-sm">
                            {state}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 text-xs">
                        ▼
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: QUALIFICATION & PRIORITY SYSTEM */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  key="step-3"
                  className="space-y-4"
                >
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                    Input your academic scores to estimate your NAAC A+ merit scholarship waiver value.
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-black text-brand-navy uppercase tracking-wider mb-1">Min Qualification</label>
                      <select
                        value={highestQualification}
                        onChange={(e) => setHighestQualification(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 focus:bg-white focus:outline-none rounded-lg px-3 py-2 text-xs transition-all text-slate-800 font-semibold cursor-pointer"
                      >
                        <option value="Graduation">Graduation</option>
                        <option value="Post Graduation">Post Graduation</option>
                        <option value="12th / Standard Unit">12th Standard</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-black text-brand-navy uppercase tracking-wider mb-1">Passing Year</label>
                      <select
                        value={yearOfPassing}
                        onChange={(e) => setYearOfPassing(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 focus:bg-white focus:outline-none rounded-lg px-3 py-2 text-xs transition-all text-slate-800 font-semibold cursor-pointer"
                      >
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022 or earlier</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-brand-navy uppercase tracking-wider mb-1">Aggregate Marks (%) / CGPA</label>
                    <div className="relative">
                      <Award className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-navy" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. 78.5 or 8.2"
                        value={aggregateScore}
                        onChange={(e) => setAggregateScore(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 focus:bg-white focus:outline-none rounded-lg pl-10 pr-4 py-2.5 text-sm transition-all text-slate-800 placeholder-slate-400 font-semibold"
                      />
                    </div>
                  </div>

                  {/* Dynamic Scholarship Evaluation (High converting visual trick!) */}
                  {parsedScore > 0 && (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-brand-gold/10 border border-brand-gold/30 p-3 rounded-lg flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-brand-gold-dark animate-spin-slow" />
                        <div>
                          <p className="text-[10px] font-black text-brand-navy uppercase tracking-wider">Potential Scholarship waiver</p>
                          <p className="text-[11px] text-slate-600 font-medium">Estimated on NAAC A+ criteria</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-black text-brand-gold-dark">{scholarshipEstimate}%</span>
                        <p className="text-[9px] text-slate-500 font-bold uppercase">Tuition Fee Wave</p>
                      </div>
                    </motion.div>
                  )}

                  <div>
                    <label className="block text-[11px] font-black text-brand-navy uppercase tracking-wider mb-1">Your Query / Message (Optional)</label>
                    <textarea
                      placeholder="Ask about hostel options, study material, or fees..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={2}
                      className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 focus:bg-white focus:outline-none rounded-lg px-3 py-2 text-xs transition-all text-slate-800 placeholder-slate-400 font-medium resize-none"
                    />
                  </div>
                </motion.div>
              )}

              {/* Action Nav Buttons */}
              <div className="flex items-center gap-3 pt-2">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex-1 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all py-2.5 rounded-lg text-xs font-bold text-slate-700 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full bg-brand-gold hover:bg-brand-gold/90 transition-colors text-brand-navy py-2.5 rounded-lg text-xs font-black flex items-center justify-center gap-1 shadow-md cursor-pointer ml-auto"
                  >
                    <span>Next Section</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-navy hover:bg-brand-navy-dark text-white disabled:bg-slate-300 disabled:text-slate-500 py-2.5 rounded-lg text-xs font-black flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer block ml-auto animate-pulse-slow"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Confirming priority slot...</span>
                      </span>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 text-brand-gold animate-bounce" />
                        <span>SUBMIT ADMISSIONS INQUIRY</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        ) : (
          /* SUCCESS STATE / PRINTABLE PASS (Extreme Trust Booster) */
          <motion.div
            key="success-form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-sm mx-auto bg-white text-slate-800 rounded-2xl p-5 md:p-6 relative text-center shadow-2xl border-t-4 border-t-emerald-500 border-r border-b border-l border-slate-100 overflow-hidden"
          >
            {/* Sparkle background elements */}
            <div className="absolute top-0 right-0 h-40 w-40 bg-emerald-500/5 rounded-full blur-[40px] pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 bg-brand-gold/5 rounded-full blur-[40px] pointer-events-none" />

            <div className="mx-auto h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4 animate-bounce">
              <Check className="h-6 w-6 stroke-[3]" />
            </div>

            <h3 className="text-xl md:text-2xl font-black text-brand-navy">Inquiry Received!</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto font-medium">
              Your 2026 preferential academic seat request has been generated.
            </p>

            {/* Custom high-conversion digital confirmation slip */}
            <div className="my-6 bg-slate-50 border border-slate-200 rounded-xl p-4 text-left font-mono relative">
              <div className="absolute top-3 right-3 text-[10px] uppercase font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">
                Verified Lead
              </div>
              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="pb-1.5 border-b border-slate-200 flex justify-between">
                  <span className="text-slate-400">REF NO:</span>
                  <span className="text-brand-navy font-bold">{generatedRefNum}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">NAME:</span>
                  <span className="text-slate-900 font-bold">{name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">PROGRAM:</span>
                  <span className="text-brand-navy font-bold truncate max-w-[190px]">{selectedProgramDetails.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">SCHOLARSHIP STATUS:</span>
                  <span className="text-emerald-600 font-bold">{scholarshipEstimate > 0 ? `Qualified (${scholarshipEstimate}%)` : 'Under Evaluation'}</span>
                </div>
                <div className="pt-1.5 border-t border-slate-200 flex justify-between text-[11px]">
                  <span className="text-slate-400 text-[9px] uppercase font-bold">Allocated Date:</span>
                  <span className="text-slate-600 font-bold">{new Date().toLocaleDateString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Counselor Assigned Visual Block (High Conversion Element) */}
            <div className="bg-slate-50 hover:bg-slate-100 border border-slate-200 p-3 rounded-xl flex items-center gap-3 text-left mb-6 transition-all duration-200">
              <img
                src={assignedCounselor.photo}
                alt={assignedCounselor.name}
                referrerPolicy="no-referrer"
                className="h-11 w-11 rounded-full border border-brand-gold object-cover shadow-sm bg-slate-100"
              />
              <div>
                <p className="text-[10px] text-brand-gold-dark font-black uppercase tracking-wider">Assigned Counselor</p>
                <h4 className="text-xs font-bold text-brand-navy leading-tight mt-0.5">{assignedCounselor.name}</h4>
                <p className="text-[10.5px] text-slate-500 font-medium mt-0.5">{assignedCounselor.phone}</p>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 mb-6 italic font-medium">
              "A counseling representative has been assigned to lock in your preferential admission tier. Expect a call shortly."
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-700 py-2 rounded-lg text-xs font-bold cursor-pointer transition-colors"
              >
                Inquire Another Course
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
